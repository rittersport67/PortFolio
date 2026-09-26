/**
 * @file src/components/VirtualizationIntro/ScanWindow.js
 * Jérémie's virtualization console, drawn over the supercomputer backdrop of the
 * intro: module row, tabs, side gauges, the scanner viewport where a T-pose
 * mannequin is outlined, scanned then virtualized as a green hologram, and the "card scan"
 * panel where the hero Lyoko card materializes. Pure CSS/SVG, driven by the
 * intro phase.
 * @component
 */
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Bio } from '../../data/content';
import LyokoCardImg from '../../img/hero-lyokocard.png';
import LyokoWorldImg from '../../img/code-lyoko-inspired-world.png';
import {
  alpha,
  CONSOLE_BLUE,
  CONSOLE_BLUE_DARK,
  CONSOLE_FRAME,
  BLACK,
  CONSOLE_PANEL,
  CONSOLE_TEXT,
  CONSOLE_HIGHLIGHT,
  TAB_BG,
  TAB_BORDER,
  TAB_BG_ACTIVE,
  CONSOLE_LIGHT,
  TAB_BG_SPACER,
  CONSOLE_LIGHT_PALE,
  HISTOGRAM_BAR,
  HISTOGRAM_BAR_LIGHT,
  EQ_BAR,
  EQ_BAR_LIGHT,
  VIEWPORT_BORDER,
  VIEWPORT_BG_CENTER,
  VIEWPORT_BG_EDGE,
  HOLO,
  HOLO_DIFFUSE,
  HOLO_DETAIL_DIFFUSE,
  HOLO_SPECULAR,
  HOLO_RING,
  HOLO_SCANLINE,
  WHITE,
} from '../../utils/introColors';
import { FONT_MONO } from '../../utils/introFonts';

/* SVG coordinate space of the hologram body. */
const BODY_W = 900;
const BODY_H = 960;

/* Tapered capsule between two joints: a quad plus a round cap at each end.
   The hologram filter smooths the seams. */
const limb = (key, x1, y1, r1, x2, y2, r2) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const nx = -Math.sin(angle);
  const ny = Math.cos(angle);
  const points = [
    [x1 + nx * r1, y1 + ny * r1],
    [x2 + nx * r2, y2 + ny * r2],
    [x2 - nx * r2, y2 - ny * r2],
    [x1 - nx * r1, y1 - ny * r1],
  ]
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');
  return (
    <g key={key}>
      <polygon points={points} />
      <circle cx={x1} cy={y1} r={r1} />
      <circle cx={x2} cy={y2} r={r2} />
    </g>
  );
};

/* Mirrors an x coordinate around the body's vertical axis. */
const mirror = (side, x) => BODY_W / 2 + side * (x - BODY_W / 2);

/* Head after hero-pp.jpg: swept-up quiff, short sides, square bearded jaw.
   Drawn at full size, scaled down around the chin to fit an 8-head body and
   lowered so the neck stays short. */
const HEAD_TRANSFORM = 'translate(450 180) scale(0.84) translate(-450 -166)';

const HAIR = (
  <path
    d="M 408 88 C 401 60, 409 38, 425 28 C 431 16, 446 17, 452 12 C 461 4, 476 9, 481 15
       C 496 18, 505 36, 499 58 C 497 70, 495 80, 492 88 C 489 74, 474 64, 453 64
       C 432 64, 415 72, 408 88 Z"
  />
);

/* Sneaker seen from the front, toe turned outward: upper path for one side.
   The collar starts at the ankle's width so the foot stays attached to the leg. */
const sneakerUpper = (side) => {
  const x = (value) => mirror(side, value);
  return `M ${x(372)} 868 C ${x(379)} 864, ${x(397)} 864, ${x(404)} 868
    C ${x(409)} 884, ${x(414)} 896, ${x(414)} 912 L ${x(344)} 912
    C ${x(334)} 912, ${x(332)} 903, ${x(340)} 897 C ${x(352)} 890, ${x(367)} 884, ${x(372)} 868 Z`;
};

/* Thick sneaker sole under one foot. */
const sneakerSole = (side) => (
  <rect x={Math.min(mirror(side, 331), mirror(side, 417))} y="906" width="86" height="20" rx="8" />
);

