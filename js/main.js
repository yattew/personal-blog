import { siteConfig } from "../config.js";

const FILM_STOCKS = {
  tokyo_neon_noir: "CINESTILL 800T",
  tokyo_neon_noir_amber: "KODAK PORTRA 800",
  tokyo_neon_noir_slate: "ILFORD HP5 PLUS",
  akihabara_electric_pop: "FUJIFILM VELVIA 50",
  tokyo_rain_melancholy: "CINESTILL 800T",
  shinkansen_countryside: "KODAK EKTAR 100",
  shinkansen_countryside_indigo: "FUJIFILM PROVIA 100F",
  sens_ji_historic_crimson: "KODAK PORTRA 400",
  kyoto_moss_bamboo: "FUJIFILM PROVIA 100F",
  midnight_ramen_izakaya: "CINESTILL 800T",
  sunlit_urban_afternoon: "KODAK PORTRA 160",
  sunlit_urban_afternoon_sand_slate: "KODAK TRI-X 400",
  default: "KODAK PORTRA 400"
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
      <span class="spool-lead-mark">◀ CINESTILL 800T // FILM SPOOL ──►</span>
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
      <!-- 3A. Landscape Leader View (Tongue curves rightwards) -->
      <div class="leader-horizontal-view">
        <div class="leader-taper-zone">
          <svg class="leader-taper-svg" viewBox="0 0 320 380" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,0 C 60,0 95,150 150,150 L 306,150 A 14,14 0 0 1 320,164 L 320,366 A 14,14 0 0 1 306,380 L 0,380 Z" fill="#050608"/>
            <g fill="#f59e0b" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="10" font-weight="800" letter-spacing="0.14em">
              <text x="50" y="240">◀ LOAD FILM ──►</text>
              <text x="50" y="270" font-size="8" fill="#c4bcb0" opacity="0.85">DO NOT EXPOSE BEYOND THIS LINE</text>
              <text x="50" y="305" font-size="9" fill="#f59e0b">35MM • CINESTILL 800T • EXP 13</text>
            </g>
            <line x1="80" y1="100" x2="80" y2="350" stroke="#f59e0b" stroke-dasharray="5,4" stroke-width="1.5" opacity="0.75"/>
            <text x="70" y="225" fill="#f59e0b" opacity="0.85" font-family="ui-monospace, monospace" font-size="8" font-weight="700" transform="rotate(-90, 70, 225)">LOAD TO LINE ▶</text>
          </svg>
        </div>
        <div class="continuous-sprocket-track bottom leader-bottom-track" aria-hidden="true">
          <div class="sprocket-perforations-continuous bottom"></div>
        </div>
      </div>

      <!-- 3B. Mobile Portrait Leader View (Tongue curves upwards away from bottom canister) -->
      <div class="leader-vertical-view">
        <div class="leader-vertical-zone">
          <svg class="leader-vertical-svg" viewBox="0 0 340 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,180 L 340,180 L 340,140 C 340,95 240,40 170,40 L 170,12 A 12,12 0 0 0 158,0 L 12,0 A 12,12 0 0 0 0,12 Z" fill="#050608"/>
            <g fill="#f59e0b" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9" font-weight="800" letter-spacing="0.14em">
              <text x="42" y="55">▲ LOAD FILM ▲</text>
              <text x="42" y="75" font-size="7.5" fill="#c4bcb0" opacity="0.85">DO NOT EXPOSE BEYOND LINE</text>
              <text x="42" y="98" font-size="8" fill="#f59e0b">35MM • CINESTILL 800T • EXP 13</text>
            </g>
            <line x1="42" y1="125" x2="310" y2="125" stroke="#f59e0b" stroke-dasharray="4,4" stroke-width="1.2" opacity="0.75"/>
            <text x="42" y="140" fill="#f59e0b" opacity="0.85" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">LOAD TO LINE ▶</text>
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
      // FRAME 01: Entire vertical leader tongue is fully inside the frame at top!
      targetY = 16;
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
}

/**
 * Configures winder buttons, keyboard arrows, wheel scroll, and touch swipe gestures
 */
function setupControls() {
  const prevBtn = document.getElementById("prev-scene-btn");
  const nextBtn = document.getElementById("next-scene-btn");

  if (prevBtn) prevBtn.addEventListener("click", () => advanceFrame(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => advanceFrame(1));

  // Keyboard navigation: Right/Down/Space advances, Left/Up rewinds
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      advanceFrame(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      advanceFrame(-1);
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
