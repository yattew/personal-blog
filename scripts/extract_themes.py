#!/usr/bin/env python3
"""
Photo Mood & Theme Extraction Pipeline (Apple Silicon MPS Optimized)
Analyzes photos for color harmony, lighting, and semantic mood using local OpenCLIP + CIE Lab quantization.
Clusters images into 8-15 cohesive journey themes and updates config.js & themes.json.
"""

import os
import re
import sys
import glob
import json
import math
import argparse
from pathlib import Path
from typing import Dict, List, Tuple, Any

import numpy as np
from PIL import Image
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import torch

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:
    pass

try:
    import open_clip
except ImportError:
    open_clip = None

# Curated aesthetic dimensions tailored for journey moods (including nuanced Japan trips)
AESTHETIC_VIBES = {
    "Tokyo Neon Noir": "cyberpunk neon night street in shinjuku and akihabara with glowing signs and reflections on wet asphalt",
    "Shinjuku Golden Gai": "intimate narrow alley nightlife with warm wooden bars, red paper lanterns, and amber glow",
    "Kyoto Moss & Bamboo": "serene zen garden temple in kyoto with green moss, bamboo grove, and wooden pavilions",
    "Fushimi Vermilion Gates": "vivid vermilion red torii gates winding through sacred mountain forest in inari",
    "Mount Fuji Mist & Dawn": "peaceful lake at dawn with mount fuji, cold blue morning mist, and tranquil reflections",
    "Tokyo Rain & Melancholy": "moody rainy tokyo city streets with transparent umbrellas, wet asphalt, and overcast reflections",
    "Sensō-ji Historic Crimson": "ancient asakusa temple with ornate red wood, incense smoke, and traditional lanterns",
    "Matcha & Wabi-Sabi": "japanese tea ceremony with earthy ceramic pottery, green matcha, and quiet tatami room",
    "Shinkansen Countryside": "japanese high-speed bullet train journey through rolling green hills and distant mountain towns",
    "Akihabara Electric Pop": "bright vibrant anime electronics district with colorful billboards and pop culture energy",
    "Midnight Ramen & Izakaya": "cozy japanese ramen bar at midnight with steaming broth, warm wood, and ambient intimacy",
    "Autumn Maple Koyo": "vibrant scarlet red japanese momiji maples and golden autumn leaves in temple courtyards",
    "Coastal Twilight Blue": "tranquil ocean coast at blue hour with deep indigo water and subtle pastel horizon",
    "Minimalist Slate & Steel": "modern minimalist architecture with sleek dark steel, glass, and muted concrete",
    "Sunlit Urban Afternoon": "warm bright sunlight casting sharp shadows on modern city sidewalks and cafes",
    "Vintage Sepia Heritage": "nostalgic rustic heritage architecture with sepia, grain, and weathered wood tones"
}

# The foundational default theme that must always be preserved
DEFAULT_BASE_THEME = {
    "default": {
        "name": "Warm Beige",
        "colors": {
            "bg": "#ebe3d5",
            "surface": "#dfd5c2",
            "text": "#342e29",
            "muted": "#786d62",
            "accent": "#b85420",
            "border": "#cbbda8",
            "shadow": "0 10px 25px rgba(52, 46, 41, 0.08)"
        }
    }
}

def rgb_to_hex(r: int, g: int, b: int) -> str:
    return f"#{int(r):02x}{int(g):02x}{int(b):02x}"

def hex_to_rgb(hex_str: str) -> Tuple[int, int, int]:
    hex_str = hex_str.lstrip("#")
    return int(hex_str[0:2], 16), int(hex_str[2:4], 16), int(hex_str[4:6], 16)

def extract_dominant_colors(image: Image.Image, n_colors: int = 5) -> List[Tuple[int, int, int]]:
    """Extract dominant RGB colors using fast k-means."""
    img_small = image.resize((100, 100)).convert("RGB")
    pixels = np.array(img_small).reshape(-1, 3)
    
    if np.all(pixels == pixels[0]):
        return [tuple(pixels[0])] * n_colors
        
    try:
        kmeans = KMeans(n_clusters=n_colors, n_init=2, max_iter=15, random_state=42)
        kmeans.fit(pixels)
        colors = kmeans.cluster_centers_.astype(int)
    except Exception:
        colors = pixels[:n_colors]
        
    # Sort by luminance
    colors = sorted(colors, key=lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2])
    return [tuple(c) for c in colors]

