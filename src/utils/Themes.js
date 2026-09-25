/**
 * @file src/utils/Themes.js
 * styled-components themes, read via `${({ theme }) => theme.<key>}`.
 * Only `darkTheme` is wired in App.js; `lightTheme` lacks the `card_light`,
 * `white` and `black` keys.
 * @module Themes
 */

/** Active site theme (#1C1C27 background, #0DB6A4 teal accent). */
export const darkTheme = {
  bg:"#1C1C27",
  bgLight: "#1C1E27",
  primary:"#0DB6A4",
  text_primary:"#F2F3F4",
  text_secondary:"#b1b2b3",
  card:"#171721",
  card_light: '#121212',
  button:"#854CE6",
  white:"#FFFFFF",
  black:"#000000",
}

/** Light theme, currently unused. */
export const lightTheme = {
  bg:"#FFFFFF",
  bgLight: "#f0f0f0",
  primary:"#be1adb",
  text_primary:"#111111",
  text_secondary:"#48494a",
  card:"#FFFFFF",
  button:"#5c5b5b",
}