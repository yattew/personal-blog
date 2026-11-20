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

document.addEventListener("DOMContentLoaded", () => {
  // Apply initial default theme
  applyTheme("default");

  // Hook up preview palette switchers
  const themeButtons = document.querySelectorAll(".theme-btn");
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyTheme(btn.dataset.theme);
    });
  });

  console.log(`${siteConfig.title} initialized (v${siteConfig.version})`);
});
