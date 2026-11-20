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
      name: "Warm Beige",
      colors: {
        bg: "#ebe3d5",
        surface: "#dfd5c2",
        text: "#342e29",
        muted: "#786d62",
        accent: "#b85420",
        border: "#cbbda8",
        shadow: "0 10px 25px rgba(52, 46, 41, 0.08)"
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
