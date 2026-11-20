import { siteConfig } from "../config.js";

function getContrastColor(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum > 140 ? "#1a1816" : "#f5f3f0";
}

function applyTheme(themeKey) {
  const theme = siteConfig.themes[themeKey] || siteConfig.themes.default;
  const root = document.documentElement;

  // 1. Set core token variables
  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--${key}`, value);
  }

  // 2. Set multi-color palette variables (8 colors)
  const palette = theme.palette || [
    theme.colors.bg,
    theme.colors.surface,
    theme.colors.border,
    theme.colors.muted,
    theme.colors.accent,
    theme.colors.text
  ];

  palette.forEach((color, idx) => {
    root.style.setProperty(`--palette-${idx}`, color);
  });

  // 3. Update Poetic quote
  const poetryEl = document.getElementById("theme-poetry");
  if (poetryEl && theme.poetry) {
    poetryEl.textContent = `"${theme.poetry}"`;
  }

  // 4. Update photo count badge
  const countEl = document.getElementById("photo-count");
  if (countEl) {
    if (themeKey === "default") {
      countEl.textContent = "Foundational Base";
    } else {
      countEl.textContent = `${theme.name} Palette`;
    }
  }

  // 5. Render 8 Color Swatches
  const swatchesContainer = document.getElementById("palette-swatches");
  if (swatchesContainer) {
    swatchesContainer.innerHTML = "";
    palette.forEach((hex) => {
      const swatch = document.createElement("div");
      swatch.className = "swatch";
      swatch.style.backgroundColor = hex;
      swatch.style.color = getContrastColor(hex);
      swatch.textContent = hex;
      swatch.title = `Click to copy ${hex}`;
      swatch.addEventListener("click", () => {
        navigator.clipboard.writeText(hex);
        const originalText = swatch.textContent;
        swatch.textContent = "COPIED";
        setTimeout(() => {
          swatch.textContent = originalText;
        }, 1200);
      });
      swatchesContainer.appendChild(swatch);
    });
  }

  // 6. Update button active states
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === themeKey);
  });
}

function renderThemeButtons() {
  const container = document.getElementById("theme-buttons");
  if (!container) return;

  container.innerHTML = "";
  for (const [themeKey, themeData] of Object.entries(siteConfig.themes)) {
    const btn = document.createElement("button");
    btn.className = "theme-btn" + (themeKey === "default" ? " active" : "");
    btn.dataset.theme = themeKey;
    btn.textContent = themeData.name;
    btn.addEventListener("click", () => applyTheme(themeKey));
    container.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderThemeButtons();
  applyTheme("default");
  console.log(`${siteConfig.title} initialized with ${Object.keys(siteConfig.themes).length} dynamic themes.`);
});
