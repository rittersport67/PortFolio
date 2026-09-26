/**
 * @file src/utils/fonts.js
 * Site-wide font stacks (everything outside the virtualization intro, whose fonts
 * live in `introFonts.js`). Use as `font-family: ${FONT_MONO};` in styled-components.
 * Poppins, Orbitron and Michroma are loaded from Google Fonts in `App.css`.
 * @module fonts
 */

/** Default text font, applied globally by `App.css` (which cannot import this file). */
export const FONT_BODY = "'Poppins', sans-serif";

/** Terminal-style labels, tags and data text. */
export const FONT_MONO = "'Courier New', monospace";

/** Display font for the hero name and call-to-action. */
export const FONT_DISPLAY = "'Orbitron', 'Courier New', monospace";

/** Wide squared face of the Lyoko window titles (Experience cards). */
export const FONT_WINDOW = "'Michroma', 'Orbitron', 'Courier New', monospace";
