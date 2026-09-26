/**
 * @file src/utils/introColors.js
 * Color constants of the virtualization intro (Jérémie's supercomputer console,
 * Superscan pop-up, hologram). Kept apart from the site colors in `colors.js`:
 * the intro recreates the show's teal/blue screens, not the site palette.
 * @module introColors
 */

export { alpha, WHITE, BLACK } from './colors';
export { CARTHAGE } from './palette';

/* ─── Backdrop (index.js) ────────────────────────────────────────── */
/** Supercomputer screen gradient, top → bottom. */
export const BACKDROP_TEAL = '#3e808c';
export const BACKDROP_TEAL_DARK = '#2b6571';
export const BACKDROP_PETROL = '#173f49';
export const BACKDROP_ABYSS = '#0a1f26';
export const BACKDROP_NEAR_BLACK = '#040b0e';
export const BACKDROP_BLACK = '#020406';
/** Light pillars, HUD text and phase buttons. */
export const PILLAR = '#5ad6e6';

/* ─── HUD and control bar (index.js) ─────────────────────────────── */
export const PHASE_ICON_BG = '#144650';
export const PHASE_ICON_BG_LIT = '#288ca0';
export const PHASE_ICON_TEXT_LIT = '#e8fdff';
export const PHASE_LABEL_TEXT = '#d8f8ff';
export const CONTROL_BLUE = '#1f8aa6';
export const CONTROL_BORDER = '#2aa3c2';
export const CONTROL_SHINE = '#a0e6f5';
export const CONTROL_KNOB = '#4fc0d8';
export const CONTROL_KNOB_BORDER = '#8adcee';
export const TRACK = '#1a7690';
export const TRACK_LINE = '#021e2d';
export const TRACK_FILL = '#bdf2ff';
export const CREDIT_TEXT = '#e6faff';
export const SKIP_HINT_TEXT = '#96beff';

/* ─── Console (ScanWindow.js) ────────────────────────────────────── */
export const CONSOLE_FRAME = '#5cc4e6';
export const CONSOLE_PANEL = '#0a2233';
export const CONSOLE_BLUE = '#1d6f95';
export const CONSOLE_BLUE_DARK = '#0e4566';
export const CONSOLE_TEXT = '#d8f6ff';
export const CONSOLE_HIGHLIGHT = '#e8fbff';
/** Lit module lights, gauges and the card ring. */
export const CONSOLE_LIGHT = '#7ff0ff';
export const CONSOLE_LIGHT_PALE = '#c8f8ff';
export const TAB_BG = '#2b86b0';
export const TAB_BG_ACTIVE = '#3fb4e0';
export const TAB_BG_SPACER = '#1f6f95';
export const TAB_BORDER = '#a0e6fa';
export const HISTOGRAM_BAR = '#c07ae0';
export const HISTOGRAM_BAR_LIGHT = '#f0d8ff';
export const EQ_BAR = '#8b5cc4';
export const EQ_BAR_LIGHT = '#d6b8ff';
export const VIEWPORT_BORDER = '#eefaff';
export const VIEWPORT_BG_CENTER = '#0f3d4d';
export const VIEWPORT_BG_EDGE = '#051620';

/* ─── Hologram (ScanWindow.js) ───────────────────────────────────── */
export const HOLO = '#5dff9a';
export const HOLO_DIFFUSE = '#28d870';
export const HOLO_DETAIL_DIFFUSE = '#3ee88a';
export const HOLO_SPECULAR = '#f0fff4';
export const HOLO_RING = '#eaffef';
export const HOLO_SCANLINE = '#d2ffe1';

/* ─── Superscan (SuperscanWindow.js) ─────────────────────────────── */
export const SUPERSCAN_BLUE = '#2b95c8';
export const SUPERSCAN_BLUE_DARK = '#145f8c';
export const SUPERSCAN_BORDER = '#6cc8ec';
export const SUPERSCAN_TEXT = '#eaf8ff';
export const SCREEN_BORDER = '#a0e1fa';
export const SCREEN_GRID = '#5ac8e6';
export const SCREEN_BG_CENTER = '#0f4a5c';
export const SCREEN_BG_EDGE = '#062530';
export const DATA_BLOCK = '#28c878';
export const BUTTON_BLUE = '#2f8fd0';
export const BUTTON_BLUE_DARK = '#1a5fa8';
export const ORB_LIGHT = '#9fe6ff';
export const ORB_GLOW = '#a0e6ff';
export const TIMER_TEXT = '#bfefff';
export const TIMER_BG = '#145096';
export const GAUGE_BORDER = '#d9a52c';
export const GAUGE_BG = '#281400';
export const GAUGE_STRIPE = '#5a280a';
export const GAUGE_FILL = '#b0501c';

/* ─── XANA tower (SuperscanWindow.js) ────────────────────────────── */
export const XANA_EYE = '#e8474c';
export const TOWER_RED_DARK = '#8a1414';
export const TOWER_RED = '#ff6a5c';
export const TOWER_RED_LIGHT = '#ffe0d6';
export const TOWER_SCANLINE = '#ffdcd2';
export const TOWER_OUTLINE = '#ffe1d7';
export const TOWER_EDGE = '#8a2a1c';
export const XANA_ROOT = '#3a0505';
export const XANA_ROOT_DARK = '#2a0303';
