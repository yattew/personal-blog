import { siteConfig } from "../config.js";

const FILM_STOCKS = {
  tokyo_neon_noir: "DYNA-STILL 400",
  tokyo_neon_noir_amber: "DYNA-STILL 400",
  tokyo_neon_noir_slate: "DYNA-STILL 400",
  akihabara_electric_pop: "DYNA-STILL 400",
  tokyo_rain_melancholy: "DYNA-STILL 400",
  shinkansen_countryside: "DYNA-STILL 400",
  shinkansen_countryside_indigo: "DYNA-STILL 400",
  sens_ji_historic_crimson: "DYNA-STILL 400",
  kyoto_moss_bamboo: "DYNA-STILL 400",
  midnight_ramen_izakaya: "DYNA-STILL 400",
  sunlit_urban_afternoon: "DYNA-STILL 400",
  sunlit_urban_afternoon_sand_slate: "DYNA-STILL 400",
  default: "DYNA-STILL 400"
};

/**
 * Photorealistic 3D Metal Canister Theme Configurations
 * Driven dynamically by current exposure theming with mechanical unwind animation delay.
 */
const CANISTER_THEMES = {
  default: {
    brandFont: "'Playfair Display', serif",
    speedType: "DAYLIGHT",
    spec1: "35mm COLOR NEGATIVE",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #1f1914 0%, #3b2e23 18%, #694f38 34%, #9e6c43 50%, #523b28 68%, #261c14 85%, #140e0a 100%)",
    accent: "#b85420",
    badgeBg: "#1e1712",
    badgeColor: "#f59e0b",
    typeColor: "#e2c9a5",
    stampColor: "#fef08a",
    glow: "rgba(184, 84, 32, 0.35)"
  },
  tokyo_neon_noir: {
    brandFont: "'Orbitron', sans-serif",
    speedType: "TUNGSTEN // NEON",
    spec1: "35mm CHROMA EMULSION",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #090c17 0%, #131e42 18%, #1f3b96 36%, #8b2c5c 52%, #1b1c36 70%, #0a0a14 88%, #05060a 100%)",
    accent: "#38bdf8",
    badgeBg: "#0c1024",
    badgeColor: "#38bdf8",
    typeColor: "#f43f5e",
    stampColor: "#67e8f9",
    glow: "rgba(56, 189, 248, 0.38)"
  },
  akihabara_electric_pop: {
    brandFont: "'Syne', sans-serif",
    speedType: "VIVID // ELECTRIC",
    spec1: "35mm HIGH SATURATION",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #1c0e06 0%, #4a220b 18%, #914414 36%, #d97724 50%, #73310a 68%, #2e1203 86%, #140801 100%)",
    accent: "#f97316",
    badgeBg: "#1a0c04",
    badgeColor: "#fb923c",
    typeColor: "#fde047",
    stampColor: "#fed7aa",
    glow: "rgba(249, 115, 22, 0.4)"
  },
  tokyo_neon_noir_amber: {
    brandFont: "'Space Grotesk', sans-serif",
    speedType: "AMBER // WARM TONE",
    spec1: "35mm COLOR NEGATIVE",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #170f07 0%, #3d2411 18%, #78451e 36%, #c68c57 52%, #573012 70%, #241407 88%, #0f0803 100%)",
    accent: "#c68c57",
    badgeBg: "#1f1308",
    badgeColor: "#fbbf24",
    typeColor: "#fde68a",
    stampColor: "#fde047",
    glow: "rgba(198, 140, 87, 0.35)"
  },
  tokyo_neon_noir_slate: {
    brandFont: "'JetBrains Mono', monospace",
    speedType: "SLATE // HI-CONTRAST",
    spec1: "35mm MONOCHROME / SLATE",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #090c12 0%, #151e2d 18%, #28446b 36%, #4f78a8 50%, #213145 68%, #0f1520 86%, #06080d 100%)",
    accent: "#60a5fa",
    badgeBg: "#0b111a",
    badgeColor: "#60a5fa",
    typeColor: "#93c5fd",
    stampColor: "#bfdbfe",
    glow: "rgba(96, 165, 250, 0.35)"
  },
  shinkansen_countryside: {
    brandFont: "'Space Grotesk', sans-serif",
    speedType: "HIGH SPEED // TRANSIT",
    spec1: "35mm ULTRA FINE GRAIN",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #081021 0%, #11254a 18%, #1a4282 36%, #cd8931 52%, #1b3561 70%, #0d1729 88%, #050a12 100%)",
    accent: "#38bdf8",
    badgeBg: "#091629",
    badgeColor: "#38bdf8",
    typeColor: "#fbbf24",
    stampColor: "#fef08a",
    glow: "rgba(205, 137, 49, 0.35)"
  },
  tokyo_rain_melancholy: {
    brandFont: "'Playfair Display', serif",
    speedType: "MIST // COOL TONE",
    spec1: "35mm ATMOSPHERIC CHROMA",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #140912 0%, #2e1428 18%, #57254b 36%, #a33e38 52%, #38152c 70%, #1a0814 88%, #0c0409 100%)",
    accent: "#f472b6",
    badgeBg: "#1c0d19",
    badgeColor: "#f472b6",
    typeColor: "#fda4af",
    stampColor: "#fbcfe8",
    glow: "rgba(244, 114, 182, 0.35)"
  },
  sunlit_urban_afternoon: {
    brandFont: "'Playfair Display', serif",
    speedType: "FINE GRAIN // SUNLIT",
    spec1: "35mm GOLDEN EMULSION",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #1a1006 0%, #3d230d 18%, #784318 36%, #bf7c37 52%, #522d0d 70%, #241305 88%, #0f0702 100%)",
    accent: "#f59e0b",
    badgeBg: "#1c1106",
    badgeColor: "#f59e0b",
    typeColor: "#fcd34d",
    stampColor: "#fef3c7",
    glow: "rgba(245, 158, 11, 0.35)"
  },
  midnight_ramen_izakaya: {
    brandFont: "'Orbitron', sans-serif",
    speedType: "MIDNIGHT // VAPOR",
    spec1: "35mm LOW-LIGHT EMULSION",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #040c17 0%, #0a1f3d 18%, #133e75 36%, #b57c3e 52%, #132b4d 70%, #081324 88%, #03070d 100%)",
    accent: "#38bdf8",
    badgeBg: "#071526",
    badgeColor: "#38bdf8",
    typeColor: "#fb923c",
    stampColor: "#fed7aa",
    glow: "rgba(56, 189, 248, 0.38)"
  },
  shinkansen_countryside_indigo: {
    brandFont: "'Syne', sans-serif",
    speedType: "TWILIGHT // INDIGO",
    spec1: "35mm DEEP EMULSION",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #030d17 0%, #07223b 18%, #0b4978 36%, #4d8fb8 50%, #0c3352 68%, #061929 86%, #020a12 100%)",
    accent: "#38bdf8",
    badgeBg: "#051829",
    badgeColor: "#38bdf8",
    typeColor: "#7dd3fc",
    stampColor: "#bae6fd",
    glow: "rgba(56, 189, 248, 0.35)"
  },
  sens_ji_historic_crimson: {
    brandFont: "'Cinzel', serif",
    speedType: "VERMILION // HISTORIC",
    spec1: "35mm COLOR REVERSAL",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #240504 0%, #520f0c 18%, #8f1f18 36%, #d4472c 50%, #61110c 68%, #2e0605 86%, #140202 100%)",
    accent: "#ef4444",
    badgeBg: "#240706",
    badgeColor: "#ef4444",
    typeColor: "#fca5a5",
    stampColor: "#fef08a",
    glow: "rgba(239, 68, 68, 0.4)"
  },
  kyoto_moss_bamboo: {
    brandFont: "'Cinzel', serif",
    speedType: "BAMBOO // ZEN GARDEN",
    spec1: "35mm NATURAL CHROMA",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #091209 0%, #152917 18%, #264a2b 36%, #52804f 50%, #203d23 68%, #102111 86%, #060c06 100%)",
    accent: "#4ade80",
    badgeBg: "#0c1c0e",
    badgeColor: "#4ade80",
    typeColor: "#86efac",
    stampColor: "#bbf7d0",
    glow: "rgba(74, 222, 128, 0.35)"
  },
  sunlit_urban_afternoon_sand_slate: {
    brandFont: "'Space Grotesk', sans-serif",
    speedType: "ARCHIVAL // DUOTONE",
    spec1: "35mm ARCHIVAL FINE GRAIN",
    spec2: "ISO 400/27° • 13 EXP",
    gradient: "linear-gradient(135deg, #111317 0%, #242933 18%, #414a5c 36%, #8696ab 50%, #303745 68%, #1a1e26 86%, #0b0d10 100%)",
    accent: "#94a3b8",
    badgeBg: "#161a22",
    badgeColor: "#cbd5e1",
    typeColor: "#94a3b8",
    stampColor: "#f1f5f9",
    glow: "rgba(148, 163, 184, 0.35)"
  }
};

