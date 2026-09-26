/**
 * @file src/components/VirtualizationIntro/SuperscanWindow.js
 * Superscan pop-up shown beside the virtualization console during the intro:
 * blue frame, data grid, XANA status text, fixed timer, an activated Lyoko tower
 * as a red hologram (circuit lines, XANA roots at its base), the
 * eye of XANA (lyoko-symbol.png) and the scan gauge. Pure CSS/SVG. Hidden on
 * narrow screens.
 * @component
 */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import LyokoSymbolImg from '../../img/lyoko-symbol.png';

const XANA_RGB = '232, 71, 76';

const STATUS = [
  'UNIVERSAL ID : 22',
  'INHIBITORS: YES',
  '',
  'CONTROL: XANA',
  'XANA : 100',
  'LIMITED ACCESS : YES',
];

/* Green data blocks scattered on the grid: [left %, top %, size %, delay s]. */
const BLOCKS = [
  [14, 20, 9, 0],
  [66, 12, 7, 0.8],
  [78, 22, 8, 1.6],
  [30, 44, 6, 0.4],
  [8, 62, 7, 1.2],
  [58, 58, 6, 2],
  [84, 48, 5, 0.6],
];

const blockPulse = keyframes`
  0%, 100% { opacity: 0.25; }
  50%      { opacity: 0.6; }
`;

const eyePulse = keyframes`
  0%, 100% { filter: drop-shadow(0 0 4px rgba(232, 71, 76, 0.6)); }
  50%      { filter: drop-shadow(0 0 14px rgba(232, 71, 76, 1)); }
`;

const towerFlicker = keyframes`
  0%, 100% { opacity: 1; }
  48%      { opacity: 1; }
  50%      { opacity: 0.8; }
  52%      { opacity: 1; }
`;

const Window = styled(motion.div)`
  width: min(340px, 26vw);
  aspect-ratio: 624 / 540;
  display: flex;
  flex-direction: column;
  padding: 4px 6px 6px;
  background: linear-gradient(to bottom, #2b95c8, #145f8c);
  border: 2px solid #6cc8ec;
  border-radius: 4px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);

  @media (max-width: 960px) {
    display: none;
  }
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 18px;
  font-family: 'Courier New', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #d8f6ff;

  span:nth-child(3) {
    margin-left: auto;
    font-family: 'Orbitron', 'Courier New', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
  }
`;

const CloseBox = styled.span`
  width: 12px;
  height: 10px;
  background: #d8f6ff;
  border: 2px solid #145f8c;
`;

