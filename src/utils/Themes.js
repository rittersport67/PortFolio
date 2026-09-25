/**
 * @file src/utils/Themes.js
 * Thèmes styled-components, lus via `${({ theme }) => theme.<clé>}`.
 * Seul `darkTheme` est branché dans App.js ; `lightTheme` n'a pas les clés
 * `card_light`, `white` et `black`.
 * @module Themes
 */

/** Thème actif du site (fond #1C1C27, accent teal #0DB6A4). */
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

/** Thème clair, non utilisé pour l'instant. */
export const lightTheme = {
  bg:"#FFFFFF",
  bgLight: "#f0f0f0",
  primary:"#be1adb",
  text_primary:"#111111",
  text_secondary:"#48494a",
  card:"#FFFFFF",
  button:"#5c5b5b",
}