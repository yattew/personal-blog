import os, sys, json, colorsys
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans

TITLES = {
    1: ("Center Gai", "Shibuya Neon Energy"),
    2: ("Ramen Kitchen", "Midnight Broth & Amber"),
    3: ("Golden Shinjuku", "Golden Hour Cityscape"),
    4: ("Nocturne Kei", "Twilight Crossing Noir"),
    5: ("Rainy Platform", "Overcast Rain Quiet"),
    6: ("Asphalt Crossing", "Monochrome Rain Walk"),
    7: ("Transit Noir", "Steel Rails & Dusk"),
    8: ("Bamboo Grove", "Kyoto Zen Bamboo"),
    9: ("Ancient Timber", "Weathered Cedar Facade"),
    10: ("Night Train", "Suburban Crossing Signals"),
    11: ("Cinnabar Steps", "Inari Mountain Corridor"),
    12: ("Vermilion Gate", "Sacred Torii Gate"),
    13: ("Railway Signal", "Midnight Crossing Signal"),
    14: ("Stone Pilgrimage", "Ancient Temple Steps"),
    15: ("Moss Lantern", "Zen Toro Sanctuary"),
    16: ("Alpine Mist", "Cold Mountain Dawn"),
    17: ("Mirror Basin", "Turquoise Lake Stillness"),
    18: ("Mountain Expanse", "Rolling Ridge Panorama"),
    19: ("Timber Canopy", "Sacred Pine Sanctuary"),
    20: ("Temple Lattice", "Hinoki Geometric Wood"),
    21: ("Incense Drift", "Sensō-ji Incense Smoke"),
    22: ("Sunlit Courtyard", "Warm Stone Shadows"),
    23: ("Electric Pop", "Akihabara Cyber Arcade"),
    24: ("Neon Arcade", "Towering Neon Facades"),
    25: ("Midnight Tavern", "Steaming Broth & Lanterns"),
    26: ("Rural Track", "Country Station Quiet"),
    27: ("Shinkansen View", "Valley Rails Panorama"),
    28: ("Ruby Lantern", "Golden Gai Red Lantern"),
    29: ("Heritage Alley", "Antique Machiya Alleys"),
    30: ("Cloud Ocean", "Sunset Cloud Layer"),
    31: ("Transient Horizon", "Wing Above Golden Cloud"),
    32: ("Stratosphere Dusk", "Pastel Twilight Sky"),
    33: ("Sunset Wing", "Polished Wing Sunset"),
    34: ("Cosmic Night", "Deep Altitude Indigo"),
    35: ("Runway Lights", "City Approach Flashes"),
    36: ("Self Portrait", "Sunlit Courtyard Portrait")
}

DATES = {
    1: "NOV 03 '26 • 15:35 JST",
    2: "OCT 24 '26 • 14:40 JST",
    3: "OCT 26 '26 • 00:05 JST",
    4: "OCT 26 '26 • 00:10 JST",
    5: "OCT 26 '26 • 21:04 JST",
    6: "OCT 26 '26 • 21:51 JST",
    7: "OCT 26 '26 • 21:59 JST",
    8: "OCT 27 '26 • 07:38 JST",
    9: "OCT 27 '26 • 18:26 JST",
    10: "OCT 29 '26 • 21:31 JST",
    11: "OCT 29 '26 • 21:37 JST",
    12: "OCT 29 '26 • 21:38 JST",
    13: "OCT 29 '26 • 21:51 JST",
    14: "OCT 29 '26 • 22:30 JST",
    15: "OCT 29 '26 • 22:32 JST",
    16: "OCT 30 '26 • 10:34 JST",
    17: "OCT 30 '26 • 11:34 JST",
    18: "OCT 30 '26 • 21:12 JST",
    19: "OCT 31 '26 • 12:04 JST",
    20: "OCT 31 '26 • 12:11 JST",
    21: "OCT 31 '26 • 21:59 JST",
    22: "NOV 01 '26 • 19:59 JST",
    23: "NOV 03 '26 • 21:02 JST",
    24: "NOV 03 '26 • 21:07 JST",
    25: "NOV 05 '26 • 06:50 JST",
    26: "NOV 06 '26 • 13:23 JST",
    27: "NOV 06 '26 • 13:27 JST",
    28: "NOV 14 '26 • 00:16 JST",
    29: "NOV 14 '26 • 00:18 JST",
    30: "NOV 20 '26 • 23:31 JST",
    31: "NOV 20 '26 • 23:32 JST",
    32: "NOV 20 '26 • 23:33 JST",
    33: "NOV 20 '26 • 23:33 JST",
    34: "NOV 20 '26 • 23:34 JST",
    35: "NOV 20 '26 • 23:40 JST",
    36: "NOV 14 '26 • 19:18 JST"
}