/* Soles, lit on top of the body so the sneakers read. */
const SHOE_DETAIL = (
  <>
    {[-1, 1].map((side) => (
      <g key={side}>
        {sneakerSole(side)}
      </g>
    ))}
  </>
);

/* Impersonal T-pose mannequin, like Aelita's hologram in the series: 1.85 m,
   77 kg (slim, athletic), hands with fingers and sneakers, clothes and face
   left out. Drawn in white: the
   filters only use its alpha. */
const BODY_SHAPES = (
  <>
    <g transform={HEAD_TRANSFORM}>
      <path
        d="M 450 42 C 481 42, 492 62, 492 90 C 493 112, 491 132, 482 148
           C 474 160, 462 166, 450 166 C 438 166, 426 160, 418 148
           C 409 132, 407 112, 408 90 C 408 62, 419 42, 450 42 Z"
      />
      <ellipse cx="410" cy="100" rx="9" ry="17" />
      <ellipse cx="490" cy="100" rx="9" ry="17" />
      {HAIR}
    </g>
    {limb('neck', 450, 172, 26, 450, 200, 30)}
    <path
      d="M 356 212 C 378 194, 522 194, 544 212 C 555 232, 546 270, 539 300
         C 530 345, 518 380, 518 410 C 518 440, 530 470, 526 498 L 374 498
         C 370 470, 382 440, 382 410 C 382 380, 370 345, 361 300
         C 354 270, 345 232, 356 212 Z"
    />
    {[-1, 1].map((side) => (
      <g key={side}>
        {limb('upper-arm', mirror(side, 366), 222, 24, mirror(side, 215), 236, 19)}
        {limb('forearm', mirror(side, 215), 236, 19, mirror(side, 96), 247, 13)}
        {limb('palm', mirror(side, 92), 248, 16, mirror(side, 62), 251, 19)}
        {limb('index', mirror(side, 58), 240, 6.5, mirror(side, 16), 232, 5.5)}
        {limb('middle', mirror(side, 56), 248, 6.5, mirror(side, 10), 249, 5.5)}
        {limb('ring', mirror(side, 56), 256, 6.5, mirror(side, 13), 265, 5.5)}
        {limb('little', mirror(side, 58), 263, 6, mirror(side, 24), 279, 5)}
        {limb('thumb', mirror(side, 84), 240, 7.5, mirror(side, 62), 220, 6)}
        {limb('thigh', mirror(side, 410), 488, 42, mirror(side, 398), 700, 26)}
        {limb('calf', mirror(side, 398), 700, 26, mirror(side, 394), 770, 28)}
        {limb('shin', mirror(side, 394), 770, 28, mirror(side, 388), 894, 16)}
        <path d={sneakerUpper(side)} />
        {sneakerSole(side)}
      </g>
    ))}
  </>
);

const firstName = Bio.name.split(' ')[0];

const MODULES = ['CODE', 'DNA', 'SCAN', 'SECTOR', 'TRANSFER', 'MEMORY', 'LINK', 'CORE'];
/* Number of modules lit at each phase: transfer, scanner, virtualization, done. */
const MODULES_LIT = [2, 5, 8, 8];

const PHASE_LABELS = ['TRANSFER', 'SCANNING', 'VIRTUALIZATION', 'COMPLETE'];

const equalize = keyframes`
  0%, 100% { transform: scaleY(0.35); }
  50%      { transform: scaleY(1); }
`;

/* Double helix geometry, in px: one full turn is DNA_PERIOD tall. */
const DNA_WIDTH = 40;
const DNA_AMPLITUDE = 15;
const DNA_PERIOD = 110;
const DNA_TURNS = 4;
const DNA_HEIGHT = DNA_PERIOD * DNA_TURNS;

