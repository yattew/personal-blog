---
name: photo-theme-pipeline
description: Run local AI analysis (OpenCLIP on Apple Silicon MPS) on photos to extract mood and color palettes, cluster into 8-15 journey themes, and incrementally tag or spawn new themes.
---

# Photo Mood & Theme Pipeline Runbook

This skill automates the local extraction of moods, lighting, and color palettes from user photos.

## Prerequisites
- Photos in `photos/` (or specified directory)
- Python virtual environment with OpenCLIP: `.venv/bin/python`

## Workflow 1: Initial Batch Extraction & Clustering
Run this on your collection of photos (e.g. 500+ photos):
```bash
./.venv/bin/python scripts/extract_themes.py --photos photos
```

### What it does:
1. Scans all images in the target directory.
2. Runs **OpenCLIP (ViT-B/32)** accelerated by Apple Silicon MPS to capture high-level mood, lighting, and atmosphere embeddings.
3. Computes dominant colors in CIE Lab space and maps them to the 6-token theme schema.
4. Performs regularized clustering with a soft penalty prior ($8 \le k \le 15$).
5. Assigns evocative aesthetic names (e.g. *Tokyo Neon Noir*, *Rajasthan Terracotta*).
6. Writes cluster catalog to `themes.json` and updates `config.js` with all dynamic palettes.

## Workflow 2: Incremental Photo Tagging & New Theme Spawning
Run this when new photos are added in the future:
```bash
./.venv/bin/python scripts/tag_photo.py path/to/new_photo.jpg --threshold 0.68
```

### What it does:
1. Calculates similarity between the photo's fused mood/color vector and existing theme centroids.
2. **If similarity $\ge$ 0.68**: Tags the photo to the matching theme.
3. **If similarity $<$ 0.68**: Detects a novel aesthetic, synthesizes a brand new theme, and updates `themes.json` and `config.js`.