const DATE_STAMPS = [
  "OCT 20 '26 • 09:15 JST",
  "OCT 24 '26 • 23:42 JST",
  "OCT 25 '26 • 19:10 JST",
  "OCT 26 '26 • 22:15 JST",
  "OCT 26 '26 • 23:58 JST",
  "OCT 27 '26 • 16:30 JST",
  "OCT 28 '26 • 11:20 JST",
  "OCT 28 '26 • 18:45 JST",
  "OCT 29 '26 • 14:10 JST",
  "OCT 30 '26 • 08:30 JST",
  "OCT 30 '26 • 01:15 JST",
  "OCT 31 '26 • 15:40 JST",
  "NOV 01 '26 • 13:25 JST"
];

const THEME_COORDINATES = {
  default: "35°41'22\"N • 139°41'30\"E // Base Emulsion",
  tokyo_neon_noir: "35°41'38\"N • 139°42'12\"E // Shinjuku Nightfall",
  akihabara_electric_pop: "35°41'54\"N • 139°46'19\"E // Electric Town",
  tokyo_neon_noir_amber: "35°41'42\"N • 139°42'05\"E // Golden Gai Alleys",
  tokyo_neon_noir_slate: "35°41'30\"N • 139°42'00\"E // Omoide Yokocho",
  tokyo_rain_melancholy: "35°39'31\"N • 139°42'04\"E // Shibuya Crossing Rain",
  shinkansen_countryside: "35°15'00\"N • 139°00'00\"E // Tokaido Line Westbound",
  shinkansen_countryside_indigo: "35°00'42\"N • 135°46'06\"E // Twilight Transit",
  sens_ji_historic_crimson: "35°42'52\"N • 139°47'48\"E // Asakusa Temple",
  kyoto_moss_bamboo: "35°01'00\"N • 135°40'21\"E // Sagano Bamboo Path",
  midnight_ramen_izakaya: "35°41'45\"N • 139°42'15\"E // Kabukicho Midnight",
  sunlit_urban_afternoon: "35°39'50\"N • 139°42'30\"E // Harajuku Alleyways",
  sunlit_urban_afternoon_sand_slate: "35°40'55\"N • 139°45'40\"E // Ginza Concrete"
};

