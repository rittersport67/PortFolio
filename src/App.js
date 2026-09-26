/**
 * @file src/App.js
 * Portfolio root: a single scrolling page navigated by anchors (#about, #skills…).
 * Renders Hero, Skills, Experience, Projects and Photography, then the DigitalSea
 * footer. Only `darkTheme` is applied.
 * @module App
 */
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './utils/themes';
import Navbar from './components/Navbar';
import Hero from './components/HeroSection';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Photography from './components/Photography';
import DigitalSea from './components/DigitalSea';
import VirtualizationIntro from './components/VirtualizationIntro';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

/**
 * Root component: provides the styled-components theme and mounts Navbar outside
 * `Body`, whose `overflow-x: hidden` would break the Navbar's `position: sticky`.
 * @component
 * @returns {JSX.Element}
 */
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <VirtualizationIntro />
      <Navbar />
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
