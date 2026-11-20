# Project Guidelines: Personal Blog & Portfolio

## Architecture Principles
- **Zero-Build Frontend**: Use pure modern HTML5, CSS3, and ES Modules (`index.html`, `css/style.css`, `js/main.js`, `config.js`). Do not add complex bundler frameworks (Webpack, Vite, Remix, Next) unless explicitly requested.
- **Continuous Deployment**: The site deploys to GitHub Pages via native GitHub Actions workflow (`.github/workflows/deploy.yml`) on every push to `main`.
- **Live URL**: `https://yattew.github.io/personal-blog/`

## Design & Color System
- **Default Aesthetic**: Warm beige / parchment Gruvbox light theme.
- **Zero Stark Whites**: Avoid pure `#ffffff` or bleached backgrounds/overlays. Use warm paper/sand tones (`#ebe3d5`, `#dfd5c2`) with deep roast charcoal (`#342e29`) and earthy accents (`#b85420`).
- **Dynamic Palette Switching**: All colors must use CSS variables (`--bg`, `--surface`, `--text`, `--muted`, `--accent`, `--border`, `--shadow`) driven dynamically from `config.js`. Smooth transitions on all palette shifts.

## Local AI & Photo Pipeline
- **Strictly Local AI**: Run local models only (Apple Silicon Metal/MPS). Never send images to cloud AI APIs.
- **Multimodal Extraction**: Photos are processed by `scripts/extract_themes.py` using OpenCLIP for mood/atmosphere embeddings and CIE Lab K-Means for color dominance.
- **Clustering Rule**: Natural clustering with a prior gravitating toward 8–15 themes, heavily penalizing cluster counts above 15.
- **Incremental Ingestion**: `scripts/tag_photo.py` classifies new photos against existing centroids, or spawns new themes when novel visual aesthetics appear.