/* Scrolls exactly one turn so the loop is seamless. */
const helix = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(-${DNA_PERIOD}px); }
`;

const DNA_ANGLE = (y) => (2 * Math.PI * y) / DNA_PERIOD;

const strandX = (y, side) => DNA_WIDTH / 2 + side * DNA_AMPLITUDE * Math.sin(DNA_ANGLE(y));

/* Closed ribbon outline for one run of points, thicker when closer to the
   viewer (depth = cos of the angle) so the strand swells in front. */
const ribbon = (ys, side) => {
  const left = [];
  const right = [];
  ys.forEach((y) => {
    const x = strandX(y, side);
    const depth = side * Math.cos(DNA_ANGLE(y));
    const half = (2.2 + 1.2 * depth) / 2;
    const slope = side * DNA_AMPLITUDE * (2 * Math.PI / DNA_PERIOD) * Math.cos(DNA_ANGLE(y));
    const norm = Math.hypot(1, slope);
    const nx = half / norm;
    const ny = (-slope * half) / norm;
    left.push(`${(x - nx).toFixed(2)} ${(y - ny).toFixed(2)}`);
    right.push(`${(x + nx).toFixed(2)} ${(y + ny).toFixed(2)}`);
  });
  return `M${left.join(' L')} L${right.reverse().join(' L')} Z`;
};

/* Splits a strand into the runs where it passes in front of (or behind) the
   other one, so front runs can be drawn over the base pairs. */
const strandRuns = (side, front) => {
  const runs = [];
  let current = [];
  for (let y = 0; y <= DNA_HEIGHT; y += 1) {
    if ((side * Math.cos(DNA_ANGLE(y)) > 0) === front) {
      current.push(y);
    } else if (current.length) {
      runs.push(ribbon([...current, y], side));
      current = [];
    }
  }
  if (current.length > 1) runs.push(ribbon(current, side));
  return runs.join(' ');
};

const DNA_BACK = [strandRuns(1, false), strandRuns(-1, false)].join(' ');
const DNA_FRONT = [strandRuns(1, true), strandRuns(-1, true)].join(' ');

/* Base pairs: twelve rungs per turn, skipped where the strands cross. */
const DNA_RUNGS = Array.from({ length: DNA_TURNS * 12 }, (_, index) => {
  const y = (index + 0.5) * (DNA_PERIOD / 12);
  return { y, x1: strandX(y, 1), x2: strandX(y, -1) };
}).filter(({ x1, x2 }) => Math.abs(x1 - x2) > 4);

const pulse = keyframes`
  0%, 100% { opacity: 0.55; }
  50%      { opacity: 1; }
`;

/* ─── Frame ──────────────────────────────────────────────────────── */

const Window = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  /* Shrunk to leave room for the Superscan pop-up beside it. */
  width: min(760px, 64vw, calc((100vh - 230px) * 1.62));

  /* No Superscan below 960px: the console takes the full width again. */
  @media (max-width: 960px) {
    width: min(1040px, 94vw, calc((100vh - 230px) * 1.62));
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    width: min(420px, 94vw);
    gap: 8px;
  }
`;

const MainPanel = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px;
  background: linear-gradient(to bottom, ${CONSOLE_BLUE}, ${CONSOLE_BLUE_DARK});
  border: 2px solid ${CONSOLE_FRAME};
  border-radius: 4px;
  box-shadow: 0 0 30px ${alpha(BLACK, 0.6)}, inset 0 0 20px ${alpha(BLACK, 0.3)};
`;

const Panel = styled.div`
  position: relative;
  background: ${CONSOLE_PANEL};
  border: 1px solid ${alpha(CONSOLE_FRAME, 0.45)};
  border-radius: 3px;
  overflow: hidden;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  font-family: ${FONT_MONO};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: ${CONSOLE_TEXT};
`;

/* ─── Module row ─────────────────────────────────────────────────── */

const ModuleRow = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Module = styled(Panel)`
  height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4px 2px 3px;
`;

const ModuleLight = styled.div`
  width: 6px;
  height: 18px;
  border-radius: 1px;
  background: ${({ $lit }) => ($lit ? CONSOLE_LIGHT : alpha(CONSOLE_FRAME, 0.2))};
  box-shadow: ${({ $lit }) => ($lit ? `0 0 8px ${CONSOLE_LIGHT}` : 'none')};
  transition: background 0.4s, box-shadow 0.4s;
  transition-delay: ${({ $delay }) => $delay}s;
`;

const ModuleLabel = styled.div`
  font-family: ${FONT_MONO};
  font-size: 8px;
  letter-spacing: 0.08em;
  color: ${alpha(CONSOLE_TEXT, 0.7)};
`;

/* ─── Tabs ───────────────────────────────────────────────────────── */

const TabRow = styled.div`
  display: flex;
  gap: 4px;
