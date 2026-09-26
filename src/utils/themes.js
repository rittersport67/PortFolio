/**
 * @file src/utils/themes.js
 * styled-components themes, read via `${({ theme }) => theme.<key>}`.
 * Only `darkTheme` is wired in App.js; `lightTheme` lacks the `card_light`,
 * `white` and `black` keys.
 * Dark theme values come from `colors.js`, so each color is defined once.
 * @module themes
 */
import {
  BG,
  BG_LIGHT,
  TEAL,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  CARD,
  CARD_LIGHT,
  VIOLET,
  WHITE,
  BLACK,
} from './colors';

/** Active site theme (dark navy background, teal accent). */
export const darkTheme = {
  bg: BG,
  bgLight: BG_LIGHT,
  primary: TEAL,
  text_primary: TEXT_PRIMARY,
  text_secondary: TEXT_SECONDARY,
  card: CARD,
  card_light: CARD_LIGHT,
  button: VIOLET,
  white: WHITE,
  black: BLACK,
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