const Screen = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  border: 1px solid rgba(160, 225, 250, 0.6);
  background:
    linear-gradient(rgba(90, 200, 230, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(90, 200, 230, 0.12) 1px, transparent 1px),
    radial-gradient(ellipse at 45% 45%, #0f4a5c 0%, #062530 80%);
  background-size: 14px 14px, 14px 14px, 100% 100%;
`;

const Block = styled.span`
  position: absolute;
  background: rgba(40, 200, 120, 0.55);
  animation: ${blockPulse} 3s ease-in-out infinite;
`;

/* Blue corner shapes of the console, clipped into slanted panels. */
const Corner = styled.span`
  position: absolute;
  background: linear-gradient(to bottom, #2f8fd0, #1a5fa8);
  opacity: 0.9;
`;

const Orb = styled.span`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 12%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 45% 45%, #ffffff 0%, #9fe6ff 35%, #2f8fd0 75%);
  box-shadow: 0 0 12px rgba(160, 230, 255, 0.8);
`;

const Timer = styled.div`
  position: absolute;
  top: 3%;
  right: 16%;
  padding: 2px 10px;
  font-family: 'Orbitron', 'Courier New', monospace;
  font-size: clamp(14px, 2vw, 24px);
  letter-spacing: 0.05em;
  color: #bfefff;
  text-shadow: 0 0 8px rgba(160, 230, 255, 0.8);
  background: rgba(20, 80, 150, 0.85);
  border: 1px solid rgba(160, 225, 250, 0.8);
`;

const Status = styled.div`
  position: absolute;
  left: 7%;
  top: 46%;
  font-family: 'Courier New', monospace;
  font-size: clamp(7px, 0.75vw, 10px);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.06em;
  color: #eaf8ff;
  white-space: pre;
`;

const TowerWrap = styled.div`
  position: absolute;
  left: 47%;
  top: 16%;
  height: 72%;
  animation: ${towerFlicker} 4s linear infinite;

  svg {
    height: 100%;
    width: auto;
    overflow: visible;
    filter: drop-shadow(0 0 10px rgba(${XANA_RGB}, 0.9)) drop-shadow(0 0 24px rgba(${XANA_RGB}, 0.5));
  }
`;

const Eye = styled.img`
  position: absolute;
  right: 7%;
  top: 20%;
  width: 20%;
  animation: ${eyePulse} 1.6s ease-in-out infinite;
`;

const Gauge = styled.div`
  position: absolute;
  right: 10%;
  top: 56%;
  width: 13%;
  height: 25%;
  border: 2px solid #d9a52c;
  background: rgba(40, 20, 0, 0.5);
  display: flex;
  align-items: flex-end;
`;

const GaugeFill = styled(motion.div)`
  width: 100%;
  background:
    repeating-linear-gradient(
      45deg,
      rgba(90, 40, 10, 0.5) 0 3px,
      transparent 3px 6px
    ),
    #b0501c;
`;

const GaugeLabel = styled.div`
  position: absolute;
  right: 10%;
  width: 13%;
  top: 50%;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: clamp(8px, 0.8vw, 11px);
  font-weight: 700;
  color: #eaf8ff;
`;

const Coords = styled.div`
  position: absolute;
  right: 4%;
  bottom: 3%;
  padding: 1px 8px;
  font-family: 'Orbitron', 'Courier New', monospace;
  font-size: clamp(7px, 0.75vw, 10px);
  color: #eaf8ff;
  background: rgba(20, 80, 150, 0.9);
`;

const BottomBar = styled.div`
  height: 12px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 6px;
  background: #145f8c;

  span {
    height: 4px;
    background: rgba(160, 225, 250, 0.7);
  }
`;

/**
 * Activated Lyoko tower (after the tower model): tall cylinder with circuit
 * lines and XANA's dark roots gripping the base,
 * all tinted red as a hologram.
 * @returns {JSX.Element}
 */
const Tower = () => (
  <svg viewBox="0 0 120 400" aria-hidden="true">
    <defs>
      <linearGradient id="ss-tower-body" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8a1414" />
        <stop offset="30%" stopColor="#ff6a5c" />
        <stop offset="50%" stopColor="#ffe0d6" />
        <stop offset="70%" stopColor="#ff6a5c" />
        <stop offset="100%" stopColor="#8a1414" />
      </linearGradient>
      <pattern id="ss-scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="4" height="1.5" fill="rgba(255, 220, 210, 0.18)" />
      </pattern>
    </defs>

    {/* Body */}
    <rect x="30" y="38" width="60" height="330" rx="7" fill="url(#ss-tower-body)" />
    <rect x="30" y="38" width="60" height="330" rx="7" fill="url(#ss-scanlines)" />
    <rect
      x="30"
      y="38"
      width="60"
      height="330"
      rx="7"
      fill="none"
      stroke="rgba(255, 225, 215, 0.9)"
      strokeWidth="1.5"
    />

    {/* Circuit lines */}
    <g stroke="#8a2a1c" strokeWidth="1.2" fill="none">
      <circle cx="54" cy="116" r="3.5" />
      <line x1="54" y1="120" x2="54" y2="200" />
      <line x1="40" y1="150" x2="40" y2="230" />
      <circle cx="54" cy="286" r="3.5" />
      <line x1="54" y1="290" x2="54" y2="312" />
    </g>

    {/* XANA roots: dark drips climbing the base, branching veins above them,
        then tendrils wrapped around the foot of the tower. */}
    <path
      d="M 30 312 L 30 368 Q 30 374, 36 374 L 84 374 Q 90 374, 90 368 L 90 306
         L 87 322 L 83 300 L 79 318 L 74 292 L 70 314 L 65 304 L 61 320 L 56 288
         L 52 316 L 47 302 L 43 320 L 38 296 L 34 318 Z"
      fill="#3a0505"
      fillOpacity="0.92"
    />
    <g stroke="#3a0505" fill="none" strokeLinecap="round">
      <path d="M 56 290 C 55 276, 58 268, 55 254" strokeWidth="2.5" />
      <path d="M 55 268 C 60 262, 62 258, 66 252" strokeWidth="1.5" />
      <path d="M 74 294 C 75 282, 72 274, 75 264" strokeWidth="2" />
      <path d="M 38 298 C 37 288, 40 280, 38 270" strokeWidth="2" />
      <path d="M 38 282 C 34 278, 33 274, 32 268" strokeWidth="1.2" />
    </g>
    <g stroke="#2a0303" strokeWidth="4.5" fill="none" strokeLinecap="round">
      <path d="M 12 372 C 20 360, 40 380, 60 366 C 80 352, 100 378, 110 364" />
      <path d="M 18 384 C 34 372, 52 392, 72 380 C 88 370, 100 388, 106 380" />
      <path d="M 26 360 C 40 352, 52 368, 66 356" />
    </g>
  </svg>
);


/**
 * The pop-up. Springs in at the start, then the scan gauge fills to 100 %
 * during the first phase; the timer stays fixed, as in the series.
 * @component
 * @param {Object} props
 * @param {number} props.fillDuration - Seconds for the gauge to reach 100 %.
 * @returns {JSX.Element}
 */
const SuperscanWindow = ({ fillDuration }) => (
  <Window
    aria-hidden="true"
    initial={{ opacity: 0, scale: 0.85, y: -20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.4 }}
  >
    <TitleBar>
      <span>◁·◃ ◿◺◸</span>
      <span>◸·◃</span>
      <span>SUPERSCAN</span>
      <CloseBox />
    </TitleBar>

    <Screen>
      {BLOCKS.map(([left, top, size, delay]) => (
        <Block
          key={`${left}-${top}`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}%`,
            aspectRatio: '1',
            animationDelay: `${delay}s`,
          }}
        />
      ))}

      <Corner style={{ left: 0, top: '10%', width: '32%', height: '4%' }} />
      <Corner style={{ right: 0, top: '10%', width: '24%', height: '4%' }} />
      <Corner
        style={{
          left: 0,
          bottom: 0,
          width: '40%',
          height: '14%',
          clipPath: 'polygon(0 0, 70% 0, 100% 100%, 0 100%)',
        }}
      />
      <Corner
        style={{
          right: 0,
          bottom: 0,
          width: '44%',
          height: '12%',
          clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
        }}
      />

      <Orb />
      <Timer>2:02:00</Timer>
      <Status>{STATUS.join('\n')}</Status>

      <TowerWrap>
        <Tower />
      </TowerWrap>

      <Eye src={LyokoSymbolImg} alt="" />

      <GaugeLabel>100%</GaugeLabel>
      <Gauge>
        <GaugeFill
          initial={{ height: '0%' }}
          animate={{ height: '100%' }}
          transition={{ duration: fillDuration, ease: 'easeOut', delay: 0.6 }}
        />
      </Gauge>

      <Coords>0377 | 0246</Coords>
    </Screen>

    <BottomBar>
      <span style={{ width: '14%' }} />
      <span style={{ width: '4%' }} />
    </BottomBar>
  </Window>
);

export default SuperscanWindow;