`;

const Tab = styled.div`
  padding: 3px 12px;
  font-family: ${FONT_MONO};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${CONSOLE_HIGHLIGHT};
  background: ${TAB_BG};
  border: 1px solid ${alpha(TAB_BORDER, 0.5)};
  transition: background 0.4s, box-shadow 0.4s;

  ${({ $active }) =>
    $active &&
    css`
      background: ${TAB_BG_ACTIVE};
      box-shadow: 0 0 10px ${alpha(CONSOLE_LIGHT, 0.7)};
    `}

  ${({ $spacer }) =>
    $spacer &&
    css`
      flex: 1;
      background: ${TAB_BG_SPACER};
      @media (max-width: 768px) {
        display: none;
      }
    `}

  @media (max-width: 480px) {
    padding: 3px 6px;
    font-size: 9px;
  }
`;

/* ─── Body: three columns ────────────────────────────────────────── */

const Body = styled.div`
  display: grid;
  grid-template-columns: 22% 1fr 17%;
  gap: 6px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

/* Left column: vertical gauge beside the rotating Lyoko world. */
const GaugeRow = styled.div`
  display: flex;
  gap: 6px;
  min-height: 0;
`;

const Gauge = styled(Panel)`
  width: 22px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  padding: 3px;
`;

const GaugeFill = styled(motion.div)`
  width: 100%;
  background: linear-gradient(to top, ${CONSOLE_LIGHT}, ${CONSOLE_LIGHT_PALE});
  box-shadow: 0 0 8px ${alpha(CONSOLE_LIGHT, 0.7)};
`;

const WorldPanel = styled(Panel)`
  flex: 1;
  min-width: 0;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
`;

const World = styled(motion.img)`
  width: 100%;
  max-height: 100%;
  aspect-ratio: 1;
  object-fit: contain;
`;

const MiniBars = styled(Panel)`
  height: 70px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  padding: 8px;
`;

const MiniBar = styled.span`
  width: 9px;
  height: 100%;
  background: linear-gradient(to top, ${HISTOGRAM_BAR}, ${HISTOGRAM_BAR_LIGHT});
  transform-origin: bottom;
  animation: ${equalize} ${({ $speed }) => $speed}s ease-in-out infinite;
`;

const Histogram = styled(Panel)`
  height: 64px;
  padding: 6px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

/* Right column decorations. */
const FrameModule = styled(Panel)`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 70%;
    height: 70%;
    border: 2px solid ${alpha(CONSOLE_FRAME, 0.5)};
  }
`;

const BlobModule = styled(Panel)`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  span {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, ${CONSOLE_HIGHLIGHT}, ${CONSOLE_FRAME});
    box-shadow: 0 0 10px ${alpha(CONSOLE_LIGHT, 0.6)};
    animation: ${pulse} 2s ease-in-out infinite;
  }
  span:nth-child(2) { animation-delay: 1s; }
`;

const DnaModule = styled(Panel)`
  flex: 1;
  min-height: 70px;

  svg {
    position: absolute;
    top: 0;
    left: calc(50% - ${DNA_WIDTH / 2}px);
    width: ${DNA_WIDTH}px;
    height: ${DNA_HEIGHT}px;
    animation: ${helix} 5s linear infinite;
  }
`;

const EqModule = styled(Panel)`
  height: 64px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  padding: 6px;

  span {
    width: 7px;
    height: 100%;
    background: linear-gradient(to top, ${EQ_BAR}, ${EQ_BAR_LIGHT});
    transform-origin: bottom;
    animation: ${equalize} 1.4s ease-in-out infinite;
  }
`;

/* ─── Scanner viewport ───────────────────────────────────────────── */

const Viewport = styled.div`
  position: relative;
  aspect-ratio: 1.15;
  border: 2px solid ${VIEWPORT_BORDER};
  background: radial-gradient(ellipse at 50% 40%, ${VIEWPORT_BG_CENTER} 0%, ${VIEWPORT_BG_EDGE} 75%);
  overflow: hidden;

  @media (max-width: 768px) {
    aspect-ratio: auto;
    height: 32vh;
  }
`;

/* Receding floor grid under the body. */
const Floor = styled(motion.div)`
  position: absolute;
  left: -30%;
  right: -30%;
  bottom: -10%;
  height: 45%;
  background-image:
    linear-gradient(${alpha(HOLO, 0.35)} 1px, transparent 1px),
    linear-gradient(90deg, ${alpha(HOLO, 0.35)} 1px, transparent 1px);
  background-size: 28px 28px;
  transform: perspective(300px) rotateX(62deg);
  transform-origin: bottom;
  mask-image: linear-gradient(to top, black, transparent);
  -webkit-mask-image: linear-gradient(to top, black, transparent);
