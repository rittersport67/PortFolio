/**
 * @file src/utils/colors.js
 * Site-wide color constants (everything outside the virtualization intro, whose
 * colors live in `introColors.js`) and helpers to derive translucent variants.
 * Territory accents stay in `palette.js`; `themes.js` is built from these values.
 * @module colors
 */

/**
 * Splits a `#rgb` / `#rrggbb` hex color into its `r, g, b` channels.
 * @param {string} hex - Hex color, e.g. `'#00d4ff'`.
 * @returns {string} Channels as `'0, 212, 255'`, usable inside `rgba(…)`.
 */
export const rgbChannels = (hex) => {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? value.replace(/./g, '$&$&') : value;
  const int = parseInt(full, 16);
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
};

/**
 * Translucent variant of a hex color.
 * @param {string} hex - Hex color, e.g. `'#00d4ff'`.
 * @param {number|string} opacity - Alpha between 0 and 1.
 * @returns {string} `rgba(r, g, b, opacity)`.
 */
export const alpha = (hex, opacity) => `rgba(${rgbChannels(hex)}, ${opacity})`;

/* ─── Neutrals ───────────────────────────────────────────────────── */
export const WHITE = '#ffffff';
export const BLACK = '#000000';

/* ─── Theme base ─────────────────────────────────────────────────── */
export const BG = '#1C1C27';
export const BG_LIGHT = '#1C1E27';
export const TEAL = '#0DB6A4';
export const TEXT_PRIMARY = '#F2F3F4';
export const TEXT_SECONDARY = '#b1b2b3';
export const CARD = '#171721';
export const CARD_LIGHT = '#121212';
export const VIOLET = '#854CE6';

/* ─── Deep navy backgrounds (darkest → lightest) ─────────────────── */
/** Hero background and data-rain trail. */
export const NAVY_HERO = '#000814';
/** Experience timeline dots. */
export const NAVY_PANEL = '#000818';
/** Digital Sea footer. */
export const SEA_BG = '#020810';

/* ─── Digital Sea / Carthage blues ───────────────────────────────── */
export const SEA_BLUE = '#0a4aff';
export const SEA_WAVE = '#0096ff';
export const SEA_FOAM = '#00c8ff';
export const SEA_TEXT = '#64a0ff';
export const SEA_TEXT_MUTED = '#96beff';
/** Deep blue halo behind the hero. */
export const HERO_HALO = '#001aff';
/** Hero call-to-action text and hover background. */
export const CTA_TEXT = '#001018';
export const CTA_HOVER = '#6eb5ff';

/* ─── Territory tints (accents themselves are in palette.js) ─────── */
export const MOUNTAIN_DEEP = '#7b4ea8';
export const DESERT_SHADOW = '#321400';
export const DESERT_PANEL = '#140800';
export const DESERT_HANDLE = '#120600';
export const DESERT_BADGE = '#0e0400';

/* ─── Lyoko window (Skills, Experience and Projects cards) ───────── */
/** Title bar, status bar and outer frame. */
export const WINDOW_BAR = '#5a88a4';
export const WINDOW_BAR_LIGHT = '#86b0c8';
export const WINDOW_BAR_DARK = '#3c6379';
/** Dark pills in the title bar and status bar glyphs. */
export const WINDOW_PILL = '#1b303c';
export const WINDOW_PILL_TEXT = '#b4ccd8';
/** Content panel. */
export const WINDOW_PANEL = '#284e62';
export const WINDOW_PANEL_BORDER = '#6e9bb4';
/** Scrollbar-style gauge track. */
export const WINDOW_TRACK = '#23475a';
export const WINDOW_TRACK_EDGE = '#16303d';
export const WINDOW_TEXT = '#e4eef1';
export const WINDOW_TEXT_SOFT = '#a9bcc4';
export const WINDOW_TEXT_FAINT = '#7c929a';
export const WINDOW_HEADING = '#dfe9ec';

/* ─── Language switch flags (official flag colors) ───────────────── */
export const FLAG_FR_BLUE = '#002395';
export const FLAG_FR_RED = '#ed2939';
export const FLAG_UK_BLUE = '#012169';
export const FLAG_UK_RED = '#c8102e';
