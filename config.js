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
      "default": {
          "name": "Warm Beige",
          "colors": {
              "bg": "#ebe3d5",
              "surface": "#dfd5c2",
              "text": "#342e29",
              "muted": "#786d62",
              "accent": "#b85420",
              "border": "#cbbda8",
              "shadow": "0 10px 25px rgba(52, 46, 41, 0.08)"
          },
          "poetry": "Sunlit parchment and quiet morning cedar resting on tactile linen.",
          "palette": [
              "#ebe3d5",
              "#dfd5c2",
              "#cbbda8",
              "#b5a591",
              "#8f806e",
              "#786d62",
              "#b85420",
              "#342e29"
          ]
      },
      "tokyo_neon_noir": {
          "name": "Tokyo Neon Noir",
          "poetry": "In Tokyo's neon shadows, cities pulse with secrets, hues of midnight and dawn blend, the streets weave through pastel dreams.",
          "colors": {
              "bg": "#0b0a0e",
              "surface": "#2a292a",
              "text": "#e4d7d7",
              "muted": "#7d757a",
              "accent": "#bb8b86",
              "border": "#35323c",
              "shadow": "0 10px 30px rgba(0, 0, 0, 0.55)"
          },
          "palette": [
              "#0f1219",
              "#2a2b2e",
              "#1f3b96",
              "#4e4d41",
              "#b64939",
              "#776d66",
              "#a6938f",
              "#d7c0b3"
          ]
      },
      "akihabara_electric_pop": {
          "name": "Akihabara Electric Pop",
          "poetry": "In the depths of Akihabara, neon lights dance like stars in a nocturnal sky, illuminating the vibrant world of electric pop.",
          "colors": {
              "bg": "#06070a",
              "surface": "#1a1f24",
              "text": "#d7d7d7",
              "muted": "#707274",
              "accent": "#977b64",
              "border": "#21272d",
              "shadow": "0 10px 30px rgba(0, 0, 0, 0.55)"
          },
          "palette": [
              "#0c0e12",
              "#242626",
              "#4d3a2c",
              "#44545a",
              "#875231",
              "#877d79",
              "#ce824a",
              "#d8b7a1"
          ]
      },
      "tokyo_neon_noir_amber": {
          "name": "Golden Gai Nights",
          "poetry": "Amber whispers through neon-lit Tokyo, its shadows deep and cool, like a whispered secret.",
          "colors": {
              "bg": "#06080b",
              "surface": "#1e242a",
              "text": "#ead7d7",
              "muted": "#7b7477",
              "accent": "#c68c57",
              "border": "#262d36",
              "shadow": "0 10px 30px rgba(0, 0, 0, 0.55)"
          },
          "palette": [
              "#111212",
              "#2e2c28",
              "#464949",
              "#7d5439",
              "#686d74",
              "#8899a4",
              "#c7a188",
              "#bbc5ca"
          ]
      },
      "tokyo_neon_noir_slate": {
          "name": "Omoide Yokocho",
          "poetry": "In Tokyo\u2019s neon noir, the streets whisper secrets in hues of slate and twilight.",
          "colors": {
              "bg": "#06070a",
              "surface": "#161a1f",
              "text": "#d7d7d7",
              "muted": "#6e7072",
              "accent": "#121918",
              "border": "#1d2127",
              "shadow": "0 10px 30px rgba(0, 0, 0, 0.55)"
          },
          "palette": [
              "#0e1111",
              "#333030",
              "#5c5450",
              "#2870ce",
              "#bf672f",
              "#887778",
              "#9d98b0",
              "#d5c2c1"
          ]
      },
      "shinkansen_countryside": {
          "name": "Shinkansen Countryside",
          "poetry": "The Shinkansen Countryside whispers in shades of night, where shadows dance with hues of twilight, painting a tapestry of tranquility and reflection under the moonlit sky.",
          "colors": {
              "bg": "#0f1010",
              "surface": "#2a2a2a",
              "text": "#d7d7d7",
              "muted": "#7b7b7c",
              "accent": "#15397b",
              "border": "#3c3c3c",
              "shadow": "0 10px 30px rgba(0, 0, 0, 0.55)"
          },
          "palette": [
              "#111419",
              "#24262a",
              "#423d39",
              "#5e5753",
              "#827367",
              "#a08e80",
              "#cd8931",
              "#b5aaa3"
          ]
      },
      "tokyo_rain_melancholy": {
          "name": "Tokyo Rain",
          "poetry": "In Tokyo's melancholic heart, where rain dances over cobblestones, the city whispers its secrets under a night sky of soft pinks and purples, capturing the",
          "colors": {
              "bg": "#06070a",
              "surface": "#1e2027",
              "text": "#d7d7d7",
              "muted": "#717275",
              "accent": "#7d464a",
              "border": "#262930",
              "shadow": "0 10px 30px rgba(0, 0, 0, 0.55)"
          },
          "palette": [
              "#090d12",
              "#1d2325",
              "#433830",
              "#5b5c5c",
              "#c14e17",
              "#88807a",
              "#bd9c83",
              "#d2c1b4"
          ]
      },
      "sunlit_urban_afternoon": {
          "name": "Sunlit Urban Afternoon",
          "poetry": "Under the warm glow of the setting sun, the city's hues shift from muted earth tones to vibrant shades of gold and orange, creating an enchanting tapestry of life and",
          "colors": {
              "bg": "#0e0c0a",
              "surface": "#2a2a26",
              "text": "#d7d7d7",
              "muted": "#7a7874",
              "accent": "#453627",
              "border": "#3c392f",
              "shadow": "0 10px 30px rgba(0, 0, 0, 0.55)"
          },
          "palette": [
              "#12120e",
              "#2e2c22",
              "#5d452d",
              "#425970",
              "#83674c",
              "#8e8580",
              "#c08d5b",
              "#c2b3a3"
          ]
      },
      "midnight_ramen_izakaya": {
          "name": "Midnight Ramen",
          "poetry": "In the quietude of midnight, a ramen bowl whispers ancient tales in the shadows of an izakaya, its warm hues reflecting on the flickering candles and the soft",
          "colors": {
              "bg": "#06070a",
              "surface": "#1c2029",
              "text": "#d7d7d7",
              "muted": "#717275",
              "accent": "#052659",
              "border": "#242932",
              "shadow": "0 10px 30px rgba(0, 0, 0, 0.55)"
          },
          "palette": [
              "#091113",
              "#26281b",
              "#093b74",
              "#4a4233",
              "#746758",
              "#ae8e72",
              "#bdafa2",
              "#d0d0ce"
          ]
      },
      "shinkansen_countryside_indigo": {
          "name": "Shinkansen Twilight",
          "poetry": "The Shinkansen countryside, painted in indigo hues and deep shadows of twilight, offers a hauntingly tranquil symphony for the eye.",
          "colors": {
              "bg": "#06070a",
              "surface": "#1c1c1a",
              "text": "#d7d7d7",
              "muted": "#717170",
              "accent": "#667283",
              "border": "#242421",
              "shadow": "0 10px 30px rgba(0, 0, 0, 0.55)"
          },
          "palette": [
              "#0e0d0a",
              "#29251c",
              "#48412e",
              "#0068a1",
              "#655f4e",
              "#807e77",
              "#969da1",
              "#bbbbbb"
          ]
      },
      "sens_ji_historic_crimson": {
          "name": "Sens\u014d-ji Crimson",
          "poetry": "In crimson hues and ancient stone, beneath silent skies and moonlit paths, the sacred temple whispers tales of time in its historic crimson.",
          "colors": {
              "bg": "#c5c8c7",
              "surface": "#b5b8b7",
              "text": "#191919",
              "muted": "#6f7070",
              "accent": "#6c7d42",
              "border": "#adb0af",
              "shadow": "0 10px 25px rgba(50, 45, 40, 0.08)"
          },
          "palette": [
              "#12110d",
              "#2f2a18",
              "#0b558a",
              "#544822",
              "#826539",
              "#918675",
              "#d88e69",
              "#c0b8b0"
          ]
      },
      "kyoto_moss_bamboo": {
          "name": "Kyoto Bamboo",
          "poetry": "In Kyoto, moss whispers secrets under towering bamboo archways, where the soft green leaves intertwine with golden hues of autumn, creating a canvas painted by the seasons.",
          "colors": {
              "bg": "#141714",
              "surface": "#2a2a2a",
              "text": "#d7d7d7",
              "muted": "#80827f",
              "accent": "#424b44",
              "border": "#3c3c3c",
              "shadow": "0 10px 30px rgba(0, 0, 0, 0.55)"
          },
          "palette": [
              "#121413",
              "#292b22",
              "#3c3f33",
              "#535442",
              "#676a5c",
              "#828579",
              "#9fa4a3",
              "#d2cdc7"
          ]
      },
      "sunlit_urban_afternoon_sand_slate": {
          "name": "Ginza Afternoon",
          "poetry": "In hues of twilight and warmth, the city's streets reflect a serene ballet of sand and slate, where every step echoes with the rhythm of sunlit.",
          "colors": {
              "bg": "#c7c1bb",
              "surface": "#b7b1ac",
              "text": "#191919",
              "muted": "#706d6a",
              "accent": "#3e3b34",
              "border": "#afa9a4",
              "shadow": "0 10px 25px rgba(50, 45, 40, 0.08)"
          },
          "palette": [
              "#17140e",
              "#352e27",
              "#4e4438",
              "#6c5d4d",
              "#917963",
              "#a8998e",
              "#b4c1ce",
              "#e4d8d7"
          ]
      }
  }
};
