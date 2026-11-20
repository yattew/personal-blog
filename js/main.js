import { siteConfig } from "../config.js";

function applyTheme(themeKey) {
  const theme = siteConfig.themes[themeKey] || siteConfig.themes.default;
  const root = document.documentElement;

  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--${key}`, value);
  }

  // Update button active state
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === themeKey);
  });
}

function renderThemeButtons() {
  const container = document.querySelector(".theme-preview");
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
  console.log(`${siteConfig.title} initialized (v${siteConfig.version})`);
});
