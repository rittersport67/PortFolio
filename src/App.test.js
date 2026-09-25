/**
 * @file src/App.test.js
 * Test de fumée : l'application complète se rend et affiche le nom de `Bio`.
 */
import { render, screen } from '@testing-library/react';
import App from './App';
import { Bio } from './data/content';

test('renders the hero with the owner name', () => {
  render(<App />);
  expect(screen.getAllByText(Bio.name).length).toBeGreaterThan(0);
});
