# Personal Blog & Portfolio

A minimal, config-driven blog and portfolio site built with zero-build frontend tooling, ready for GitHub Pages deployment.

## Features

- **Zero-build setup**: Pure modern HTML5, CSS3, and ES Modules. No complex build pipelines or bundler overhead.
- **Config-driven**: Centralized [`config.js`](file:///Users/yattew/Desktop/personal-blog/config.js) controls metadata, theme palettes, and future content schemas.
- **Dynamic Palette Architecture**: CSS custom properties linked to configuration states for smooth journey-based color themes.
- **Automated Deployment**: Native GitHub Actions workflow to publish on every push to `main`.

## Local Development

Preview locally using any lightweight static server:

```bash
# Using Python
python3 -m http.server 8000

# Or using npx
npx serve .
```

Then visit `http://localhost:8000`.

## GitHub Pages Deployment

1. Create a remote repository on GitHub and push this directory:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! Every future push to `main` will automatically trigger `.github/workflows/deploy.yml` and publish your site.
