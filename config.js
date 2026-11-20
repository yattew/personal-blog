/**
 * Central Site Configuration
 * Drives content, metadata, analytics hooks, and thematic journey palettes.
 */
export const siteConfig = {
  title: "Personal Blog & Portfolio",
  tagline: "Stories, diaries, and journeys",
  version: "0.1.0",
  
  // Theme palettes designed for dynamic context switching
  themes: {
    default: {
      name: "Default Minimal",
      colors: {
        bg: "#0a0c10",
        surface: "#12151c",
        text: "#f0f3f6",
        muted: "#8c95a5",
        accent: "#38bdf8",
        border: "#1f242e"
      }
    },
    japan: {
      name: "Tokyo Nightfall",
      colors: {
        bg: "#080914",
        surface: "#0f1124",
        text: "#f5f6fa",
        muted: "#868eae",
        accent: "#f43f5e",
        border: "#202444"
      }
    },
    rajasthan: {
      name: "Rajasthan Ochre",
      colors: {
        bg: "#16130f",
        surface: "#211c16",
        text: "#faf4ed",
        muted: "#a89b8c",
        accent: "#e07a2d",
        border: "#382e24"
      }
    }
  }
};
