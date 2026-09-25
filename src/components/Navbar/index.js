/**
 * @file src/components/Navbar/index.js
 * Barre de navigation sticky : logo, ancres vers les sections, liens GitHub / LinkedIn.
 * Sous 1100px, un bouton hamburger ouvre un menu latéral.
 * Porte aussi les easter eggs Ulrich / XANA au survol du logo.
 * @component
 */
import React, { Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { Bio } from '../../data/content';
import lyokoSymbol from '../../img/lyoko-symbol.png';
import UlrichImg from '../../img/ulrich.png';
import UlrichXanaImg from '../../img/ulrich-xana.png';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { CARTHAGE } from '../../utils/palette';

const UlrichEasterEgg = React.lazy(() => import('./UlrichEasterEgg'));

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

const Nav = styled.div`
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  /* nécessaire pour que MobileMenu position:absolute se cale dessus */
  isolation: isolate;

  background:
    linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px),
    rgba(0, 8, 24, 0.97);
  background-size: 24px 24px, 24px 24px, 100% 100%;
  backdrop-filter: blur(10px);

  border-bottom: 2px solid rgba(0, 212, 255, 0.45);

  @media screen and (max-width: 768px) {
    transition: 0.8s all ease;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  z-index: 1;
  width: 100%;
  padding: 0 0 0 12px;
  max-width: 1200px;

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 56px 1fr 56px;
    align-items: center;
    padding: 0;
  }
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0 16px 0 4px;
  border-right: 1px solid rgba(0, 212, 255, 0.2);
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    grid-column: 2;
    justify-content: center;
    border-right: none;
    padding: 0;
  }
`;

const LogoText = styled.span`
  font-family: 'Courier New', monospace;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(0, 212, 255, 0.85);
  white-space: nowrap;
`;

// data-allow-motion: keeps blinking under prefers-reduced-motion (see App.css).
const Cursor = styled.span.attrs({ 'data-allow-motion': true })`
  display: inline-block;
  width: 2px;
  height: 14px;
  background: ${CARTHAGE};
  margin-left: 2px;
  vertical-align: middle;
  animation: ${blink} 1.1s step-end infinite;
`;

const LyokoSymbol = styled.img`
  height: 32px;
  width: auto;
  cursor: pointer;
  transition: filter 0.3s ease;
  &:hover {
    filter: invert(15%) sepia(90%) saturate(700%) hue-rotate(340deg) brightness(1.2);
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: stretch;
  padding: 0;
  margin: 0;
  list-style: none;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const NavLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0, 212, 255, 0.65);
  text-decoration: none;
  cursor: pointer;
  border-right: 1px solid rgba(0, 212, 255, 0.15);
  transition: color 0.2s ease, background 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${CARTHAGE};
    transition: width 0.25s ease;
  }

  &:hover {
    color: ${CARTHAGE};
    background: rgba(0, 212, 255, 0.07);
  }
  &:hover::after {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-left: 1px solid rgba(0, 212, 255, 0.2);
  gap: 12px;
  flex-shrink: 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GitHubButton = styled.a`
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 14px;
  font-family: 'Courier New', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${CARTHAGE};
  text-decoration: none;
  border: 1px solid rgba(0, 212, 255, 0.45);
  border-radius: 2px;
  background: rgba(0, 212, 255, 0.05);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
  &:hover {
    background: rgba(0, 212, 255, 0.15);
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.35);
    color: #fff;
  }
`;

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 1100px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 16px;
    font-size: 1.3rem;
    cursor: pointer;
    color: rgba(0, 212, 255, 0.8);
    border-left: 1px solid rgba(0, 212, 255, 0.2);
    z-index: 200;
  }
  @media screen and (max-width: 768px) {
    grid-column: 3;
  }
`;

const DrawerOverlay = styled.div`
  display: none;
  @media screen and (max-width: 1100px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(2px);
    z-index: 98;
    opacity: ${({ open }) => (open ? 1 : 0)};
    pointer-events: ${({ open }) => (open ? 'all' : 'none')};
    transition: opacity 0.3s ease;
  }
`;

