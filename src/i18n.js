/**
 * @file src/i18n.js
 * i18next setup: English and French resources bundled from `src/locales/<lang>/`,
 * in two namespaces — `ui` (interface labels) and `content` (portfolio texts keyed
 * by the `key` fields of content.js). The language is detected from the visitor's
 * previous choice (localStorage), then the browser, and falls back to English.
 * The VirtualizationIntro easter egg is not translated and stays in English.
 * @module i18n
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enUi from './locales/en/ui.json';
import enContent from './locales/en/content.json';
import frUi from './locales/fr/ui.json';
import frContent from './locales/fr/content.json';

/** Languages offered by the navbar switch, in display order. */
export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' }
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { ui: enUi, content: enContent },
      fr: { ui: frUi, content: frContent }
    },
    ns: ['ui', 'content'],
    defaultNS: 'ui',
    fallbackLng: 'en',
    supportedLngs: LANGUAGES.map((language) => language.code),
    // 'fr-FR' → 'fr'
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'portfolio-lang',
      caches: ['localStorage']
    },
    // React already escapes rendered strings.
    interpolation: { escapeValue: false }
  });

/* Keeps <html lang> in sync for screen readers, hyphenation and search engines. */
const syncHtmlLang = (lng) => {
  document.documentElement.lang = lng;
};
syncHtmlLang(i18n.resolvedLanguage || 'en');
i18n.on('languageChanged', () => syncHtmlLang(i18n.resolvedLanguage));

export default i18n;
