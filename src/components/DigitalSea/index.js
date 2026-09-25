/**
 * @file src/components/DigitalSea/index.js
 * Footer « Mer Numérique » : vagues et grille statiques en CSS pur, avec le copyright.
 * @component
 */
import React from 'react';
import styled from 'styled-components';
import { CARTHAGE } from '../../utils/palette';

const Sea = styled.footer`
  width: 100%;
  min-height: 260px;
  background-color: #020810;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 40px;
`;

const Waves = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      -12deg,
      transparent 0px, transparent 18px,
      rgba(10, 74, 255, 0.18) 18px, rgba(10, 74, 255, 0.18) 20px
    ),
    repeating-linear-gradient(
      -8deg,
      transparent 0px, transparent 28px,
      rgba(0, 150, 255, 0.10) 28px, rgba(0, 150, 255, 0.10) 30px
    ),
    repeating-linear-gradient(
      -4deg,
      transparent 0px, transparent 40px,
      rgba(0, 200, 255, 0.06) 40px, rgba(0, 200, 255, 0.06) 42px
    );
`;

const HexGrid = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image:
    linear-gradient(rgba(10, 74, 255, 1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(10, 74, 255, 1) 1px, transparent 1px);
  background-size: 36px 36px;
`;

const DepthGlow = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 160px;
  background: radial-gradient(
    ellipse 70% 100% at 50% 100%,
    rgba(10, 74, 255, 0.22) 0%,
    transparent 70%
  );
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const SeaTitle = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: rgba(100, 160, 255, 0.6);
  margin: 0;
`;

const BackToTop = styled.a`
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  color: rgba(0, 212, 255, 0.75);
  border: 1px solid rgba(0, 212, 255, 0.35);
  border-radius: 2px;
  padding: 8px 18px;
  transition: color 0.2s, border-color 0.2s, box-shadow 0.2s;

  &:hover {
    color: #fff;
    border-color: rgba(0, 212, 255, 0.8);
    box-shadow: 0 0 14px rgba(0, 212, 255, 0.35);
  }
`;

const Copyright = styled.p`
  font-size: 12px;
  color: rgba(150, 190, 255, 0.7);
  margin: 0;
  letter-spacing: 1px;

  strong {
    color: ${CARTHAGE};
    font-weight: 700;
  }
`;

const Disclaimer = styled.p`
  max-width: 520px;
  padding: 0 16px;
  text-align: center;
  font-size: 12px;
  line-height: 1.6;
  color: rgba(150, 190, 255, 0.7);
  margin: 0;
  letter-spacing: 0.5px;

  em {
    color: ${CARTHAGE};
    font-style: normal;
    font-weight: 700;
  }
`;

/**
 * Dernier élément de la page. L'année du copyright est calculée au rendu.
 * @component
 * @returns {JSX.Element}
 */
const DigitalSea = () => (
  <Sea>
    <Waves />
    <HexGrid />
    <DepthGlow />
    <Content>
      <SeaTitle>Digital Sea</SeaTitle>
      <BackToTop href="#about">▴ Return to the past</BackToTop>
      <Copyright>© {new Date().getFullYear()} <strong>Sébastien RITTER</strong></Copyright>
      <Disclaimer>
        Fan-made tribute to <em>Code Lyoko</em>. Not affiliated with or endorsed by its rights
        holders. Characters and artwork © their respective owners.
      </Disclaimer>
    </Content>
  </Sea>
);

export default DigitalSea;
