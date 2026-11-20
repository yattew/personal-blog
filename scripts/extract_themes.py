#!/usr/bin/env python3
"""
Photo Mood & Theme Extraction Pipeline
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
    import open_clip
except ImportError:
    open_clip = None

# Curated aesthetic dimensions for zero-shot naming and mood alignment
AESTHETIC_VIBES = {
    "Tokyo Neon Noir": "cyberpunk neon night street in tokyo with glowing signs and wet asphalt",
    "Rajasthan Terracotta": "warm earthen desert fortress in rajasthan with sand, clay, and warm amber light",
    "Kyoto Moss & Cedar": "peaceful japanese garden temple with lush green moss and wooden cedar pavilions",
    "Alpine Morning Mist": "moody foggy pine mountains with cold morning blue mist and evergreen trees",
    "Mediterranean Azure": "bright coastal sea with sunlit azure turquoise water and warm limestone",
    "Cozy Amber Intimacy": "warm indoor cafe atmosphere with soft vintage lighting and deep espresso tones",
    "Rainy Urban Melancholy": "moody rainy city streets with overcast grey skies and soft reflections",
    "Golden Hour Nostalgia": "warm golden hour sunlight spilling across fields with rich honey and bronze hues",
    "Nordic Minimalist Slate": "stark scandinavian landscape with cold slate grey rocks and calm muted overcast",
    "Emerald Forest Sanctuary": "dense deep green jungle foliage with filtered canopy sunlight",
    "Desert Twilight": "purple and ochre desert sunset with pastel dusk gradients and silhouettes",
    "Vintage Sepia Heritage": "nostalgic rustic heritage architecture with sepia, grain, and weathered leather tones",
    "Industrial Monochrome": "brutalist concrete architecture with deep monochrome shadows and sharp edges",
    "Highland Autumn Russet": "crisp autumn landscape with burnt orange russet leaves and earthen loam"
}

def rgb_to_hex(r: int, g: int, b: int) -> str:
    return f"#{int(r):02x}{int(g):02x}{int(b):02x}"

def hex_to_rgb(hex_str: str) -> Tuple[int, int, int]:
    hex_str = hex_str.lstrip("#")
    return int(hex_str[0:2], 16), int(hex_str[2:4], 16), int(hex_str[4:6], 16)

def extract_dominant_colors(image: Image.Image, n_colors: int = 5) -> List[Tuple[int, int, int]]:
    """Extract dominant RGB colors using fast k-means in RGB space."""
    img_small = image.resize((120, 120)).convert("RGB")
    pixels = np.array(img_small).reshape(-1, 3)
    
    kmeans = KMeans(n_clusters=n_colors, n_init=3, max_iter=20, random_state=42)
    kmeans.fit(pixels)
    colors = kmeans.cluster_centers_.astype(int)
    
    # Sort by luminance
    colors = sorted(colors, key=lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2])
    return [tuple(c) for c in colors]

def synthesize_palette(dominant_colors: List[Tuple[int, int, int]]) -> Dict[str, str]:
    """
    Synthesize the 6-token theme schema from sorted dominant colors:
    bg, surface, text, muted, accent, border, shadow
    """
    darkest = dominant_colors[0]
    lightest = dominant_colors[-1]
    
    # Calculate saturation for accent candidate
    def saturation(c):
        mx, mn = max(c), min(c)
        return (mx - mn) / (mx + 1e-5)
    
    # Find most saturated color among non-extremes for accent
    non_extremes = dominant_colors[1:-1] if len(dominant_colors) > 2 else dominant_colors
    accent_color = max(non_extremes, key=saturation)
    
    # Check if overall image leans dark or light
    avg_lum = (0.299 * darkest[0] + 0.587 * darkest[1] + 0.114 * darkest[2] +
               0.299 * lightest[0] + 0.587 * lightest[1] + 0.114 * lightest[2]) / 2
    
    if avg_lum < 110:
        # Dark theme
        bg = rgb_to_hex(*darkest)
        # surface slightly lighter than bg
        surface_rgb = [min(255, int(c * 1.35 + 8)) for c in darkest]
        surface = rgb_to_hex(*surface_rgb)
        text = rgb_to_hex(*lightest)
        muted_rgb = [(d + l) // 2 for d, l in zip(darkest, lightest)]
        muted = rgb_to_hex(*muted_rgb)
        accent = rgb_to_hex(*accent_color)
        border_rgb = [min(255, int(c * 1.6 + 15)) for c in darkest]
        border = rgb_to_hex(*border_rgb)
        shadow = "0 10px 30px rgba(0, 0, 0, 0.45)"
    else:
        # Light / Beige theme
        bg = rgb_to_hex(*lightest)
        surface_rgb = [max(0, int(c * 0.94)) for c in lightest]
        surface = rgb_to_hex(*surface_rgb)
        text = rgb_to_hex(*darkest)
        muted_rgb = [(d + l) // 2 for d, l in zip(darkest, lightest)]
        muted = rgb_to_hex(*muted_rgb)
        accent = rgb_to_hex(*accent_color)
        border_rgb = [max(0, int(c * 0.85)) for c in lightest]
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
            
        print(f"🚀 Initializing MoodThemeExtractor on device: {self.device}")
        
        self.model, _, self.preprocess = open_clip.create_model_and_transforms(
            "ViT-B-32", pretrained="laion2b_s34b_b79k", device=self.device
        )
        self.model.eval()
        self.tokenizer = open_clip.get_tokenizer("ViT-B-32")
        
        # Precompute vibe text features
        self.vibe_names = list(AESTHETIC_VIBES.keys())
        vibe_prompts = list(AESTHETIC_VIBES.values())
        text_tokens = self.tokenizer(vibe_prompts).to(self.device)
        with torch.no_grad():
            text_features = self.model.encode_text(text_tokens)
            self.vibe_features = text_features / text_features.norm(dim=-1, keepdim=True)

    def extract_features(self, img_path: str) -> Dict[str, Any]:
        """Extract both semantic mood embedding and color profile for one image."""
        img = Image.open(img_path).convert("RGB")
        
        # 1. Semantic Embedding via CLIP
        tensor = self.preprocess(img).unsqueeze(0).to(self.device)
        with torch.no_grad():
            img_feat = self.model.encode_image(tensor)
            img_feat = img_feat / img_feat.norm(dim=-1, keepdim=True)
            
            # Zero-shot similarity to aesthetic vibes
            sims = (img_feat @ self.vibe_features.T).squeeze(0).cpu().numpy()
            top_vibe_idx = int(np.argmax(sims))
            top_vibe_name = self.vibe_names[top_vibe_idx]
            top_vibe_score = float(sims[top_vibe_idx])
            
        semantic_vec = img_feat.squeeze(0).cpu().numpy()
        
        # 2. Color Profile
        dominant_colors = extract_dominant_colors(img, n_colors=5)
        palette = synthesize_palette(dominant_colors)
        color_vec = np.array(dominant_colors).flatten() / 255.0
        
        # 3. Fused Vector (Normalized CLIP embedding weighted with color vector)
        fused_vec = np.concatenate([semantic_vec * 0.75, color_vec * 0.25])
        
        return {
            "path": img_path,
            "filename": os.path.basename(img_path),
            "fused_vec": fused_vec,
            "semantic_vec": semantic_vec,
            "palette": palette,
            "vibe_name": top_vibe_name,
            "vibe_score": top_vibe_score,
            "all_vibe_sims": {name: float(sims[i]) for i, name in enumerate(self.vibe_names)}
        }

def find_optimal_clusters(features: np.ndarray, min_k: int = 4, max_k: int = 18) -> int:
    """
    Find optimal cluster count with fuzzy force gravitating between 8 and 15,
    penalizing > 15 more heavily as specified by user requirements.
    """
    n_samples = len(features)
    min_k = max(2, min(min_k, n_samples - 1))
    max_k = min(max_k, n_samples - 1)
    
    if min_k >= max_k:
        return max(1, min_k)
        
    best_k = min_k
    best_score = -float("inf")
    
    print("\n🔍 Evaluating cluster coherence with fuzzy bounds [8, 15]...")
    for k in range(min_k, max_k + 1):
        km = KMeans(n_clusters=k, n_init=10, random_state=42)
        labels = km.fit_predict(features)
        sil = silhouette_score(features, labels)
        
        # Penalty formula:
        # Penalizes k > 15 harder (0.22 per k), penalizes k < 8 moderately (0.12 per k)
        penalty_above = 0.22 * max(0, k - 15)
        penalty_below = 0.12 * max(0, 8 - k)
        penalized_score = sil - penalty_above - penalty_below
        
        print(f"  k={k:02d} | Silhouette: {sil:+.3f} | Penalized: {penalized_score:+.3f}")
        if penalized_score > best_score:
            best_score = penalized_score
            best_k = k
            
    print(f"✨ Selected optimal k = {best_k}\n")
    return best_k

def run_extraction(photos_dir: str, output_dir: str = "."):
    photos = []
    for ext in ("*.jpg", "*.jpeg", "*.png", "*.webp", "*.JPG", "*.JPEG", "*.PNG"):
        photos.extend(glob.glob(os.path.join(photos_dir, ext)))
        
    if not photos:
        print(f"❌ No photos found in '{photos_dir}'. Please add images and re-run.")
        sys.exit(1)
        
    print(f"📸 Found {len(photos)} photos in '{photos_dir}'. Beginning mood & color analysis...")
    extractor = MoodThemeExtractor()
    
    analyzed = []
    for i, path in enumerate(photos, 1):
        print(f"  [{i}/{len(photos)}] Processing {os.path.basename(path)}...")
        item = extractor.extract_features(path)
        analyzed.append(item)
        
    fused_matrix = np.array([item["fused_vec"] for item in analyzed])
    
    # Determine cluster count
    k = find_optimal_clusters(fused_matrix, min_k=max(2, min(8, len(analyzed) // 2)), max_k=min(18, len(analyzed) - 1))
    
    kmeans = KMeans(n_clusters=k, n_init=15, random_state=42)
    labels = kmeans.fit_predict(fused_matrix)
    
    # Aggregate themes
    clusters = {}
    for item, label in zip(analyzed, labels):
        clusters.setdefault(int(label), []).append(item)
        
    themes = {}
    for cluster_id, items in clusters.items():
        # Representative vibe is the most frequent or highest scoring vibe in cluster
        vibe_counts = {}
        for item in items:
            vibe_counts[item["vibe_name"]] = vibe_counts.get(item["vibe_name"], 0) + item["vibe_score"]
        top_vibe = max(vibe_counts, key=vibe_counts.get)
        
        # Centroid representative palette: median/average color across items
        # To avoid mud, pick the item closest to the cluster center as the palette archetype
        cluster_center = kmeans.cluster_centers_[cluster_id]
        closest_item = min(items, key=lambda it: np.linalg.norm(it["fused_vec"] - cluster_center))
        
        theme_slug = re.sub(r"[^a-z0-9]+", "_", top_vibe.lower()).strip("_")
        if theme_slug in themes:
            theme_slug = f"{theme_slug}_{cluster_id}"
            
        themes[theme_slug] = {
            "id": theme_slug,
            "name": top_vibe,
            "item_count": len(items),
            "sample_photos": [it["filename"] for it in items[:6]],
            "centroid": cluster_center.tolist(),
            "colors": closest_item["palette"]
        }
        
    # Save themes.json
    themes_path = os.path.join(output_dir, "themes.json")
    with open(themes_path, "w") as f:
        json.dump(themes, f, indent=2)
    print(f"\n💾 Saved generated themes catalog to {themes_path}")
    
    # Update config.js with newly extracted themes
    update_site_config(themes, config_path=os.path.join(output_dir, "config.js"))

def update_site_config(themes: Dict[str, Any], config_path: str = "config.js"):
    if not os.path.exists(config_path):
        print(f"⚠️  {config_path} not found. Skipping config update.")
        return
        
    with open(config_path, "r") as f:
        content = f.read()
        
    # Format themes object for JS
    formatted_themes = {}
    for tid, tdata in themes.items():
        formatted_themes[tid] = {
            "name": tdata["name"],
            "colors": tdata["colors"]
        }
        
    js_themes_str = json.dumps(formatted_themes, indent=4)
    # Indent 4 spaces to match config.js style
    js_themes_str = "\n".join("  " + line if line.strip() else line for line in js_themes_str.split("\n"))
    
    new_content = re.sub(
        r"themes:\s*\{[\s\S]*?\n  \}",
        f"themes: {js_themes_str.strip()}",
        content
    )
    
    with open(config_path, "w") as f:
        f.write(new_content)
    print(f"🔄 Updated {config_path} with {len(themes)} dynamic journey palettes.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract mood themes from photo collection.")
    parser.add_argument("--photos", default="photos", help="Directory containing photos.")
    parser.add_argument("--out", default=".", help="Output directory for themes.json & config.js.")
    args = parser.parse_args()
    
    run_extraction(args.photos, args.out)
