/**
 * @file src/components/DigitalSea/index.js
 * "Digital Sea" footer: static pure-CSS waves and grid, back-to-top link, copyright
 * and fan-tribute disclaimer.
 * @component
 */
import React from 'react';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import { CARTHAGE } from '../../utils/palette';
import {
  alpha,
  SEA_BG,
  SEA_BLUE,
  SEA_WAVE,
  SEA_FOAM,
  SEA_TEXT,
  WHITE,
  SEA_TEXT_MUTED,
} from '../../utils/colors';
import { FONT_MONO } from '../../utils/fonts';

const Sea = styled.footer`
  width: 100%;
  min-height: 260px;
  background-color: ${SEA_BG};
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
      ${alpha(SEA_BLUE, 0.18)} 18px, ${alpha(SEA_BLUE, 0.18)} 20px
    ),
    repeating-linear-gradient(
      -8deg,
      transparent 0px, transparent 28px,
      ${alpha(SEA_WAVE, 0.10)} 28px, ${alpha(SEA_WAVE, 0.10)} 30px
    ),
    repeating-linear-gradient(
      -4deg,
      transparent 0px, transparent 40px,
      ${alpha(SEA_FOAM, 0.06)} 40px, ${alpha(SEA_FOAM, 0.06)} 42px
    );
`;

const HexGrid = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image:
    linear-gradient(${SEA_BLUE} 1px, transparent 1px),
    linear-gradient(90deg, ${SEA_BLUE} 1px, transparent 1px);
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
    ${alpha(SEA_BLUE, 0.22)} 0%,
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
  color: ${alpha(SEA_TEXT, 0.6)};
  margin: 0;
`;

const BackToTop = styled.a`
  font-family: ${FONT_MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${alpha(CARTHAGE, 0.75)};
  border: 1px solid ${alpha(CARTHAGE, 0.35)};
  border-radius: 2px;
  padding: 8px 18px;
  transition: color 0.2s, border-color 0.2s, box-shadow 0.2s;

  &:hover {
    color: ${WHITE};
    border-color: ${alpha(CARTHAGE, 0.8)};
    box-shadow: 0 0 14px ${alpha(CARTHAGE, 0.35)};
  }
`;

const Copyright = styled.p`
  font-size: 12px;
  color: ${alpha(SEA_TEXT_MUTED, 0.7)};
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
  color: ${alpha(SEA_TEXT_MUTED, 0.7)};
  margin: 0;
  letter-spacing: 0.5px;

  em {
    color: ${CARTHAGE};
    font-style: normal;
    font-weight: 700;
  }
`;

/**
 * Last element of the page. The copyright year is computed at render time.
 * @component
 * @returns {JSX.Element}
 */
const DigitalSea = () => {
  const { t } = useTranslation();

  return (
    <Sea>
      <Waves />
      <HexGrid />
      <DepthGlow />
      <Content>
        <SeaTitle>{t('footer.title')}</SeaTitle>
        <BackToTop href="#about">{t('footer.backToTop')}</BackToTop>
        <Copyright>© {new Date().getFullYear()} <strong>Sébastien RITTER</strong></Copyright>
        <Disclaimer>
          <Trans i18nKey="footer.disclaimer" components={{ em: <em /> }} />
        </Disclaimer>
      </Content>
    </Sea>
  );
};

export default DigitalSea;