let currentThemeIndex = 0;
let themeKeys = [];
let toastTimeout = null;
let activeAmbientLayer = "a"; // 'a' or 'b'

export function isPortraitMode() {
  return window.matchMedia("(orientation: portrait)").matches;
}

/**
 * Generates an organic ambient gradient mesh from an 8-color theme palette
 * NO horizontal black bands. Continuous ambient glow across entire viewport.
 */
function buildThemeGradient(palette, accent) {
  const p0 = palette[0] || "#090a0d";
  const p1 = palette[1] || p0;
  const p2 = palette[2] || accent;
  const p3 = palette[3] || accent;
  const p4 = palette[4] || accent;
  const p5 = palette[5] || accent;
  const p6 = palette[6] || accent;
  const p7 = palette[7] || accent;

  return `
    radial-gradient(ellipse 80% 55% at 20% 12%, ${p4}cc 0%, transparent 68%),
    radial-gradient(ellipse 80% 55% at 80% 12%, ${p5}cc 0%, transparent 68%),
    radial-gradient(ellipse 70% 55% at 50% 50%, ${p3}88 0%, transparent 65%),
    radial-gradient(ellipse 80% 55% at 15% 88%, ${p2}cc 0%, transparent 68%),
    radial-gradient(ellipse 80% 55% at 85% 88%, ${p6}cc 0%, transparent 68%),
    radial-gradient(ellipse 90% 65% at 50% 92%, ${p7}aa 0%, transparent 72%),
    linear-gradient(145deg, ${p0} 0%, ${p1} 100%)
  `;
}

/**
 * Initializes authentic, visible 35mm silver-halide film grain
 */
