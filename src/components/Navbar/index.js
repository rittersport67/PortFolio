/**
 * @file src/components/Navbar/index.js
 * Sticky navigation bar drawn as a Lyoko window title bar: handle pill, section
 * tabs (the tab of the section in view is lit), GitHub / LinkedIn pills.
 * Below 1100px a pill button opens the menu in a "Supercomputer" Lyoko window.
 * The EN | FR language switch sits beside the links, or at the bottom of the drawer.
 * @component
 */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Bio } from '../../data/content';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import LyokoWindow, { WindowPill } from '../Cards/LyokoWindow';
import LanguageSwitch from '../LanguageSwitch';
import { CARTHAGE } from '../../utils/palette';
import {
  alpha,
  BLACK,
  WHITE,
  WINDOW_BAR,
  WINDOW_BAR_LIGHT,
  WINDOW_BAR_DARK,
  WINDOW_PILL,
  WINDOW_PILL_TEXT,
  WINDOW_PANEL_BORDER,
  WINDOW_TEXT
} from '../../utils/colors';
import { FONT_MONO } from '../../utils/fonts';
import useCurrentSection from '../../utils/useCurrentSection';

/* Section anchors, in page order; labels are `nav.sections.<id>` in ui.json. */
const SECTION_IDS = ['about', 'skills', 'experience', 'projects', 'photography'];

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${WINDOW_BAR};
  border-top: 1px solid ${WINDOW_BAR_LIGHT};
  border-bottom: 3px solid ${WINDOW_PILL};
`;

/* Three columns so the tabs stay centered whatever the side widths */
const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  height: 52px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;

  @media screen and (max-width: 1100px) {
    grid-template-columns: 44px 1fr 44px;
  }
`;

const Handle = styled(WindowPill)`
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 12px;
  font-size: 16px;
  letter-spacing: 0.06em;
  color: ${WINDOW_TEXT};
  border-radius: 8px;

  @media screen and (max-width: 1100px) {
    grid-column: 2;
    justify-self: center;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 3px 10px;
  }
`;

// data-allow-motion: keeps blinking under prefers-reduced-motion (see App.css).
const Cursor = styled.span.attrs({ 'data-allow-motion': true })`
  display: inline-block;
  width: 2px;
  height: 14px;
  background: ${CARTHAGE};
  animation: ${blink} 1.1s step-end infinite;
`;

const Tabs = styled(WindowPill).attrs({ as: 'ul' })`
  display: flex;
  gap: 3px;
  padding: 3px;
  margin: 0;
  list-style: none;
  border-radius: 8px;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const Tab = styled.a`
  display: block;
  padding: 4px 14px;
  font-family: ${FONT_MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${WINDOW_PILL_TEXT};
  border-radius: 6px;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: ${WHITE};
    background: ${alpha(WINDOW_BAR, 0.35)};
  }

  &[aria-current='true'] {
    color: ${WHITE};
    background: ${WINDOW_BAR_DARK};
  }
`;

const Links = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 8px;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const LinkPill = styled(WindowPill).attrs({ as: 'a' })`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 12px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 8px;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    color: ${WHITE};
    border-color: ${CARTHAGE};
    box-shadow: 0 0 10px ${alpha(CARTHAGE, 0.3)};
  }
`;

const MenuButton = styled(WindowPill).attrs({ as: 'button', type: 'button' })`
  display: none;

  @media screen and (max-width: 1100px) {
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
    display: flex;
    align-items: center;
    padding: 6px 10px;
    font-size: 14px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 98;
  background: ${alpha(BLACK, 0.55)};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
  transition: opacity 0.3s ease;
`;

const Drawer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 99;
  width: min(300px, calc(100vw - 20px));
  transform: ${({ $open }) =>
    $open ? 'none' : 'translateX(calc(100% + 20px))'};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition:
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    visibility 0.35s;
`;

const CloseButton = styled(WindowPill).attrs({ as: 'button', type: 'button' })`
  display: flex;
  align-items: center;
  padding: 3px 8px;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${WHITE};
  }
`;

const DrawerLink = styled.a`
  display: block;
  padding: 12px 18px;
  font-family: ${FONT_MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${WINDOW_TEXT};
  border-bottom: 1px solid ${alpha(WINDOW_PANEL_BORDER, 0.25)};
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }
  &:hover,
  &[aria-current='true'] {
    background: ${alpha(BLACK, 0.15)};
  }
`;

const DrawerLanguage = styled.div`
  display: flex;
  justify-content: center;
  padding: 14px 18px;
`;

/* Cancels the window panel padding (see LyokoWindow Content) so links span its full width */
const DrawerLinks = styled.div`
  margin: -18px -18px -20px;
  @media only screen and (max-width: 768px) {
    margin: -14px -12px -16px;
  }
`;

/**
 * The drawer closes on a link, close button or backdrop click, and automatically once
 * the window grows past 1100px.
 * @component
 * @returns {JSX.Element}
 */
const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const current = useCurrentSection(SECTION_IDS);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const close = () => setOpen(false);

  return (
    <Nav aria-label={t('nav.ariaLabel')}>
      <NavContainer>
        <Handle>
          {Bio.surname}
          <Cursor />
        </Handle>

        <Tabs>
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <Tab
                href={`#${id}`}
                aria-current={current === id ? 'true' : undefined}
              >
                {t(`nav.sections.${id}`)}
              </Tab>
            </li>
          ))}
        </Tabs>

        <Links>
          <LanguageSwitch />
          <LinkPill href={Bio.github} target="_blank" rel="noreferrer">
            <FaGithub aria-hidden="true" />
            Github
          </LinkPill>
          <LinkPill href={Bio.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedin aria-hidden="true" />
            LinkedIn
          </LinkPill>
        </Links>

        <MenuButton
          onClick={() => setOpen(true)}
          aria-label={t('nav.openMenu')}
          aria-expanded={open}
        >
          <FaBars />
        </MenuButton>
      </NavContainer>

      <DrawerOverlay $open={open} onClick={close} />
      <Drawer $open={open}>
        <LyokoWindow
          title={t('nav.drawerTitle')}
          accent={CARTHAGE}
          rightSlot={
            <CloseButton onClick={close} aria-label={t('nav.closeMenu')}>
              <FaTimes />
            </CloseButton>
          }
        >
          <DrawerLinks>
            {SECTION_IDS.map((id) => (
              <DrawerLink
                key={id}
                href={`#${id}`}
                onClick={close}
                aria-current={current === id ? 'true' : undefined}
              >
                {t(`nav.sections.${id}`)}
              </DrawerLink>
            ))}
            <DrawerLink href={Bio.github} target="_blank" rel="noreferrer">
              Github
            </DrawerLink>
            <DrawerLink href={Bio.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </DrawerLink>
            <DrawerLanguage>
              <LanguageSwitch />
            </DrawerLanguage>
          </DrawerLinks>
        </LyokoWindow>
      </Drawer>
    </Nav>
  );
};

export default Navbar;
