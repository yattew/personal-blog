#!/usr/bin/env python3
"""
Incremental Photo Tagger & Theme Generator
Classifies new photos against existing theme centroids in themes.json.
If similarity >= threshold: tags photo to existing theme.
If similarity < threshold: discovers a novel aesthetic and synthesizes a new theme into config.js.
"""

import os
import sys
import json
import argparse
import numpy as np

# Import extraction engine from extract_themes
from extract_themes import MoodThemeExtractor, update_site_config

def tag_image(img_path: str, themes_json_path: str = "themes.json", config_path: str = "config.js", threshold: float = 0.68):
    if not os.path.exists(themes_json_path):
        print(f"❌ '{themes_json_path}' not found. Please run scripts/extract_themes.py on your initial photo set first.")
        sys.exit(1)
        
    with open(themes_json_path, "r") as f:
        themes = json.load(f)
        
    if not themes:
        print(f"❌ No existing themes found in '{themes_json_path}'.")
        sys.exit(1)
        
    print(f"🔍 Analyzing new photo: {os.path.basename(img_path)}")
    extractor = MoodThemeExtractor()
    item = extractor.extract_features(img_path)
    fused_vec = item["fused_vec"]
    
    # Calculate cosine similarity with each theme centroid
    scores = {}
    for tid, tdata in themes.items():
        centroid = np.array(tdata["centroid"])
        # Cosine similarity
        cos_sim = float(np.dot(fused_vec, centroid) / (np.linalg.norm(fused_vec) * np.linalg.norm(centroid) + 1e-8))
        scores[tid] = cos_sim
        
    best_tid = max(scores, key=scores.get)
    best_score = scores[best_tid]
    best_theme = themes[best_tid]
    
    print(f"\n📊 Match Results for '{item['filename']}':")
    for tid, s in sorted(scores.items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"   • {themes[tid]['name']:<24} (score: {s:.3f})")
        
    if best_score >= threshold:
        print(f"\n🎯 Strong Match! Tagged to: '{best_theme['name']}' (confidence: {best_score * 100:.1f}%)")
        if item["filename"] not in best_theme.get("sample_photos", []):
            best_theme.setdefault("sample_photos", []).append(item["filename"])
            best_theme["item_count"] = best_theme.get("item_count", 0) + 1
            
            with open(themes_json_path, "w") as f:
                json.dump(themes, f, indent=2)
        return best_tid
    else:
        print(f"\n✨ Novel Aesthetic Detected! (Top similarity was only {best_score * 100:.1f}% to '{best_theme['name']}')")
        print(f"   Image vibe leans towards: '{item['vibe_name']}'")
        
        # Create a new theme
        import re
        new_id = re.sub(r"[^a-z0-9]+", "_", item["vibe_name"].lower()).strip("_")
        if new_id in themes:
            new_id = f"{new_id}_{len(themes) + 1}"
            
        new_theme = {
            "id": new_id,
            "name": item["vibe_name"],
            "item_count": 1,
            "sample_photos": [item["filename"]],
            "centroid": fused_vec.tolist(),
            "colors": item["palette"]
        }
        themes[new_id] = new_theme
        
        with open(themes_json_path, "w") as f:
            json.dump(themes, f, indent=2)
            
        update_site_config(themes, config_path=config_path)
        print(f"🎉 Created and added new theme: '{item['vibe_name']}' (id: '{new_id}') to {config_path}")
        return new_id

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Classify or spawn a new theme for a photo.")
    parser.add_argument("photo", help="Path to the photo file.")
    parser.add_argument("--themes", default="themes.json", help="Path to themes.json.")
    parser.add_argument("--config", default="config.js", help="Path to config.js.")
    parser.add_argument("--threshold", type=float, default=0.68, help="Similarity threshold for matching existing theme.")
    args = parser.parse_args()
    
    tag_image(args.photo, args.themes, args.config, args.threshold)