function initFilmGrain() {
  const canvas = document.getElementById("grain-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const tile = document.createElement("canvas");
  tile.width = 256;
  tile.height = 256;
  const tCtx = tile.getContext("2d");
  const imgData = tCtx.createImageData(256, 256);
  const d = imgData.data;

  // Rich, visible analog silver-halide crystals
  for (let i = 0; i < d.length; i += 4) {
    const r = Math.random();
    if (r < 0.28) {
      const val = Math.floor(Math.random() * 25);
      d[i] = val; d[i+1] = val; d[i+2] = val;
      d[i+3] = Math.floor(Math.random() * 85) + 35;
    } else if (r > 0.72) {
      const val = 225 + Math.floor(Math.random() * 30);
      d[i] = val; d[i+1] = val; d[i+2] = val;
      d[i+3] = Math.floor(Math.random() * 85) + 35;
    } else {
      d[i+3] = 0;
    }
  }
  tCtx.putImageData(imgData, 0, 0);

  function resizeAndDraw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pattern = ctx.createPattern(tile, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  resizeAndDraw();
  window.addEventListener("resize", resizeAndDraw, { passive: true });
}

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

/**
 * Builds the one continuous unbroken 35mm film roll ribbon
 * - Canister is permanently anchored on the far left of the film gate
 * - Film strip unrolls from left to right (Frame 13 deepest in canister -> Frame 01)
 * - Tapered 35mm leader tongue is on the far right (after Frame 01)
 * - Leader is only visible on Frame 01 and moves out of the screen on Frame 02
 */
function renderContinuousFilmRibbon() {
  const exposuresTrack = document.getElementById("film-exposures-track");
  const topCodesTrack = document.getElementById("top-sprocket-codes");
  const bottomCodesTrack = document.getElementById("bottom-sprocket-codes");
  const ribbon = document.getElementById("film-roll-ribbon");
  const leaderUnit = document.getElementById("film-leader-unit");
  const canisterUnit = document.getElementById("film-canister-unit");
  if (!exposuresTrack || !topCodesTrack || !bottomCodesTrack || !ribbon) return;

  exposuresTrack.innerHTML = "";
  topCodesTrack.innerHTML = "";
  bottomCodesTrack.innerHTML = "";
  themeKeys = Object.keys(siteConfig.themes);

  // 1. Canister Click Navigation (Fixed on Far Left)
  if (canisterUnit) {
    canisterUnit.onclick = () => {
      triggerHaptic(12);
      if (currentThemeIndex === themeKeys.length - 1) {
        showToast("Rewinding roll back to Frame 01...");
        applyTheme(themeKeys[0]);
      } else {
        advanceFrame(1);
      }
    };
  }

  // 2. Render 13 Consecutive Middle Exposure Frames
  // Prepend Film Spool Lead (tucked deep into the canister on the far left of Frame 13)
  const spoolLead = document.createElement("div");
  spoolLead.className = "film-canister-spool-lead";
  spoolLead.innerHTML = `
    <div class="spool-lead-inner">
      <span class="spool-lead-mark">◀ DYNA-STILL 400 // FILM SPOOL ──►</span>
      <span class="spool-lead-sub">DO NOT DETACH FROM SPOOL CORE</span>
    </div>
  `;
  exposuresTrack.appendChild(spoolLead);

  // Frames run from Frame 13 (leftmost, deepest in canister) down to Frame 01 (rightmost, at leader)
  const reversedKeys = [...themeKeys].reverse();

  reversedKeys.forEach((key, rIdx) => {
    const originalIdx = themeKeys.indexOf(key);
    const theme = siteConfig.themes[key];
    const frameNumber = originalIdx + 1;
    const framePadded = String(frameNumber).padStart(2, "0");
    const stockName = FILM_STOCKS[key] || "KODAK PORTRA 400";
    const dateStr = DATE_STAMPS[originalIdx % DATE_STAMPS.length];
    const coordsStr = THEME_COORDINATES[key] || "35°41'22\"N • 139°41'30\"E";

    const palette = theme.palette || [
      theme.colors.bg,
      theme.colors.surface,
      theme.colors.border,
      theme.colors.muted,
      theme.colors.accent,
      theme.colors.text
    ];

    // Middle Exposure Slide
    const slide = document.createElement("div");
    slide.className = "film-frame-exposure" + (originalIdx === 0 ? " active-frame" : "");
    slide.dataset.theme = key;
    slide.dataset.index = originalIdx;

    const swatchesHtml = palette.map((hex, sIdx) => `
      <div class="swatch-chip" 
           style="background-color: ${hex};" 
           data-hex="${hex}" 
           title="Tone 0${sIdx + 1}: ${hex} (Click to copy)" 
           role="button" 
           aria-label="Copy color ${hex}">
      </div>
    `).join("");

    // Frame's own aperture background
    const p4 = palette[4] || theme.colors.accent;
    const p5 = palette[5] || theme.colors.accent;

    slide.innerHTML = `
      <div class="slide-exposure-inner" style="background: radial-gradient(at 15% 25%, ${p4}40 0px, transparent 65%), radial-gradient(at 85% 75%, ${p5}38 0px, transparent 65%), linear-gradient(180deg, #0b0c10 0%, #101218 50%, #0b0c10 100%);">
        <div class="exposure-content-wrap">
          <header class="exposure-header">
            <div class="exposure-meta-row">
              <span class="film-stamp-badge">
                <span class="stamp-icon">🎞️</span>
                <span class="stamp-text">EXP ${framePadded} // 35MM</span>
              </span>
              <span class="date-stamp">${dateStr}</span>
              <span class="exposure-coords">${coordsStr}</span>
            </div>
            <h1 class="theme-title">${theme.name}</h1>
          </header>

          <blockquote class="theme-poetry">
            "${theme.poetry || "Atmospheric tones captured across the journey."}"
          </blockquote>

          <div class="emulsion-swatch-row">
            <div class="swatch-meta">
              <span class="swatch-label">Emulsion Palette (8 Tones)</span>
              <span class="photo-count">${theme.name} Emulsion</span>
            </div>
            <div class="swatches-strip" role="list">
              ${swatchesHtml}
            </div>
          </div>
        </div>
      </div>
    `;

    // Click on a peaking frame -> immediately roll to it!
    slide.addEventListener("click", () => {
      if (originalIdx !== currentThemeIndex) {
        triggerHaptic(10);
        applyTheme(key);
      }
    });

    // Click-to-copy color chip
    slide.querySelectorAll(".swatch-chip").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        e.stopPropagation();
        const hex = chip.dataset.hex;
        triggerHaptic(12);
        navigator.clipboard.writeText(hex);
        showToast(`Copied ${hex}`);
      });
    });

    exposuresTrack.appendChild(slide);

    // Top Sprocket Meta Code
    const topMeta = document.createElement("div");
    topMeta.className = "frame-sprocket-meta";
    topMeta.dataset.index = originalIdx;
    topMeta.innerHTML = `
      <span class="edge-code">SAFETY FILM • ${stockName}</span>
      <span class="dx-barcode">|| | | ||| | || |||</span>
      <span class="frame-tag">▶ ${framePadded}A</span>
    `;
    topCodesTrack.appendChild(topMeta);

    // Bottom Sprocket Meta Code
    const bottomMeta = document.createElement("div");
    bottomMeta.className = "frame-sprocket-meta";
    bottomMeta.dataset.index = originalIdx;
    bottomMeta.innerHTML = `
      <span class="edge-code">PORTRA EMULSION • TOKYO</span>
      <span class="frame-tag-bottom">${framePadded}</span>
      <span class="dx-barcode">| ||| || | | ||||</span>
    `;
    bottomCodesTrack.appendChild(bottomMeta);
  });

  // 3. Render Classic 35mm Tapered Film Leader Tongue
  // Supports both Landscape (horizontal tongue on far right) and Mobile Portrait (vertical tongue on top)
  if (leaderUnit) {
    leaderUnit.innerHTML = `
      <!-- 3A. Landscape Leader View (Elongated authentic 35mm tongue unrolling to the right) -->
      <div class="leader-horizontal-view">
        <div class="leader-taper-zone">
          <svg class="leader-taper-svg" viewBox="0 0 460 380" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Solid celluloid body of the leader -->
            <path d="M 0,0 L 30,0 C 65,0 95,130 130,130 L 444,130 A 16,16 0 0 1 460,146 L 460,380 L 0,380 Z" fill="#050608"/>
            <!-- 1px acetate cut edge specular highlight (seamless match with top border) -->
            <path d="M 0,0.5 L 30,0.5 C 65,0.5 95,130.5 130,130.5 L 444,130.5 A 15.5,15.5 0 0 1 459.5,146 L 459.5,380" fill="none" stroke="rgba(255, 255, 255, 0.14)" stroke-width="1"/>
            
            <!-- Orange Load Line and Label (Cleanly separated, zero collisions) -->
            <line x1="155" y1="135" x2="155" y2="375" stroke="#f59e0b" stroke-dasharray="5,4" stroke-width="1.5" opacity="0.8"/>
            <text x="145" y="240" fill="#f59e0b" opacity="0.9" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" transform="rotate(-90, 145, 240)">LOAD TO LINE ▶</text>

            <!-- Technical factory stamps cleanly on the tongue to the right of the line -->
            <g fill="#f59e0b" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-weight="800" letter-spacing="0.14em">
              <text x="195" y="225" font-size="11">◀ LOAD FILM ──►</text>
              <text x="195" y="255" font-size="9" fill="#c4bcb0" opacity="0.85">DO NOT EXPOSE BEYOND THIS LINE</text>
              <text x="195" y="290" font-size="10" fill="#f59e0b">35MM • DYNA-STILL 400 • EXP 13</text>
            </g>
          </svg>
        </div>
        <div class="continuous-sprocket-track bottom leader-bottom-track" aria-hidden="true">
          <div class="sprocket-perforations-continuous bottom"></div>
        </div>
      </div>

      <!-- 3B. Mobile Portrait Leader View (Authentic 35mm tongue unrolling upwards) -->
      <div class="leader-vertical-view">
        <div class="leader-vertical-zone">
          <svg class="leader-vertical-svg" viewBox="0 0 340 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Solid celluloid body of the vertical leader (starts at x=38 so left track is 100% transparent cutout!) -->
            <path d="M 38,222 L 340,222 L 340,195 C 340,165 188,160 188,135 L 188,14 A 14,14 0 0 0 174,0 L 38,0 Z" fill="#050608"/>
            <!-- 1px acetate cut edge specular highlight (seamless match with Frame 01 right border and left track) -->
            <path d="M 38,0.5 L 174,0.5 A 13.5,13.5 0 0 1 187.5,14 L 187.5,135 C 187.5,160 339.5,165 339.5,195 L 339.5,222" fill="none" stroke="rgba(255, 255, 255, 0.14)" stroke-width="1"/>
            
            <!-- Technical factory stamps on vertical leader tongue (spaced down the narrow tongue) -->
            <g fill="#f59e0b" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-weight="800" letter-spacing="0.1em">
              <text x="50" y="38" font-size="8.8">▲ LOAD FILM ▲</text>
              <text x="50" y="55" font-size="7.2" fill="#c4bcb0" opacity="0.85">DO NOT EXPOSE</text>
              <text x="50" y="67" font-size="7.2" fill="#c4bcb0" opacity="0.85">BEYOND LINE</text>
              <text x="50" y="85" font-size="7.5" fill="#f59e0b">DYNA-STILL 400</text>
              <text x="50" y="97" font-size="7" fill="#f59e0b" opacity="0.9">35MM // 13 EXP</text>
            </g>
            <line x1="48" y1="112" x2="182" y2="112" stroke="#f59e0b" stroke-dasharray="4,4" stroke-width="1.2" opacity="0.75"/>
            <text x="50" y="125" fill="#f59e0b" opacity="0.85" font-family="ui-monospace, monospace" font-size="7.8" font-weight="700">LOAD TO LINE ▶</text>
          </svg>
        </div>
        <div class="continuous-sprocket-track top leader-vertical-left-track" aria-hidden="true">
          <div class="sprocket-perforations-continuous top"></div>
        </div>
      </div>
    `;
    leaderUnit.onclick = () => {
      triggerHaptic(10);
      showToast("Pulling film out of canister...");
      advanceFrame(1);
    };
  }

  // Calculate layout geometry
  positionSprocketCodes();
}

