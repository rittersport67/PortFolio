import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './utils/Themes';
import Navbar from './components/Navbar';
import Hero from './components/HeroSection';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Photography from './components/Photography';
import Skidbladnir from './components/Skidbladnir';
import DigitalSea from './components/DigitalSea';
import LyokoMapOverlay from './components/LyokoMapOverlay';
import { BrowserRouter as Router } from 'react-router-dom';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

const ProWrapper = styled.div`
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

const PersonalWrapper = styled.div`
  width: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Navbar />
        <LyokoMapOverlay />
        <Body>
          <Hero />
          <ProWrapper>
            <Skills />
            <Experience />
            <Projects />
            <Education />
          </ProWrapper>
          <PersonalWrapper>
            <Photography />
          </PersonalWrapper>
          <DigitalSea />
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
