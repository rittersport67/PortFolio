/**
 * @file src/components/Cards/LyokoWindow.js
 * Window frame modeled on the Code Lyoko supercomputer interface: steel-blue title
 * bar with two dark pills around a centered title, a slate content panel, a
 * scrollbar-style gauge on the right and a status bar underneath.
 * Holds no content of its own: the card renders it as children, and can use
 * `rgb(var(--accent-rgb))` to pick up the window accent. Width is left to the caller
 * (`styled(LyokoWindow)` sets `max-width`).
 * @component
 */
import React from 'react';
import styled from 'styled-components';
import {
  alpha,
  rgbChannels,
  BLACK,
  WHITE,
  WINDOW_BAR,
  WINDOW_BAR_LIGHT,
  WINDOW_BAR_DARK,
  WINDOW_PILL,
  WINDOW_PILL_TEXT,
  WINDOW_PANEL,
  WINDOW_PANEL_BORDER,
  WINDOW_TRACK,
  WINDOW_TRACK_EDGE,
} from '../../utils/colors';
import { FONT_MONO, FONT_WINDOW } from '../../utils/fonts';

const Frame = styled.article`
    --accent-rgb: ${({ $accent }) => rgbChannels($accent)};
    width: 100%;
    background: ${WINDOW_BAR};
    border: 1px solid ${WINDOW_BAR_LIGHT};
    border-radius: 6px;
    padding: 3px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 0 22px rgba(var(--accent-rgb), 0.28);
    }
`

/* Three columns so the title stays centered whatever the pill widths */
const TitleBar = styled.header`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 10px;
    min-height: 30px;
    padding: 3px 6px;

    & > :first-child {
        justify-self: start;
    }
    & > :last-child {
        justify-self: end;
    }
`

const Title = styled.h3`
    font-family: ${FONT_WINDOW};
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${WHITE};
    text-shadow: 0 1px 0 ${WINDOW_BAR_DARK};
    @media only screen and (max-width: 768px) {
        font-size: 11px;
        letter-spacing: 0.1em;
    }
`

/* Dark pill of the title bar; also exported for the navbar and Hero controls */
export const WindowPill = styled.span`
    font-family: ${FONT_MONO};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    color: ${WINDOW_PILL_TEXT};
    background: ${WINDOW_PILL};
    border-radius: 7px;
    padding: 1px 9px;
    box-shadow: inset 0 1px 1px ${alpha(BLACK, 0.45)};
    @media only screen and (max-width: 768px) {
        font-size: 9px;
        padding: 1px 6px;
    }
`

/* Grows so windows stretched by a grid row keep their status bar at the bottom */
const Panel = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 16px;
    background: ${WINDOW_PANEL};
    border: 1px solid ${WINDOW_PANEL_BORDER};
    border-radius: 2px;
`

const Content = styled.div`
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 18px 18px 20px;
    @media only screen and (max-width: 768px) {
        padding: 14px 12px 16px;
    }
`

const Track = styled.div`
    position: relative;
    background: ${WINDOW_TRACK};
    border-left: 1px solid ${WINDOW_TRACK_EDGE};
`

/* Height is a share of the track, so the gauge follows the card height in CSS alone */
const Thumb = styled.div`
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    height: calc((100% - 4px) * ${({ $ratio }) => $ratio});
    min-height: 14px;
    background: rgba(var(--accent-rgb), 0.55);
    border: 1px solid ${alpha(WINDOW_TRACK_EDGE, 0.9)};
    border-radius: 1px;
`

const StatusBar = styled.footer`
    display: flex;
    align-items: center;
    min-height: 18px;
    padding: 1px 8px;
`

/**
 * Wedge, slanted bar and ticks drawn on the status bar, after the Lyoko interface.
 * @returns {JSX.Element}
 */
const StatusGlyph = () => (
  <svg width='58' height='10' viewBox='0 0 58 10' aria-hidden='true' fill={WINDOW_PILL}>
    <polygon points='0,9 13,3 13,9' />
    <polygon points='15,9 19,3 30,3 26,9' />
    {[35, 39, 43, 47].map((x) => (
      <rect key={x} x={x} y='3' width='2' height='6' />
    ))}
  </svg>
);

/**
 * @component
 * @param {Object} props
 * @param {string} props.title - Centered in the title bar.
 * @param {string} props.accent - Hex accent: gauge fill and hover glow.
 * @param {string} [props.leftLabel] - Text of the left title-bar pill; no pill when omitted.
 * @param {string} [props.rightLabel] - Text of the right title-bar pill; no pill when omitted.
 * @param {string} [props.rightTitle] - Tooltip explaining the right pill.
 * @param {React.ReactNode} [props.rightSlot] - Rendered in place of the right pill (e.g. a close button).
 * @param {number} [props.gauge=1] - Gauge fill, between 0 and 1.
 * @param {string} [props.className] - Set by `styled(LyokoWindow)`.
 * @param {React.ReactNode} props.children - Panel content.
 * @returns {JSX.Element}
 */
const LyokoWindow = ({
  title,
  accent,
  leftLabel,
  rightLabel,
  rightTitle,
  rightSlot,
  gauge = 1,
  className,
  children,
}) => (
  <Frame $accent={accent} className={className}>
    <TitleBar>
      {/* Empty spans keep the title centered when a pill is missing */}
      {leftLabel ? <WindowPill>{leftLabel}</WindowPill> : <span />}
      <Title>{title}</Title>
      {rightSlot ||
        (rightLabel ? <WindowPill title={rightTitle}>{rightLabel}</WindowPill> : <span />)}
    </TitleBar>
    <Panel>
      <Content>{children}</Content>
      <Track aria-hidden='true'>
        <Thumb $ratio={gauge} />
      </Track>
    </Panel>
    <StatusBar>
      <StatusGlyph />
    </StatusBar>
  </Frame>
);

export default LyokoWindow;