const MobileMenu = styled.div`
  display: none;
  @media screen and (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 75vw;
    max-width: 300px;
    background:
      linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px),
      rgba(0, 4, 16, 0.99);
    background-size: 24px 24px, 24px 24px, 100% 100%;
    border-left: 2px solid rgba(0, 212, 255, 0.4);
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.6);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    pointer-events: ${({ open }) => (open ? 'all' : 'none')};
    z-index: 99;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 56px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
  flex-shrink: 0;
`;

const DrawerTitle = styled.span`
  font-family: 'Courier New', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0, 212, 255, 0.5);
`;

const DrawerClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(0, 212, 255, 0.8);
  font-size: 1.1rem;
  padding: 4px;
  transition: color 0.2s ease;
  &:hover { color: #fff; }
`;

const MobileMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const MobileMenuLink = styled.a`
  display: block;
  width: 100%;
  padding: 14px 24px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0, 212, 255, 0.7);
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 212, 255, 0.1);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  &:hover {
    background: rgba(0, 212, 255, 0.07);
    color: ${CARTHAGE};
  }
`;

/**
 * Survoler le symbole Lyoko fait apparaître Ulrich-XANA (lueur rouge), survoler le
 * pseudo fait apparaître Ulrich (lueur teal). Le menu mobile se ferme au clic sur un
 * lien ou sur le fond, et automatiquement quand la fenêtre dépasse 1100px.
 * @component
 * @returns {JSX.Element}
 */
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [ulrichVisible, setUlrichVisible] = React.useState(false);
  const [xanaVisible, setXanaVisible] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Nav>
      <NavContainer>
        <LogoArea>
          <LyokoSymbol
            src={lyokoSymbol}
            alt="Code Lyoko"
            onMouseEnter={() => setXanaVisible(true)}
            onMouseLeave={() => setXanaVisible(false)}
          />
          <LogoText
            onMouseEnter={() => setUlrichVisible(true)}
            onMouseLeave={() => setUlrichVisible(false)}
          >{Bio.surname}<Cursor /></LogoText>
        </LogoArea>

        <NavItems>
          <NavLink href="#about">Carthage</NavLink>
          <NavLink href="#skills">Abilities</NavLink>
          <NavLink href="#experience">Missions</NavLink>
          <NavLink href="#projects">Programs</NavLink>
          <NavLink href="#photography">Superscan</NavLink>
        </NavItems>

        <ButtonContainer>
          <GitHubButton
            href={Bio.github}
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub style={{ marginRight: 6, fontSize: 13 }} />
            Github
          </GitHubButton>
          <GitHubButton
            href={Bio.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin style={{ marginRight: 6, fontSize: 13 }} />
            LinkedIn
          </GitHubButton>
        </ButtonContainer>

        <MobileIcon onClick={() => setOpen(!open)}>
          <FaBars />
        </MobileIcon>
      </NavContainer>

      <DrawerOverlay open={open} onClick={() => setOpen(false)} />
      <MobileMenu open={open}>
        <DrawerHeader>
          <DrawerTitle>Supercomputer</DrawerTitle>
          <DrawerClose onClick={() => setOpen(false)}><FaTimes /></DrawerClose>
        </DrawerHeader>
        <MobileMenuItems>
          <MobileMenuLink href="#about"       onClick={() => setOpen(false)}>Carthage</MobileMenuLink>
          <MobileMenuLink href="#skills"      onClick={() => setOpen(false)}>Abilities</MobileMenuLink>
          <MobileMenuLink href="#experience"  onClick={() => setOpen(false)}>Missions</MobileMenuLink>
          <MobileMenuLink href="#projects"    onClick={() => setOpen(false)}>Programs</MobileMenuLink>
          <MobileMenuLink href="#photography" onClick={() => setOpen(false)}>Superscan</MobileMenuLink>
          <MobileMenuLink
            as="a"
            href={Bio.github}
            target="_blank"
            rel="noreferrer"
          >
            Github
          </MobileMenuLink>
          <MobileMenuLink
            as="a"
            href={Bio.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{ borderBottom: 'none' }}
          >
            LinkedIn
          </MobileMenuLink>
        </MobileMenuItems>
      </MobileMenu>

      <Suspense fallback={null}>
        <UlrichEasterEgg visible={ulrichVisible} src={UlrichImg} glowColor="#0DB6A4" />
        <UlrichEasterEgg visible={xanaVisible} src={UlrichXanaImg} glowColor="#cc1111" />
      </Suspense>
    </Nav>
  );
};

export default Navbar;
