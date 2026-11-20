import { siteConfig } from "../config.js";

let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById("mobile-toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("visible");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("visible");
  }, 1800);
}

function triggerHaptic(duration = 10) {
  if ("vibrate" in navigator) {
    try {
      navigator.vibrate(duration);
    } catch (e) {}
  }
}

function getContrastColor(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum > 140 ? "#1a1816" : "#f5f3f0";
}

function applyTheme(themeKey, autoScroll = false) {
  const theme = siteConfig.themes[themeKey] || siteConfig.themes.default;
  const root = document.documentElement;

  // 1. Set core token variables
  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--${key}`, value);
  }

  // 2. Dynamically sync mobile browser status bar / theme color
  const metaTheme = document.getElementById("meta-theme-color");
  if (metaTheme && theme.colors.bg) {
    metaTheme.setAttribute("content", theme.colors.bg);
  }

  // 3. Set multi-color palette variables (8 colors)
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

  // 4. Update Poetic quote
  const poetryEl = document.getElementById("theme-poetry");
  if (poetryEl && theme.poetry) {
    poetryEl.textContent = `"${theme.poetry}"`;
  }

  // 5. Update photo count badge
  const countEl = document.getElementById("photo-count");
  if (countEl) {
    if (themeKey === "default") {
      countEl.textContent = "Base Minimal";
    } else {
      countEl.textContent = `${theme.name}`;
    }
  }

  // 6. Render 8 Color Swatches
  const swatchesContainer = document.getElementById("palette-swatches");
  if (swatchesContainer) {
    swatchesContainer.innerHTML = "";
    palette.forEach((hex) => {
      const swatch = document.createElement("div");
      swatch.className = "swatch";
      swatch.style.backgroundColor = hex;
      swatch.style.color = getContrastColor(hex);
      swatch.textContent = hex;
      swatch.setAttribute("role", "button");
      swatch.setAttribute("aria-label", `Copy color ${hex}`);
      
      swatch.addEventListener("click", () => {
        triggerHaptic(12);
        navigator.clipboard.writeText(hex);
        showToast(`Copied ${hex}`);
      });
      swatchesContainer.appendChild(swatch);
    });
  }

  // 7. Update button active states and auto-scroll on mobile
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    const isActive = btn.dataset.theme === themeKey;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
    
    if (isActive && autoScroll) {
      btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
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
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", themeKey === "default" ? "true" : "false");
    
    btn.addEventListener("click", () => {
      triggerHaptic(8);
      applyTheme(themeKey, true);
    });
    container.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderThemeButtons();
  applyTheme("default", false);
  console.log(`${siteConfig.title} initialized in mobile-native mode.`);
});