/**
 * Helper to compute an element's offsetTop relative to a container without transform interference
 */
function getOffsetTopInContainer(el, container) {
  let top = 0;
  let curr = el;
  while (curr && curr !== container) {
    top += curr.offsetTop;
    curr = curr.offsetParent;
  }
  return top;
}

/**
 * Positions top and bottom sprocket margin codes above each frame column
 */
function positionSprocketCodes() {
  const isPortrait = isPortraitMode();
  const slides = document.querySelectorAll(".film-frame-exposure");
  const mainStrip = document.getElementById("film-main-strip");
  const ribbon = document.getElementById("film-roll-ribbon");
  const leaderUnit = document.getElementById("film-leader-unit");

  if (isPortrait) {
    if (mainStrip) mainStrip.style.width = "";
    if (ribbon) {
      ribbon.style.width = "";
      ribbon.style.left = "50%";
    }
    return;
  }

  // Landscape horizontal layout calculation
  slides.forEach((slide) => {
    const origIdx = parseInt(slide.dataset.index, 10);
    const left = slide.offsetLeft;
    const width = slide.offsetWidth;

    // Match top and bottom meta elements by dataset.index
    const topMeta = document.querySelector(`#top-sprocket-codes .frame-sprocket-meta[data-index="${origIdx}"]`);
    const bottomMeta = document.querySelector(`#bottom-sprocket-codes .frame-sprocket-meta[data-index="${origIdx}"]`);

    if (topMeta) {
      topMeta.style.left = `${left}px`;
      topMeta.style.width = `${width}px`;
    }
    if (bottomMeta) {
      bottomMeta.style.left = `${left}px`;
      bottomMeta.style.width = `${width}px`;
    }
  });

  // Update total strip width to fit all frames exactly
  if (slides.length > 0) {
    const lastSlide = slides[slides.length - 1];
    const totalStripWidth = lastSlide.offsetLeft + lastSlide.offsetWidth;
    if (mainStrip) mainStrip.style.width = `${totalStripWidth}px`;
    
    const leaderWidth = leaderUnit ? leaderUnit.offsetWidth : 0;
    if (ribbon) {
      ribbon.style.width = `${totalStripWidth + leaderWidth}px`;
      ribbon.style.left = "0";
    }
  }
}

