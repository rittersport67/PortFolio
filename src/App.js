/**
 * @file src/App.js
 * Racine du portfolio : page unique en scroll, navigation par ancres (#about, #skills…).
 * Enchaîne Hero, le bloc PRO (Skills, Experience, Projects) et le bloc PERSO
 * (Photography), puis le footer DigitalSea. Seul `darkTheme` est appliqué.
 * @module App
 */
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './utils/Themes';
import Navbar from './components/Navbar';
import Hero from './components/HeroSection';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Photography from './components/Photography';
import DigitalSea from './components/DigitalSea';
import LyokoMapOverlay from './components/LyokoMapOverlay';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

/**
 * Composant racine : fournit le thème styled-components et monte les overlays
 * fixes (Navbar, LyokoMapOverlay) hors de `Body` pour qu'ils passent au-dessus
 * du `clip-path` du bloc PRO.
 * @component
 * @returns {JSX.Element}
 */
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
      <LyokoMapOverlay />
      <Body>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Photography />
        <DigitalSea />
      </Body>
    </ThemeProvider>
  );
}

export default App;