def rgb_to_hex(r, g, b):
    return f"#{int(r):02x}{int(g):02x}{int(b):02x}"

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def hex_to_hsv(h):
    r, g, b = [x / 255.0 for x in hex_to_rgb(h)]
    return colorsys.rgb_to_hsv(r, g, b)

def hsv_to_hex(h, s, v):
    r, g, b = colorsys.hsv_to_rgb(h, s, v)
    return rgb_to_hex(r * 255, g * 255, b * 255)

def make_luminous(hex_col, target_l=0.75, min_s=0.85):
    h, s, v = hex_to_hsv(hex_col)
    s = max(s, min_s)
    v = max(v, target_l)
    return hsv_to_hex(h, s, v)

def extract_frame_colors(frame_idx):
    img_path = f"images/exposures/frame-{frame_idx:02d}.jpg"
    im = Image.open(img_path).convert("RGB")
    im_small = im.resize((160, 120))
    pixels = np.array(im_small).reshape(-1, 3)

    # KMeans with 10 clusters
    km = KMeans(n_clusters=10, n_init=5, random_state=42)
    labels = km.fit_predict(pixels)
    centers = km.cluster_centers_

    # Counts
    counts = np.bincount(labels)

    # Sort clusters by counts
    clusters = []
    for c, cnt in zip(centers, counts):
        r, g, b = c
        h, s, v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
        clusters.append({
            "rgb": (r, g, b),
            "hex": rgb_to_hex(r, g, b),
            "hsv": (h, s, v),
            "count": cnt,
            "weight": cnt / len(pixels)
        })

    # Darkest tone for base bg
    darks = sorted([c for c in clusters if c["hsv"][2] < 0.28], key=lambda x: x["hsv"][2])
    if darks:
        base_dark = darks[0]["hex"]
    else:
        # construct deep shadow from average color
        avg_h, avg_s, _ = clusters[0]["hsv"]
        base_dark = hsv_to_hex(avg_h, min(avg_s, 0.4), 0.08)

    # Secondary dark
    h_d, s_d, _ = hex_to_hsv(base_dark)
    secondary_dark = hsv_to_hex((h_d + 0.05) % 1.0, min(s_d + 0.1, 0.5), 0.14)

    # Chromatic accents (highest saturation and value score)
    chroma = sorted(clusters, key=lambda c: (c["hsv"][1] * 1.8 + c["hsv"][2] * 0.8), reverse=True)
    primary_c = chroma[0]
    primary_accent = make_luminous(primary_c["hex"], 0.72, 0.82)
    p_h, p_s, _ = hex_to_hsv(primary_accent)

    # Find secondary accent with distinct hue (diff in hue >= 0.15)
    secondary_accent = None
    for c in chroma[1:]:
        c_h, c_s, c_v = c["hsv"]
        hue_diff = abs(c_h - p_h)
        if hue_diff > 0.5:
            hue_diff = 1.0 - hue_diff
        if hue_diff >= 0.12 and c_s > 0.25:
            secondary_accent = make_luminous(c["hex"], 0.78, 0.80)
            break

    if not secondary_accent:
        # Synthesize complementary/harmonious accent (e.g. +60 deg or +180 deg)
        sec_h = (p_h + 0.5) % 1.0 if p_h < 0.2 else (p_h + 0.3) % 1.0
        secondary_accent = hsv_to_hex(sec_h, 0.88, 0.78)

    s_h, _, _ = hex_to_hsv(secondary_accent)

    # Atmospheric midtones from clusters
    midtones = [c for c in clusters if 0.20 <= c["hsv"][2] <= 0.65]
    if len(midtones) >= 2:
        mid_1 = midtones[0]["hex"]
        mid_2 = midtones[1]["hex"]
    elif len(midtones) == 1:
        mid_1 = midtones[0]["hex"]
        mid_2 = hsv_to_hex((p_h + 0.1) % 1.0, 0.45, 0.35)
    else:
        mid_1 = hsv_to_hex(p_h, 0.4, 0.3)
        mid_2 = hsv_to_hex(s_h, 0.4, 0.35)

    # Highlights
    highlight = hsv_to_hex((p_h + 0.05) % 1.0, 0.92, 0.88)
    text_tint = hsv_to_hex(p_h, 0.08, 0.98)

    # Assemble rich, multi-hued 8-color palette!
    # [bg_dark, sec_dark, mid_1, mid_2, primary_accent, secondary_accent, highlight, text_tint]
    palette = [
        base_dark,
        secondary_dark,
        mid_1,
        mid_2,
        primary_accent,
        secondary_accent,
        highlight,
        text_tint
    ]

    # Canister metallic gradient
    # Specular catchlight reflecting secondary and primary accents
    specular = hsv_to_hex((s_h + 0.05) % 1.0, 0.35, 0.92)
    canister_grad = f"linear-gradient(135deg, {base_dark} 0%, {secondary_dark} 16%, {specular} 28%, {primary_accent} 50%, {secondary_accent} 70%, {secondary_dark} 86%, {base_dark} 100%)"

    stamp_color = hsv_to_hex((p_h + 0.08) % 1.0, 0.95, 0.85)

    return {
        "colors": {
            "bg": base_dark,
            "surface": secondary_dark,
            "border": mid_1,
            "muted": mid_2,
            "accent": primary_accent,
            "text": text_tint,
            "shadow": "0 10px 25px rgba(0, 0, 0, 0.45)"
        },
        "palette": palette,
        "canister": {
            "gradient": canister_grad,
            "accent": primary_accent,
            "badgeBg": "rgba(12, 16, 24, 0.92)",
            "badgeColor": primary_accent,
            "typeColor": secondary_accent,
            "stampColor": stamp_color,
            "glow": f"rgba({int(primary_c['rgb'][0])}, {int(primary_c['rgb'][1])}, {int(primary_c['rgb'][2])}, 0.5)"
        }
    }

# Build themes dictionary
themes = {}
for i in range(1, 37):
    title, vibe = TITLES[i]
    date = DATES[i]
    color_info = extract_frame_colors(i)
    
    theme_entry = {
        "id": f"frame_{i:02d}",
        "name": title,
        "frameNumber": i,
        "image": f"images/exposures/frame-{i:02d}.jpg",
        "date": date,
        "vibe": vibe,
        "colors": color_info["colors"],
        "palette": color_info["palette"],
        "canister": color_info["canister"]
    }
    
    if i == 1:
        themes["default"] = theme_entry
    themes[f"frame_{i:02d}"] = theme_entry

site_config = {
    "title": "Japan Journey — 35mm Continuous Film Roll",
    "subtitle": "A visual journey across Japan in 36 exposures",
    "themes": themes
}

with open("config.js", "w") as f:
    f.write("export const siteConfig = ")
    json.dump(site_config, f, indent=2)
    f.write(";\n")

print("Generated config.js with 36 bespoke multi-color themes!")