/**
 * Calculates position so the active frame is displayed with authentic mechanical camera physics:
 * - In LANDSCAPE:
 *   - FRAME 01: ENTIRE leading edge tongue is 100% in-frame on the right.
 *   - FRAME 13 (LAST FRAME): Spool lead connects cleanly into canister mouth.
 *   - INTERMEDIATE FRAMES: Centered in stage between canister and right screen edge.
 * - In PORTRAIT / VERTICAL DISPLAYS:
 *   - CANISTER: Anchored across the bottom of the screen.
 *   - FRAME 01: Leader tongue 100% in-frame pointing upwards at the top.
 *   - FRAME 02+: Pulled upwards out of bottom canister, centered above canister.
 *   - FRAME 13: Spool lead extends directly down into bottom canister snout.
 * - STRICT NO WRAP-AROUND.
 */
function updateFilmPosition() {
  const activeSlide = document.querySelector(`.film-frame-exposure[data-index="${currentThemeIndex}"]`);
  const slides = document.querySelectorAll(".film-frame-exposure");
  const ribbon = document.getElementById("film-roll-ribbon");
  const gate = document.getElementById("film-gate");
  const canister = document.getElementById("film-canister-unit");
  const leaderUnit = document.getElementById("film-leader-unit");
  if (!activeSlide || !slides.length || !ribbon || !gate) return;

  const isPortrait = isPortraitMode();

  if (isPortrait) {
    const gateHeight = gate.offsetHeight || window.innerHeight;
    const canisterHeight = canister ? canister.offsetHeight : 110;
    const stageHeight = gateHeight - canisterHeight;
    const stageCenterY = stageHeight / 2;

    let targetY = 0;

    if (currentThemeIndex === 0) {
      // FRAME 01: Ensure Frame 01's entire aperture card (title, poetry, all 8 swatches)
      // sits 100% visible in the stage safely above the bottom canister!
      const frame01Height = activeSlide.offsetHeight;
      const leaderHeight = leaderUnit ? leaderUnit.offsetHeight : 200;
      const totalBlockHeight = frame01Height + leaderHeight;

      // Position Frame 01's bottom edge safely above the canister:
      const idealTargetY = (stageHeight - 14) - totalBlockHeight;
      if (totalBlockHeight < stageHeight - 20) {
        targetY = Math.max(10, Math.round((stageHeight - totalBlockHeight) / 2));
      } else {
        targetY = idealTargetY;
      }
    } else {
      // ALL OTHER FRAMES: Active frame centered in visible stage above bottom canister!
      const slideTopInRibbon = getOffsetTopInContainer(activeSlide, ribbon);
      const slideCenter = slideTopInRibbon + (activeSlide.offsetHeight / 2);
      targetY = stageCenterY - slideCenter;
    }

    ribbon.style.transform = `translate(-50%, ${targetY}px)`;
  } else {
    // Landscape logic
    const gateWidth = gate.offsetWidth || window.innerWidth;
    const canisterWidth = canister ? canister.offsetWidth : 190;
    const stageWidth = gateWidth - canisterWidth;
    const stageCenter = canisterWidth + (stageWidth / 2);

    let targetX = 0;

    if (currentThemeIndex === 0) {
      // FRAME 01: Entire leading edge tongue must be fully inside the frame on the right!
      const ribbonWidth = ribbon.offsetWidth;
      const idealX = gateWidth - 28 - ribbonWidth;
      // Prevent Frame 01 from slipping behind the left canister on smaller mobile landscape screens:
      const minTargetX = canisterWidth + 14 - activeSlide.offsetLeft;
      targetX = Math.max(idealX, minTargetX);
    } else {
      // ALL OTHER FRAMES (including Frame 13): Dead-centered in the visible stage!
      const slideWidth = activeSlide.offsetWidth;
      const slideCenter = activeSlide.offsetLeft + (slideWidth / 2);
      targetX = stageCenter - slideCenter;
    }

    ribbon.style.transform = `translateX(${targetX}px)`;
  }

  slides.forEach((s) => {
    const origIdx = parseInt(s.dataset.index, 10);
    const isActive = origIdx === currentThemeIndex;
    s.classList.toggle("active-frame", isActive);
    s.setAttribute("aria-hidden", isActive ? "false" : "true");
  });

  // Sync external winder buttons disabled state (Strict No Wrap-Around)
  const prevBtn = document.getElementById("prev-scene-btn");
  const nextBtn = document.getElementById("next-scene-btn");
  if (prevBtn) {
    prevBtn.disabled = (currentThemeIndex === 0);
    prevBtn.classList.toggle("disabled", currentThemeIndex === 0);
  }
  if (nextBtn) {
    nextBtn.disabled = (currentThemeIndex === themeKeys.length - 1);
    nextBtn.classList.toggle("disabled", currentThemeIndex === themeKeys.length - 1);
  }
}

/**
 * Transitions ambient background colors smoothly using dual-layer crossfading
 */
