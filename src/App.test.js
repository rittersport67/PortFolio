/**
 * @file src/App.test.js
 * Smoke tests: the full app renders the name from `Bio`, and the navbar language
 * switch translates the page.
 */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import i18n from './i18n';
import { Bio } from './data/content';
import en from './locales/en/ui.json';
import fr from './locales/fr/ui.json';

afterEach(() => act(() => i18n.changeLanguage('en')));

test('renders the hero with the owner name', () => {
  render(<App />);
  expect(screen.getAllByText(Bio.name).length).toBeGreaterThan(0);
});

test('switches the portfolio to French', async () => {
  render(<App />);
  expect(screen.getAllByText(en.hero.cta).length).toBeGreaterThan(0);

  userEvent.click(screen.getAllByRole('button', { name: 'Français' })[0]);

  expect((await screen.findAllByText(fr.hero.cta)).length).toBeGreaterThan(0);
  expect(screen.queryByText(en.hero.cta)).not.toBeInTheDocument();
  expect(document.documentElement.lang).toBe('fr');
});

test('every English key has a French translation', () => {
  const keys = (object, prefix = '') =>
    Object.entries(object).flatMap(([key, value]) =>
      typeof value === 'object' && !Array.isArray(value)
        ? keys(value, `${prefix}${key}.`)
        : [`${prefix}${key}`]
    );
  ['ui', 'content'].forEach((ns) => {
    const enKeys = keys(require(`./locales/en/${ns}.json`)).sort();
    const frKeys = keys(require(`./locales/fr/${ns}.json`)).sort();
    expect(frKeys).toEqual(enKeys);
  });
});