`;

const BodyWrap = styled(motion.div)`
  position: absolute;
  inset: 6% 0 4%;
  display: flex;
  justify-content: center;

  svg {
    height: 100%;
    width: auto;
    overflow: visible;
  }
`;

const ViewportLabel = styled.div`
  position: absolute;
  top: 6px;
  left: 8px;
  right: 8px;
  display: flex;
  justify-content: space-between;
  font-family: ${FONT_MONO};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: ${alpha(HOLO, 0.85)};
`;

/* ─── Bottom row under the viewport ──────────────────────────────── */

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const BottomCell = styled(Panel)`
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 46px;
    width: auto;
  }
`;

const DataText = styled.div`
  font-family: ${FONT_MONO};
  font-size: 9px;
  line-height: 1.5;
  color: ${alpha(CONSOLE_TEXT, 0.8)};
`;

/* ─── Card scan panel ────────────────────────────────────────────── */

const CardPanel = styled.div`
  width: 22%;
  flex-shrink: 0;
  display: flex;
  gap: 6px;
  padding: 10px 8px;
  background: linear-gradient(to bottom, ${CONSOLE_BLUE}, ${CONSOLE_BLUE_DARK});
  border: 2px solid ${CONSOLE_FRAME};
  border-radius: 4px;
  box-shadow: 0 0 30px ${alpha(BLACK, 0.6)};

  @media (max-width: 768px) {
    width: auto;
    justify-content: center;
    padding: 8px;
  }
`;

const CardLabel = styled.div`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: ${FONT_MONO};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: ${CONSOLE_TEXT};
  text-align: center;
`;

/* The card keeps the PNG's 347×555 ratio. */
const CardFrame = styled.div`
  position: relative;
  flex: 1;
  aspect-ratio: 347 / 555;
  background: ${CONSOLE_PANEL};
  border: 1px solid ${alpha(CONSOLE_FRAME, 0.45)};

  @media (max-width: 768px) {
    flex: none;
    height: 18vh;
  }
`;

const CardImg = styled(motion.img)`
  position: absolute;
  inset: 4%;
  width: 92%;
  height: 92%;
  object-fit: contain;
`;

const CardRing = styled(motion.div)`
  position: absolute;
  left: -6%;
  right: -6%;
  height: 2px;
  background: ${CONSOLE_LIGHT};
  box-shadow: 0 0 12px 3px ${alpha(CONSOLE_LIGHT, 0.7)};
  border-radius: 50%;
  pointer-events: none;