function transitionAmbientColors(theme) {
  const layerA = document.getElementById("ambient-layer-a");
  const layerB = document.getElementById("ambient-layer-b");
  if (!layerA || !layerB) return;

  const palette = theme.palette || [
    theme.colors.bg,
    theme.colors.surface,
    theme.colors.border,
    theme.colors.muted,
    theme.colors.accent,
    theme.colors.text
  ];
  const accent = theme.colors.accent || "#e07a38";

  const newGradient = buildThemeGradient(palette, accent);

  // Crossfade between Layer A and Layer B
  if (activeAmbientLayer === "a") {
    layerB.style.background = newGradient;
    layerB.classList.add("active");
    layerA.classList.remove("active");
    activeAmbientLayer = "b";
  } else {
    layerA.style.background = newGradient;
    layerA.classList.add("active");
    layerB.classList.remove("active");
    activeAmbientLayer = "a";
  }
}

/**
 * Advances or rewinds the continuous physical film roll
 * STRICT NO WRAP-AROUND: At Frame 13, user must rewind back.
 */
function advanceFrame(direction = 1) {
  triggerHaptic(8);
  const newIdx = currentThemeIndex + direction;

  if (newIdx < 0) {
    showToast("Frame 01 • Start of roll");
    return; // NO WRAP AROUND
  }
  if (newIdx >= themeKeys.length) {
    showToast("End of roll • Use Rewind to return");
    return; // NO WRAP AROUND
  }

  applyTheme(themeKeys[newIdx]);
}

/**
 * Applies the active theme and rolls the film to the selected frame
 */
function applyTheme(themeKey, isInitial = false) {
  const theme = siteConfig.themes[themeKey] || siteConfig.themes.default;
  const root = document.documentElement;

  currentThemeIndex = themeKeys.indexOf(themeKey);
  if (currentThemeIndex === -1) currentThemeIndex = 0;

  const frameNumber = currentThemeIndex + 1;
  const framePadded = String(frameNumber).padStart(2, "0");
  const totalFrames = String(themeKeys.length).padStart(2, "0");
  const stockName = FILM_STOCKS[themeKey] || "KODAK PORTRA 400";

  // 1. Physically roll the unbroken ribbon so active frame is centered with 20% peaking left & right
  updateFilmPosition();

  // 2. Liquid, ultra-smooth ambient background color transition (dual-layer crossfade)
  if (isInitial) {
    const layerA = document.getElementById("ambient-layer-a");
    if (layerA) {
      layerA.style.background = buildThemeGradient(theme.palette, theme.colors.accent);
      layerA.classList.add("active");
    }
  } else {
    transitionAmbientColors(theme);
  }

  // 3. Update CSS custom properties
  root.style.setProperty("--accent", theme.colors.accent || "#e07a38");

  // 4. Mobile status bar theme color
  const metaTheme = document.getElementById("meta-theme-color");
  if (metaTheme && theme.colors.bg) {
    metaTheme.setAttribute("content", theme.colors.bg);
  }

  // 5. Update External Physical Frame Counter
  const currentFrameEl = document.getElementById("current-frame-num");
  if (currentFrameEl) currentFrameEl.textContent = `EXP ${framePadded}`;

  const totalFramesEl = document.getElementById("total-frames-num");
  if (totalFramesEl) totalFramesEl.textContent = totalFrames;

  const stockTagEl = document.getElementById("current-stock-tag");
  if (stockTagEl) stockTagEl.textContent = `${stockName} // ${theme.name}`;

  // 6. Dynamically theme the 35mm metal canister with liquid crossfade & physical unwind delay
  updateCanisterTheme(themeKey, isInitial);
}

let canisterThemeTimer = null;
let activeCanisterLayer = "a";

/**
 * Dynamically themes the photorealistic 3D metal film canister
 * Includes a physical latency delay (~280ms) to allow the film to roll out before morphing colors
 */
