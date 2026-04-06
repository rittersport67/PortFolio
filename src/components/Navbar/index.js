import React, { Suspense } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import { darkTheme } from '../../utils/Themes';
import { Bio } from '../../data/contants';
import lyokoSymbol from '../../../src/img/lyoko-symbol.png';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link as LinkR } from 'react-router-dom';

const UlrichEasterEgg = React.lazy(() => import('./UlrichEasterEgg'));

/* curseur clignotant style Word */
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

/* barre de chargement qui défile sur la droite */
const dataScroll = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
`;

/* ─── barre principale ─────────────────────────────────────────── */
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

  /* fond avec grille subtile style terminal */
  background:
    linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px),
    rgba(0, 8, 24, 0.97);
  background-size: 24px 24px, 24px 24px, 100% 100%;
  backdrop-filter: blur(10px);

  border-bottom: 2px solid rgba(0, 212, 255, 0.45);
  box-shadow: 0 2px 24px rgba(0, 212, 255, 0.12), 0 0 2px rgba(0, 212, 255, 0.2);

  @media screen and (max-width: 960px) {
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

/* ─── logo ─────────────────────────────────────────────────────── */
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

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 14px;
  background: #00d4ff;
  margin-left: 2px;
  vertical-align: middle;
  animation: ${blink} 1.1s step-end infinite;
`;

const LyokoSymbol = styled.img`
  height: 32px;
  width: auto;
  transition: filter 0.3s ease;
  ${LogoArea}:hover & {
    filter: invert(62%) sepia(80%) saturate(400%) hue-rotate(130deg) brightness(1.3);
  }
`;

/* ─── liens de navigation — style onglets HUD ──────────────────── */
const NavItems = styled.ul`
  display: flex;
  align-items: stretch;
  padding: 0;
  margin: 0;
  list-style: none;

  @media screen and (max-width: 768px) {
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

  /* trait actif en bas */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #00d4ff;
    box-shadow: 0 0 8px #00d4ff;
    transition: width 0.25s ease;
  }

  &:hover {
    color: #00d4ff;
    background: rgba(0, 212, 255, 0.07);
  }
  &:hover::after {
    width: 100%;
  }
`;

/* ─── bouton GitHub — chip HUD ─────────────────────────────────── */
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

/* barre de statut animée (3 segments) */
const StatusGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow: hidden;
`;

const StatusSegment = styled.div`
  position: relative;
  width: 60px;
  height: 3px;
  background: rgba(0, 212, 255, 0.12);
  border-radius: 1px;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 40%;
    height: 100%;
    background: #00d4ff;
    opacity: ${({ opacity }) => opacity || 0.8};
    animation: ${dataScroll} ${({ dur }) => dur || '3s'} linear infinite;
    animation-delay: ${({ delay }) => delay || '0s'};
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
  color: #00d4ff;
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

/* ─── mobile ────────────────────────────────────────────────────── */
const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 16px;
    font-size: 1.3rem;
    cursor: pointer;
    color: rgba(0, 212, 255, 0.8);
    border-left: 1px solid rgba(0, 212, 255, 0.2);
    z-index: 200;
    grid-column: 3;
  }
`;

const DrawerOverlay = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
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
  @media screen and (max-width: 768px) {
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
  &::before {
    content: '▸ ';
    opacity: 0.45;
  }
  &:hover {
    background: rgba(0, 212, 255, 0.07);
    color: #00d4ff;
  }
`;

/* inutilisé mais gardé pour compatibilité router-dom */
const MobileMenuLinkR = styled(LinkR)`display: none;`;

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [ulrichVisible, setUlrichVisible] = React.useState(false);


  return (
    <Nav>
      <NavContainer>
        <ThemeProvider theme={darkTheme}>
          <LogoArea
            onMouseEnter={() => setUlrichVisible(true)}
            onMouseLeave={() => setUlrichVisible(false)}
          >
            <LyokoSymbol src={lyokoSymbol} alt="Code Lyoko" />
            <LogoText>{Bio.surname}<Cursor /></LogoText>
          </LogoArea>

          <NavItems>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#photography">Photography</NavLink>
          </NavItems>

          <ButtonContainer>
            <StatusGroup>
              <StatusSegment dur="2.8s" delay="0s"   opacity={0.9} />
              <StatusSegment dur="4.1s" delay="0.6s" opacity={0.6} />
              <StatusSegment dur="3.4s" delay="1.2s" opacity={0.4} />
            </StatusGroup>
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
        </ThemeProvider>
      </NavContainer>

      <DrawerOverlay open={open} onClick={() => setOpen(false)} />
      <MobileMenu open={open}>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerClose onClick={() => setOpen(false)}><FaTimes /></DrawerClose>
        </DrawerHeader>
        <MobileMenuItems>
          <MobileMenuLink href="#about"       onClick={() => setOpen(false)}>About</MobileMenuLink>
          <MobileMenuLink href="#skills"      onClick={() => setOpen(false)}>Skills</MobileMenuLink>
          <MobileMenuLink href="#experience"  onClick={() => setOpen(false)}>Experience</MobileMenuLink>
          <MobileMenuLink href="#projects"    onClick={() => setOpen(false)}>Projects</MobileMenuLink>
          <MobileMenuLink href="#photography" onClick={() => setOpen(false)}>Photography</MobileMenuLink>
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
        <UlrichEasterEgg visible={ulrichVisible} />
      </Suspense>
    </Nav>
  );
};

export default Navbar;
