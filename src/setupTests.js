/**
 * @file src/setupTests.js
 * Loaded by Jest before each suite: jest-dom matchers plus the jsdom polyfills
 * (matchMedia, IntersectionObserver, canvas) the components depend on.
 */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Components read their texts through react-i18next: initialize it as src/index.js does.
import './i18n';

// jsdom lacks these browser APIs used by the hero canvas, the timeline and the photo cards.
window.matchMedia = window.matchMedia || ((query) => ({
  matches: false,
  media: query,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
}));

window.IntersectionObserver = window.IntersectionObserver || class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

HTMLCanvasElement.prototype.getContext = () => null;
