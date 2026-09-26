/**
 * @file src/components/LanguageSwitch/index.js
 * EN | FR segmented control drawn as a dark Lyoko title-bar pill, the active language
 * lit like the navbar tabs. Each option shows a mini flag, drawn as inline SVG (emoji
 * flags do not render on Windows). Used in the navbar and in its "Supercomputer" drawer.
 * The choice is remembered in localStorage by the i18next language detector.
 * @component
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { WindowPill } from '../Cards/LyokoWindow';
import { LANGUAGES } from '../../i18n';
import {
  alpha,
  FLAG_FR_BLUE,
  FLAG_FR_RED,
  FLAG_UK_BLUE,
  FLAG_UK_RED,
  WHITE,
  WINDOW_BAR,
  WINDOW_BAR_DARK,
  WINDOW_PILL_TEXT
} from '../../utils/colors';
import { FONT_MONO } from '../../utils/fonts';

const Group = styled(WindowPill).attrs({ role: 'group' })`
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  border-radius: 8px;
`;

const Option = styled.button.attrs({ type: 'button' })`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 9px;
  font-family: ${FONT_MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: ${WINDOW_PILL_TEXT};
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: ${WHITE};
    background: ${alpha(WINDOW_BAR, 0.35)};
  }

  &[aria-pressed='true'] {
    color: ${WHITE};
    background: ${WINDOW_BAR_DARK};
  }
`;

const FlagSvg = styled.svg.attrs({ 'aria-hidden': true, width: 16, height: 11 })`
  display: block;
  flex-shrink: 0;
  border-radius: 2px;
`;

/** Simplified Union Jack (English). */
const UkFlag = () => (
  <FlagSvg viewBox="0 0 60 40" preserveAspectRatio="none">
    <rect width="60" height="40" fill={FLAG_UK_BLUE} />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke={WHITE} strokeWidth="8" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke={FLAG_UK_RED} strokeWidth="3" />
    <path d="M30,0 V40 M0,20 H60" stroke={WHITE} strokeWidth="12" />
    <path d="M30,0 V40 M0,20 H60" stroke={FLAG_UK_RED} strokeWidth="7" />
  </FlagSvg>
);

/** French tricolour. */
const FrFlag = () => (
  <FlagSvg viewBox="0 0 3 2" preserveAspectRatio="none">
    <rect width="1" height="2" fill={FLAG_FR_BLUE} />
    <rect x="1" width="1" height="2" fill={WHITE} />
    <rect x="2" width="1" height="2" fill={FLAG_FR_RED} />
  </FlagSvg>
);

const FLAGS = { en: UkFlag, fr: FrFlag };

/**
 * @component
 * @param {Object} props
 * @param {string} [props.className] - Set by `styled(LanguageSwitch)` for placement.
 * @returns {JSX.Element}
 */
const LanguageSwitch = ({ className }) => {
  const { t, i18n } = useTranslation();

  return (
    <Group className={className} aria-label={t('nav.language')}>
      {LANGUAGES.map(({ code, label, name }) => {
        const Flag = FLAGS[code];
        return (
          <Option
            key={code}
            lang={code}
            title={name}
            aria-label={name}
            aria-pressed={i18n.resolvedLanguage === code}
            onClick={() => i18n.changeLanguage(code)}
          >
            <Flag />
            {label}
          </Option>
        );
      })}
    </Group>
  );
};

export default LanguageSwitch;