function updateCanisterTheme(themeKey, isInitial = false) {
  if (canisterThemeTimer) {
    clearTimeout(canisterThemeTimer);
    canisterThemeTimer = null;
  }

  const applyCanisterUpdates = () => {
    const meta = CANISTER_THEMES[themeKey] || CANISTER_THEMES.default;
    const theme = siteConfig.themes[themeKey] || siteConfig.themes.default;
    const originalIdx = themeKeys.indexOf(themeKey);
    const framePadded = String((originalIdx >= 0 ? originalIdx : 0) + 1).padStart(2, "0");

    // 1. Dual-layer crossfade for the anodized gradient
    const layerA = document.getElementById("canister-bg-a");
    const layerB = document.getElementById("canister-bg-b");
    if (layerA && layerB) {
      const incomingLayer = activeCanisterLayer === "a" ? layerB : layerA;
      const outgoingLayer = activeCanisterLayer === "a" ? layerA : layerB;
      
      incomingLayer.style.background = meta.gradient;
      incomingLayer.classList.add("active");
      outgoingLayer.classList.remove("active");
      activeCanisterLayer = activeCanisterLayer === "a" ? "b" : "a";
    }

    // 2. Update CSS Variables on canister unit
    const canisterUnit = document.getElementById("film-canister-unit");
    if (canisterUnit) {
      canisterUnit.style.setProperty("--canister-brand-font", meta.brandFont);
      canisterUnit.style.setProperty("--canister-accent", meta.accent);
      canisterUnit.style.setProperty("--canister-badge-bg", meta.badgeBg);
      canisterUnit.style.setProperty("--canister-badge-border", `color-mix(in srgb, ${meta.accent} 40%, rgba(255, 255, 255, 0.2))`);
      canisterUnit.style.setProperty("--canister-badge-color", meta.badgeColor);
      canisterUnit.style.setProperty("--canister-type-color", meta.typeColor);
      canisterUnit.style.setProperty("--canister-subbrand-color", meta.typeColor);
      canisterUnit.style.setProperty("--canister-stamp-color", meta.stampColor);
      canisterUnit.style.setProperty("--canister-glow", meta.glow);
    }

    // 3. Update badges, stamps and specs
    const speedIso = document.getElementById("canister-speed-iso");
    if (speedIso) speedIso.textContent = "400";

    const speedType = document.getElementById("canister-speed-type");
    if (speedType) speedType.textContent = meta.speedType;

    const spec1 = document.getElementById("canister-spec-1");
    if (spec1) spec1.textContent = meta.spec1;

    const spec2 = document.getElementById("canister-spec-2");
    if (spec2) spec2.textContent = meta.spec2;

    const spec3 = document.getElementById("canister-spec-3");
    if (spec3) spec3.textContent = `PROCESS DS-41 // ${theme.name.toUpperCase()}`;

    const stamp = document.getElementById("canister-emulsion-stamp");
    if (stamp) stamp.textContent = `EMUL DS400-${framePadded} // ${theme.name.toUpperCase()}`;
  };

  if (isInitial) {
    const layerA = document.getElementById("canister-bg-a");
    const meta = CANISTER_THEMES[themeKey] || CANISTER_THEMES.default;
    if (layerA) {
      layerA.style.background = meta.gradient;
      layerA.classList.add("active");
    }
    applyCanisterUpdates();
  } else {
    // Mechanical delay: film ribbon begins advancing across gate first (~280ms), then canister morphs!
    canisterThemeTimer = setTimeout(applyCanisterUpdates, 280);
  }
}

/**
 * Configures winder buttons, keyboard arrows, wheel scroll, and touch swipe gestures
 */
function setupControls() {
  const prevBtn = document.getElementById("prev-scene-btn");
  const nextBtn = document.getElementById("next-scene-btn");

  if (prevBtn) prevBtn.addEventListener("click", () => advanceFrame(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => advanceFrame(1));

  // Keyboard navigation:
  // Desktop Landscape: ArrowLeft advances (pulling film to the right), ArrowRight rewinds
  // Portrait: ArrowDown advances, ArrowUp rewinds
  window.addEventListener("keydown", (e) => {
    const isPortrait = isPortraitMode();
    if (isPortrait) {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        advanceFrame(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        advanceFrame(-1);
      }
    } else {
      // Desktop Landscape: reversed arrow keys per user request
      if (e.key === "ArrowLeft" || e.key === " ") {
        e.preventDefault();
        advanceFrame(1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        advanceFrame(-1);
      }
    }
  });

  // Touch swipe gesture on the film gate
  const gate = document.getElementById("film-gate");
  if (gate) {
    let touchStartX = 0;
    let touchStartY = 0;

    gate.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    gate.addEventListener("touchend", (e) => {
      if (e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        const isPortrait = isPortraitMode();

        if (isPortrait) {
          // In mobile portrait:
          // Thumb moves bottom to top (deltaY < 0): pulls film up out of canister -> advances frame!
          // Thumb moves top to bottom (deltaY > 0): winds film down into canister -> rewinds frame!
          if (Math.abs(deltaY) > 28 && Math.abs(deltaY) > Math.abs(deltaX) * 0.7) {
            if (deltaY < 0) {
              advanceFrame(1);
            } else {
              advanceFrame(-1);
            }
          }
        } else {
          // In landscape mode:
          // Swiping left to right (deltaX > 0) pulls film out of the canister -> ADVANCES frame!
          // Swiping right to left (deltaX < 0) winds film back into the canister -> REWINDS frame!
          if (Math.abs(deltaX) > 28 && Math.abs(deltaX) > Math.abs(deltaY) * 0.7) {
            if (deltaX > 0) {
              advanceFrame(1);
            } else {
              advanceFrame(-1);
            }
          }
        }
      }
    }, { passive: true });

    // Wheel event for trackpads & mouse wheel scrolling:
    let wheelCooldown = false;
    window.addEventListener("wheel", (e) => {
      if (wheelCooldown) return;
      if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
        wheelCooldown = true;
        setTimeout(() => { wheelCooldown = false; }, 360);
        const isPortrait = isPortraitMode();
        if (isPortrait) {
          // Scrolling down (deltaY > 0) pulls film up out of canister -> advances!
          if (e.deltaY > 0) {
            advanceFrame(1);
          } else if (e.deltaY < 0) {
            advanceFrame(-1);
          }
        } else {
          // In landscape: scrolling down/right advances, scrolling up/left rewinds
          if (e.deltaY > 0 || e.deltaX > 0) {
            advanceFrame(1);
          } else if (e.deltaY < 0 || e.deltaX < 0) {
            advanceFrame(-1);
          }
        }
      }
    }, { passive: true });
  }

  // Recalculate layout on window resize & orientation change
  window.addEventListener("resize", () => {
    positionSprocketCodes();
    updateFilmPosition();
  }, { passive: true });

  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      positionSprocketCodes();
      updateFilmPosition();
    }, 120);
  }, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initFilmGrain();
  renderContinuousFilmRibbon();
  setupControls();
  applyTheme(themeKeys[0] || "default", true);
  console.log(`${siteConfig.title} liquid color transition film ribbon loaded.`);
});
