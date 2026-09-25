/**
 * @file src/App.test.js
 * Smoke test: the full app renders and shows the name from `Bio`.
 */
import { render, screen } from '@testing-library/react';
import App from './App';
import { Bio } from './data/content';

test('renders the hero with the owner name', () => {
  render(<App />);
  expect(screen.getAllByText(Bio.name).length).toBeGreaterThan(0);
});
