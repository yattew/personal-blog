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
      name: "Gruvbox Beige",
      colors: {
        bg: "#fbf1c7",
        surface: "#f2e5bc",
        text: "#3c3836",
        muted: "#7c6f64",
        accent: "#af3a03",
        border: "#d5c4a1",
        shadow: "0 10px 30px rgba(60, 56, 54, 0.08)"
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
        border: "#202444",
        shadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
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
        border: "#382e24",
        shadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
      }
    }
  }
};