def synthesize_palette(dominant_colors: List[Tuple[int, int, int]]) -> Dict[str, str]:
    """
    Synthesize the 6-token theme schema with zero-stark-white guarantee:
    bg, surface, text, muted, accent, border, shadow
    """
    darkest = dominant_colors[0]
    lightest = dominant_colors[-1]
    
    def saturation(c):
        mx, mn = max(c), min(c)
        return (mx - mn) / (mx + 1e-5)
        
    non_extremes = dominant_colors[1:-1] if len(dominant_colors) > 2 else dominant_colors
    accent_color = max(non_extremes, key=saturation)
    
    avg_lum = (0.299 * darkest[0] + 0.587 * darkest[1] + 0.114 * darkest[2] +
               0.299 * lightest[0] + 0.587 * lightest[1] + 0.114 * lightest[2]) / 2
               
    if avg_lum < 115:
        # Dark / Night / Cyberpunk theme
        bg = rgb_to_hex(max(6, darkest[0] // 2), max(7, darkest[1] // 2), max(10, darkest[2] // 2))
        surface_rgb = [min(42, int(c * 1.35 + 14)) for c in darkest]
        surface = rgb_to_hex(*surface_rgb)
        # Cap text lightness to avoid blinding pure white (use soft parchment #f0f3f6)
        text_rgb = [min(242, max(215, c)) for c in lightest]
        text = rgb_to_hex(*text_rgb)
        muted_rgb = [(d + l) // 2 for d, l in zip(darkest, text_rgb)]
        muted = rgb_to_hex(*muted_rgb)
        accent = rgb_to_hex(*accent_color)
        border_rgb = [min(60, int(c * 1.5 + 20)) for c in darkest]
        border = rgb_to_hex(*border_rgb)
        shadow = "0 10px 30px rgba(0, 0, 0, 0.55)"
    else:
        # Light / Beige / Earthen theme (Zero Stark Whites)
        bg_rgb = [min(235, max(180, int(c * 0.94))) for c in lightest]
        bg = rgb_to_hex(*bg_rgb)
        surface_rgb = [max(160, int(c * 0.92)) for c in bg_rgb]
        surface = rgb_to_hex(*surface_rgb)
        # Deep warm charcoal text
        text_rgb = [min(65, max(25, int(c * 0.85))) for c in darkest]
        text = rgb_to_hex(*text_rgb)
        muted_rgb = [(d + l) // 2 for d, l in zip(text_rgb, bg_rgb)]
        muted = rgb_to_hex(*muted_rgb)
        accent = rgb_to_hex(*accent_color)
        border_rgb = [max(140, int(c * 0.88)) for c in bg_rgb]
        border = rgb_to_hex(*border_rgb)
        shadow = "0 10px 25px rgba(50, 45, 40, 0.08)"
        
    return {
        "bg": bg,
        "surface": surface,
        "text": text,
        "muted": muted,
        "accent": accent,
        "border": border,
        "shadow": shadow
    }

class MoodThemeExtractor:
    def __init__(self, device: str = None):
        if device is None:
            self.device = "mps" if torch.backends.mps.is_available() else "cpu"
        else:
            self.device = device
            
        print(f"🚀 Initializing OpenCLIP on Apple Silicon device: {self.device}")
        self.model, _, self.preprocess = open_clip.create_model_and_transforms(
            "ViT-B-32", pretrained="laion2b_s34b_b79k", device=self.device
        )
        self.model.eval()
        self.tokenizer = open_clip.get_tokenizer("ViT-B-32")
        
        # Precompute aesthetic vibe text embeddings
        self.vibe_names = list(AESTHETIC_VIBES.keys())
        vibe_prompts = list(AESTHETIC_VIBES.values())
        text_tokens = self.tokenizer(vibe_prompts).to(self.device)
        with torch.no_grad():
            text_features = self.model.encode_text(text_tokens)
            self.vibe_features = text_features / text_features.norm(dim=-1, keepdim=True)

    def extract_batch(self, image_paths: List[str], batch_size: int = 32) -> List[Dict[str, Any]]:
        """Process photos in fast GPU batches."""
        results = []
        n_total = len(image_paths)
        
        for i in range(0, n_total, batch_size):
            chunk_paths = image_paths[i:i + batch_size]
            tensors = []
            valid_items = []
            
            for path in chunk_paths:
                try:
                    img = Image.open(path).convert("RGB")
                    tensor = self.preprocess(img)
                    tensors.append(tensor)
                    
                    # Color analysis
                    dominant_colors = extract_dominant_colors(img, n_colors=5)
                    palette = synthesize_palette(dominant_colors)
                    color_vec = np.array(dominant_colors).flatten() / 255.0
                    
                    valid_items.append({
                        "path": path,
                        "filename": os.path.basename(path),
                        "palette": palette,
                        "color_vec": color_vec
                    })
                except Exception as e:
                    print(f"  ⚠️ Skipping {os.path.basename(path)}: {e}")
                    
            if not tensors:
                continue
                
            batch_tensor = torch.stack(tensors).to(self.device)
            with torch.no_grad():
                img_feats = self.model.encode_image(batch_tensor)
                img_feats = img_feats / img_feats.norm(dim=-1, keepdim=True)
                sims = (img_feats @ self.vibe_features.T).cpu().numpy()
                feats_np = img_feats.cpu().numpy()
                
            for idx, item in enumerate(valid_items):
                sem_vec = feats_np[idx]
                col_vec = item["color_vec"]
                fused_vec = np.concatenate([sem_vec * 0.75, col_vec * 0.25])
                
                vibe_sims = sims[idx]
                top_vibe_idx = int(np.argmax(vibe_sims))
                
                item["semantic_vec"] = sem_vec
                item["fused_vec"] = fused_vec
                item["vibe_name"] = self.vibe_names[top_vibe_idx]
                item["vibe_score"] = float(vibe_sims[top_vibe_idx])
                results.append(item)
                
            print(f"  Processed [{min(i + batch_size, n_total)}/{n_total}] photos...", end="\r", flush=True)
            
        print()
        return results

def find_optimal_clusters(features: np.ndarray, min_k: int = 8, max_k: int = 16) -> int:
    """
    Find optimal cluster count gravitating toward [8, 15], penalizing > 15 heavily.
    """
    n_samples = len(features)
    min_k = max(2, min(min_k, n_samples - 1))
    max_k = min(max_k, n_samples - 1)
    
    if min_k >= max_k:
        return max(1, min_k)
        
    best_k = min_k
    best_score = -float("inf")
    
    print("\n🔍 Evaluating cluster coherence with fuzzy prior [8, 15]...")
    for k in range(min_k, max_k + 1):
        km = KMeans(n_clusters=k, n_init=10, random_state=42)
        labels = km.fit_predict(features)
        sil = silhouette_score(features, labels)
        
        # Penalty formula
        penalty_above = 0.25 * max(0, k - 15)
        penalty_below = 0.12 * max(0, 8 - k)
        penalized_score = sil - penalty_above - penalty_below
        
        print(f"  k={k:02d} | Silhouette: {sil:+.3f} | Penalized Score: {penalized_score:+.3f}")
        if penalized_score > best_score:
            best_score = penalized_score
            best_k = k
            
    print(f"✨ Selected optimal k = {best_k}\n")
    return best_k

def get_color_tone_descriptor(palette: Dict[str, str]) -> str:
    accent_rgb = hex_to_rgb(palette["accent"])
    bg_rgb = hex_to_rgb(palette["bg"])
    avg_lum = (0.299 * bg_rgb[0] + 0.587 * bg_rgb[1] + 0.114 * bg_rgb[2])
    
    r, g, b = [x / 255.0 for x in accent_rgb]
    mx, mn = max(r, g, b), min(r, g, b)
    df = mx - mn
    if df < 0.08:
        hue = "Slate"
    elif mx == r:
        hue = "Rose" if (b > 0.35) else ("Amber" if g > 0.45 else "Crimson")
    elif mx == g:
        hue = "Matcha" if (r > 0.3) else "Emerald"
    else:
        hue = "Indigo" if r > 0.3 else "Cobalt"
        
    if avg_lum > 115:
        return f"Sand & {hue}"
    return hue

def run_extraction(photos_dir: str, output_dir: str = ".", clean: bool = True):
    photos = []
    supported_extensions = (
        "*.jpg", "*.jpeg", "*.png", "*.webp", "*.heic",
        "*.JPG", "*.JPEG", "*.PNG", "*.WEBP", "*.HEIC"
    )
    for ext in supported_extensions:
        photos.extend(glob.glob(os.path.join(photos_dir, ext)))
        
    photos = sorted(list(set(photos)))
    if not photos:
        print(f"❌ No photos found in '{photos_dir}'.")
        sys.exit(1)
        
    print(f"📸 Found {len(photos)} valid photos in '{photos_dir}'.")
    if clean:
        print("🧹 Clean run requested: existing dynamic themes will be refreshed from scratch.")
        
    extractor = MoodThemeExtractor()
    analyzed = extractor.extract_batch(photos, batch_size=32)
    
    if not analyzed:
        print("❌ Could not process any images.")
        sys.exit(1)
        
    fused_matrix = np.array([item["fused_vec"] for item in analyzed])
    
    # Fuzzy bounds for natural clustering
    k = find_optimal_clusters(fused_matrix, min_k=8, max_k=16)
    
    kmeans = KMeans(n_clusters=k, n_init=15, random_state=42)
    labels = kmeans.fit_predict(fused_matrix)
    
    clusters = {}
    for item, label in zip(analyzed, labels):
        clusters.setdefault(int(label), []).append(item)
        
    themes = {}
    used_names = set()
    
    for cluster_id, items in clusters.items():
        vibe_scores = {}
        for item in items:
            vibe_scores[item["vibe_name"]] = vibe_scores.get(item["vibe_name"], 0) + item["vibe_score"]
        top_vibe = max(vibe_scores, key=vibe_scores.get)
        
        cluster_center = kmeans.cluster_centers_[cluster_id]
        closest_item = min(items, key=lambda it: np.linalg.norm(it["fused_vec"] - cluster_center))
        palette = closest_item["palette"]
        
        # Disambiguate duplicate vibe names with color tone
        display_name = top_vibe
        if display_name in used_names:
            tone = get_color_tone_descriptor(palette)
            display_name = f"{top_vibe} ({tone})"
        used_names.add(display_name)
        
        theme_slug = re.sub(r"[^a-z0-9]+", "_", display_name.lower()).strip("_")
        if theme_slug in themes:
            theme_slug = f"{theme_slug}_{cluster_id}"
            
        themes[theme_slug] = {
            "id": theme_slug,
            "name": display_name,
            "item_count": len(items),
            "sample_photos": [it["filename"] for it in items[:6]],
            "centroid": cluster_center.tolist(),
            "colors": palette
        }
        
    # Save themes.json
    themes_path = os.path.join(output_dir, "themes.json")
    with open(themes_path, "w") as f:
        json.dump(themes, f, indent=2)
    print(f"\n💾 Saved {len(themes)} generated themes to {themes_path}")
    
    # Update config.js
    update_site_config(themes, config_path=os.path.join(output_dir, "config.js"))

def update_site_config(themes: Dict[str, Any], config_path: str = "config.js"):
    if not os.path.exists(config_path):
        print(f"⚠️  {config_path} not found.")
        return
        
    combined_themes = dict(DEFAULT_BASE_THEME)
    for tid, tdata in themes.items():
        combined_themes[tid] = {
            "name": tdata["name"],
            "colors": tdata["colors"]
        }
        
    js_themes_str = json.dumps(combined_themes, indent=4)
    js_themes_str = "\n".join("  " + line if line.strip() else line for line in js_themes_str.split("\n"))
    
    with open(config_path, "r") as f:
        content = f.read()
        
    pattern = r"themes:\s*\{[\s\S]*?\n  \}"
    replacement = f"themes: {js_themes_str.strip()}"
    new_content = re.sub(pattern, lambda _: replacement, content)
    
    with open(config_path, "w") as f:
        f.write(new_content)
    print(f"🔄 Successfully updated {config_path} with {len(combined_themes)} dynamic themes (Base Default + {len(themes)} Journey Themes).")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract mood themes from photo collection.")
    parser.add_argument("--photos", default="/Users/yattew/Desktop/photos", help="Directory containing photos.")
    parser.add_argument("--out", default=".", help="Output directory for themes.json & config.js.")
    parser.add_argument("--clean", action="store_true", default=True, help="Start fresh from clean state.")
    args = parser.parse_args()
    
    run_extraction(args.photos, args.out, clean=args.clean)