`;

/* ─── Pieces ─────────────────────────────────────────────────────── */


/**
 * Round gauge whose needle swings further at each phase.
 * @param {Object} props
 * @param {number} props.phase
 * @param {number} props.offset - Extra angle so the two dials differ.
 * @returns {JSX.Element}
 */
const Dial = ({ phase, offset }) => (
  <svg viewBox="0 0 60 60" aria-hidden="true">
    <circle cx="30" cy="30" r="26" fill="none" stroke={alpha(CONSOLE_FRAME, 0.6)} strokeWidth="2" />
    <circle cx="30" cy="30" r="3" fill={CONSOLE_TEXT} />
    <motion.line
      x1="30"
      y1="30"
      x2="30"
      y2="10"
      stroke={CONSOLE_TEXT}
      strokeWidth="2"
      style={{ originX: '30px', originY: '30px' }}
      animate={{ rotate: -110 + phase * 60 + offset }}
      transition={{ type: 'spring', stiffness: 60, damping: 10 }}
    />
  </svg>
);

/**
 * The body in the viewport: outline drawn during transfer, green hologram
 * revealed behind the scan band, then virtualization rings and a steady glow.
 * The body is an impersonal mannequin (BODY_SHAPES), not a photo.
 * SVG filters and masks keep it working in every browser.
 * @param {Object} props
 * @param {number} props.phase - 0 transfer, 1 scanner, 2 virtualization, 3 done.
 * @param {number[]} props.durations - Length of phases 0–2, in seconds.
 * @returns {JSX.Element}
 */
const Hologram = ({ phase, durations }) => (
  <BodyWrap
    animate={phase >= 3 ? { y: [0, -6, 0] } : { y: 0 }}
    transition={phase >= 3 ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : {}}
  >
    <svg
      viewBox={`0 0 ${BODY_W} ${BODY_H}`}
      aria-hidden="true"
      style={{
        filter: phase >= 2 ? `drop-shadow(0 0 12px ${alpha(HOLO, 0.55)})` : 'none',
        transition: 'filter 1s',
      }}
    >
      <defs>
        {/* Contour: the smoothed silhouette, dilated, minus itself. */}
        <filter id="vi-outline" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="soft" />
          <feComponentTransfer in="soft" result="shape">
            <feFuncA type="linear" slope="8" intercept="-3.5" />
          </feComponentTransfer>
          <feMorphology in="shape" operator="dilate" radius="3" result="dilated" />
          <feComposite in="dilated" in2="shape" operator="out" result="ring" />
          <feFlood floodColor={HOLO} result="color" />
          <feComposite in="color" in2="ring" operator="in" result="line" />
          <feGaussianBlur in="line" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="line" />
          </feMerge>
        </filter>
        {/* Hologram, Aelita-style: the smoothed silhouette lit as a glossy
            green volume. Two blurs of the alpha (edges + core) form the height
            map for diffuse + specular light; a light blur hides 8-bit banding. */}
        <filter
          id="vi-holo"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="soft" />
          <feComponentTransfer in="soft" result="shape">
            <feFuncA type="linear" slope="8" intercept="-3.5" />
          </feComponentTransfer>
          <feGaussianBlur in="shape" stdDeviation="10" result="edge" />
          <feGaussianBlur in="shape" stdDeviation="34" result="core" />
          <feComposite
            in="edge"
            in2="core"
            operator="arithmetic"
            k1="0"
            k2="0.55"
            k3="0.45"
            k4="0"
            result="volume"
          />
          <feDiffuseLighting
            in="volume"
            surfaceScale="9"
            diffuseConstant="1.2"
            lightingColor={HOLO_DIFFUSE}
            result="diffuse"
          >
            <feDistantLight azimuth="235" elevation="40" />
          </feDiffuseLighting>
          <feSpecularLighting
            in="volume"
            surfaceScale="9"
            specularConstant="1.1"
            specularExponent="26"
            lightingColor={HOLO_SPECULAR}
            result="specular"
          >
            <feDistantLight azimuth="235" elevation="48" />
          </feSpecularLighting>
          <feComposite
            in="diffuse"
            in2="specular"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litRaw"
          />
          <feGaussianBlur in="litRaw" stdDeviation="2" result="lit" />
          <feComposite in="lit" in2="shape" operator="in" result="body" />
          <feColorMatrix
            in="body"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.92 0"
          />
        </filter>
        {/* Same lighting at a smaller scale, for the hair and sneaker sole reliefs. */}
        <filter
          id="vi-holo-detail"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="soft" />
          <feComponentTransfer in="soft" result="shape">
            <feFuncA type="linear" slope="8" intercept="-3.5" />
          </feComponentTransfer>
          <feGaussianBlur in="shape" stdDeviation="5" result="volume" />
          <feDiffuseLighting
            in="volume"
            surfaceScale="6"
            diffuseConstant="1.2"
            lightingColor={HOLO_DETAIL_DIFFUSE}
            result="diffuse"
          >
            <feDistantLight azimuth="235" elevation="40" />
          </feDiffuseLighting>
          <feSpecularLighting
            in="volume"
            surfaceScale="6"
            specularConstant="1.1"
            specularExponent="26"
            lightingColor={HOLO_SPECULAR}
            result="specular"
          >
            <feDistantLight azimuth="235" elevation="48" />
          </feSpecularLighting>
          <feComposite
            in="diffuse"
            in2="specular"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="lit"
          />
          <feComposite in="lit" in2="shape" operator="in" />
        </filter>
        {/* Keeps the scan lines on the body. */}
        <mask id="vi-body-mask">
          <g fill={WHITE}>{BODY_SHAPES}</g>
        </mask>
        <pattern id="vi-lines" width="4" height="6" patternUnits="userSpaceOnUse">
          <rect width="4" height="1.5" fill={alpha(HOLO_SCANLINE, 0.18)} />
        </pattern>
        <linearGradient id="vi-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HOLO} stopOpacity="0" />
          <stop offset="85%" stopColor={HOLO} stopOpacity="0.35" />
          <stop offset="100%" stopColor={HOLO_RING} stopOpacity="1" />
        </linearGradient>
        <clipPath id="vi-outline-clip">
          <motion.rect
            x="-20"
            y="-20"
            width={BODY_W + 40}
            initial={{ height: 0 }}
            animate={{ height: BODY_H + 40 }}
            transition={{ duration: durations[0], ease: 'linear' }}
          />
        </clipPath>
        <clipPath id="vi-fill-clip">
          <motion.rect
            x="-20"
            y="-20"
            width={BODY_W + 40}
            initial={{ height: 0 }}
            animate={{ height: phase >= 1 ? BODY_H + 40 : 0 }}
            transition={{ duration: durations[1], ease: 'linear' }}
          />
        </clipPath>
      </defs>

      <g clipPath="url(#vi-outline-clip)">
        <motion.g
          fill={WHITE}
          filter="url(#vi-outline)"
          animate={{ opacity: phase >= 2 ? 0.35 : 1 }}
          transition={{ duration: 1 }}
        >
          {BODY_SHAPES}
        </motion.g>
      </g>

      <motion.g
        clipPath="url(#vi-fill-clip)"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: phase >= 2 ? [0.7, 1, 0.85, 1] : 0.7 }}
        transition={{ duration: 1.2 }}
      >
        <g fill={WHITE} filter="url(#vi-holo)">
          {BODY_SHAPES}
        </g>
        <g fill={WHITE} filter="url(#vi-holo-detail)" opacity="0.5" transform={HEAD_TRANSFORM}>
          {HAIR}
        </g>
        <g fill={WHITE} filter="url(#vi-holo-detail)" opacity="0.55">
          {SHOE_DETAIL}
        </g>
        <rect width={BODY_W} height={BODY_H} fill="url(#vi-lines)" mask="url(#vi-body-mask)" />
      </motion.g>

      {phase === 1 && (
        <motion.rect
          x="-60"
          width={BODY_W + 120}
          height="60"
          fill="url(#vi-band)"
          initial={{ y: -60 }}
          animate={{ y: BODY_H }}
          transition={{ duration: durations[1], ease: 'linear' }}
        />
      )}

      {/* Virtualization rings climbing around the body. */}
      {phase === 2 &&
        [0, 1, 2].map((ring) => (
          <motion.ellipse
            key={ring}
            cx={BODY_W / 2}
            rx={BODY_W * 0.3}
            ry="22"
            fill="none"
            stroke={HOLO_RING}
            strokeWidth="3"
            initial={{ cy: BODY_H, opacity: 0 }}
            animate={{ cy: 0, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: durations[2] * 0.6,
              delay: ring * durations[2] * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
    </svg>
  </BodyWrap>
);

/**
 * The whole console. Phases: 0 transfer, 1 scanner, 2 virtualization, 3 done.
 * @component
 * @param {Object} props
 * @param {number} props.phase
 * @param {number[]} props.durations - Length of phases 0–2, in seconds.
 * @param {number} props.total - Length of the whole sequence, in seconds.
 * @returns {JSX.Element}
 */
const ScanWindow = ({ phase, durations, total }) => {
  const cardDuration = durations[1] + durations[2];

  return (
    <Window>
      <MainPanel>
        <TitleBar>
          <span>◁·◃ ◿◺◸</span>
          <span>LIAISON</span>
        </TitleBar>

        <ModuleRow>
          {MODULES.map((label, index) => (
            <Module key={label}>
              <ModuleLight $lit={index < MODULES_LIT[phase]} $delay={(index % 3) * 0.25} />
              <ModuleLabel>{label}</ModuleLabel>
            </Module>
          ))}
        </ModuleRow>

        <TabRow>
          <Tab $active>{firstName}</Tab>
          <Tab $spacer />
          <Tab $active={phase === 0}>Sectors</Tab>
          <Tab>Devirt</Tab>
          <Tab $active={phase === 1}>Scan</Tab>
          <Tab $active={phase >= 2}>Virt</Tab>
        </TabRow>

        <Body>
          <SideColumn>
            <GaugeRow>
              <Gauge>
                <GaugeFill
                  initial={{ height: '4%' }}
                  animate={{ height: '100%' }}
                  transition={{ duration: total, ease: 'linear' }}
                />
              </Gauge>
              <WorldPanel>
                <World
                  src={LyokoWorldImg}
                  alt=""
                  aria-hidden="true"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
                />
              </WorldPanel>
            </GaugeRow>
            <MiniBars>
              {[1.1, 1.7, 1.3, 2, 1.5].map((speed) => (
                <MiniBar key={speed} $speed={speed} />
              ))}
            </MiniBars>
            <Histogram>
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                {[4, 6, 5, 9, 14, 22, 30, 26, 18, 12, 8, 5].map((height, index) => (
                  <rect
                    key={index}
                    x={10 + index * 7}
                    y={38 - height}
                    width="5"
                    height={height}
                    fill={alpha(CONSOLE_TEXT, 0.75)}
                  />
                ))}
                <line x1="8" y1="38.5" x2="96" y2="38.5" stroke={alpha(CONSOLE_FRAME, 0.6)} />
              </svg>
            </Histogram>
          </SideColumn>

          <CenterColumn>
            <Viewport>
              <Floor initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} />
              <Hologram phase={phase} durations={durations} />
              <ViewportLabel>
                <span>SUBJECT · {firstName.toUpperCase()}</span>
                <span>{PHASE_LABELS[phase]}</span>
              </ViewportLabel>
            </Viewport>
            <BottomRow>
              <BottomCell>
                <Dial phase={phase} offset={0} />
              </BottomCell>
              <BottomCell>
                <Dial phase={phase} offset={-25} />
              </BottomCell>
              <BottomCell>
                <DataText>
                  SUBJECT #3804
                  <br />
                  DNA LINK {phase >= 1 ? 'OK' : '…'}
                  <br />
                  SECTOR 5
                </DataText>
              </BottomCell>
              <BottomCell>
                <svg viewBox="0 0 60 30" aria-hidden="true">
                  <ellipse cx="30" cy="18" rx="22" ry="7" fill={alpha(HOLO, 0.35)} />
                  <ellipse cx="30" cy="15" rx="12" ry="7" fill={alpha(HOLO, 0.8)} />
                </svg>
              </BottomCell>
            </BottomRow>
          </CenterColumn>

          <SideColumn>
            <FrameModule />
            <BlobModule>
              <span />
              <span />
            </BlobModule>
            <DnaModule>
              <svg viewBox={`0 0 ${DNA_WIDTH} ${DNA_HEIGHT}`} aria-hidden="true">
                <path d={DNA_BACK} fill={HOLO} />
                {DNA_RUNGS.map(({ y, x1, x2 }) => (
                  <line
                    key={y}
                    x1={x1}
                    y1={y}
                    x2={x2}
                    y2={y}
                    stroke={HOLO}
                    strokeOpacity="0.75"
                    strokeWidth="1.2"
                  />
                ))}
                <path d={DNA_FRONT} fill={HOLO} />
              </svg>
            </DnaModule>
            <EqModule>
              {[0, 0.3, 0.6, 0.15, 0.45, 0.75].map((delay) => (
                <span key={delay} style={{ animationDelay: `${delay}s` }} />
              ))}
            </EqModule>
          </SideColumn>
        </Body>
      </MainPanel>

      <CardPanel>
        <CardLabel>CARD SCAN</CardLabel>
        <CardFrame>
          <CardImg
            src={LyokoCardImg}
            alt={`${Bio.name} as a Code Lyoko character card`}
            initial={{ clipPath: 'inset(100% 0% 0% 0%)', filter: 'saturate(0) brightness(1.8)' }}
            animate={
              phase >= 1
                ? { clipPath: 'inset(0% 0% 0% 0%)', filter: 'saturate(1) brightness(1)' }
                : { clipPath: 'inset(100% 0% 0% 0%)', filter: 'saturate(0) brightness(1.8)' }
            }
            transition={{ duration: cardDuration, ease: 'linear' }}
          />
          {phase >= 1 && (
            <CardRing
              initial={{ bottom: '4%', opacity: 1 }}
              animate={{ bottom: '96%', opacity: [1, 1, 0] }}
              transition={{ duration: cardDuration, ease: 'linear' }}
            />
          )}
        </CardFrame>
      </CardPanel>
    </Window>
  );
};

export default ScanWindow;
