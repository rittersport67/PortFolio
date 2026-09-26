/**
 * @file src/components/VirtualizationIntro/index.js
 * First-visit intro on a supercomputer screen (teal-to-black gradient, light
 * pillars, HUD on top, control bar below). Jérémie's virtualization console
 * (ScanWindow), beside the Superscan pop-up (SuperscanWindow), types "Transfer… Scanner… Virtualization!" while the body is
 * outlined, scanned and virtualized as a hologram and the hero Lyoko card
 * materializes, then the page appears.
 * About 15 s, then waits for a click to enter. Plays once per browser,
 * skippable by click at any time (no keyboard skip, to avoid accidental key
 * presses cutting the intro short).
 * @component
 */
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Bio, experiences, projects } from '../../data/content';
import { CARTHAGE } from '../../utils/palette';
import ScanWindow from './ScanWindow';
import SuperscanWindow from './SuperscanWindow';

const STORAGE_KEY = 'lyoko-virtualized';
const TYPE_SPEED = 180;
const LINE_PAUSE = 1300;
/* Hold on the completed hologram before the "enter" prompt shows up. */
const FINAL_HOLD = 2100;

const firstName = Bio.name.split(' ')[0];

const LINES = [
  { text: `Transfer ${firstName}` },
  { text: `Scanner ${firstName}` },
  { text: 'Virtualization!', final: true },
];

/* Seconds spent typing one line. */
const typeTime = (line) => (line.text.length * TYPE_SPEED) / 1000;

/* Phases follow the typing: transfer and scanner last one line plus its pause,
   virtualization ends when "Virtualization!" is fully typed. */
const PHASE_DURATIONS = [
  typeTime(LINES[0]) + LINE_PAUSE / 1000,
  typeTime(LINES[1]) + LINE_PAUSE / 1000,
  typeTime(LINES[2]),
];

const REVEAL_DURATION = PHASE_DURATIONS.reduce((total, duration) => total + duration, 0);

/* The control-bar progress fills over the whole sequence, final hold included. */
const TOTAL_DURATION = REVEAL_DURATION + (LINE_PAUSE + FINAL_HOLD) / 1000;

/* Supercomputer screen tint: light teal pillars on a teal-to-black gradient. */
const PILLAR_RGB = '90, 214, 230';

/* Horizontal positions of the light pillars, in % of the screen width. */
const PILLARS = [5.3, 23, 33.1, 43.4, 53.1, 70.2, 88];

/* One HUD button per phase of the sequence, lit as it progresses. */
const PHASES = [
  { icon: '▶', label: 'Transfer' },
  { icon: '▶▶', label: 'Scanner' },
  { icon: '▮▶', label: 'Virtual' },
];

/* Skipped once the visitor has already been virtualized, or when they ask for
   reduced motion. If storage is unavailable the intro plays every visit.
   Navigating to #intro always replays it, bypassing the "already seen" check. */
const shouldPlay = () => {
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    if (window.location.hash === '#intro') return true;
    return !window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
};

const pillarFlicker = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.75; }
`;

const buttonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 6px rgba(90, 214, 230, 0.5); }
  50%      { box-shadow: 0 0 16px rgba(90, 214, 230, 0.9); }
`;

const Screen = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 110px 16px 150px;

  @media (max-width: 768px) {
    padding: 96px 12px 110px;
  }
  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 3px,
      rgba(0, 0, 0, 0.08) 3px,
      rgba(0, 0, 0, 0.08) 4px
    ),
    linear-gradient(
      to bottom,
      #3e808c 0%,
      #2b6571 18%,
      #173f49 42%,
      #0a1f26 65%,
      #040b0e 85%,
      #020406 100%
    );
  cursor: pointer;
  overflow: hidden;
`;

/* ─── Background: light pillars and beams ────────────────────────── */

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

/* Vertical beam that fades out towards the bottom of the screen. */
const Pillar = styled.div`
  position: absolute;
  top: 0;
  bottom: 38%;
  width: 3px;
  transform: translateX(-50%);
  background: linear-gradient(
    to bottom,
    rgba(${PILLAR_RGB}, 0.85) 0%,
    rgba(${PILLAR_RGB}, 0.45) 35%,
    transparent 100%
  );
  box-shadow: 0 0 12px 2px rgba(${PILLAR_RGB}, 0.25);
  animation: ${pillarFlicker} ${({ $delay }) => 4 + $delay}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const TopBeam = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(${PILLAR_RGB}, 0.85);
  box-shadow: 0 0 14px 3px rgba(${PILLAR_RGB}, 0.35);
`;

/* Two faint rails across the middle of the screen. */
const MidRail = styled.div`
  position: absolute;
  left: 19%;
  right: 26%;
  top: ${({ $top }) => $top}%;
  height: 3px;
  background: rgba(${PILLAR_RGB}, 0.1);
`;

/* ─── HUD: system info and phase buttons ─────────────────────────── */

const HudText = styled.div`
  position: absolute;
  top: 8px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: rgba(${PILLAR_RGB}, 0.9);
  white-space: nowrap;
`;

const HudLeft = styled(HudText)`
  left: 12px;
  display: flex;
  gap: 28px;
`;

const HudRight = styled(HudText)`
  right: 12%;
  display: flex;
  gap: 40px;

  @media (max-width: 960px) {
    display: none;
  }
`;

const HudOptional = styled.div`
  @media (max-width: 640px) {
    display: none;
  }
`;

const HudCenter = styled.div`
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  @media (max-width: 640px) {
    top: 50px;
  }
`;

const Status = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: rgba(${PILLAR_RGB}, 0.95);
  white-space: nowrap;
`;

const PhaseRow = styled.div`
  display: flex;
  gap: 28px;
`;

const PhaseButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

const PhaseIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  letter-spacing: -3px;
  background: rgba(20, 70, 80, 0.85);
  border: 1px solid rgba(${PILLAR_RGB}, 0.25);
  color: rgba(${PILLAR_RGB}, 0.35);
  transition: color 0.4s, background 0.4s, border-color 0.4s;

  ${({ $lit }) =>
    $lit &&
    css`
      color: #e8fdff;
      background: rgba(40, 140, 160, 0.9);
      border-color: rgba(${PILLAR_RGB}, 0.8);
    `}

  ${({ $current }) =>
    $current &&
    css`
      animation: ${buttonPulse} 1.2s ease-in-out infinite;
    `}
`;

const PhaseLabel = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 10px;
  padding: 0 4px;
  color: #d8f8ff;
  background: rgba(${PILLAR_RGB}, ${({ $lit }) => ($lit ? 0.55 : 0.2)});
  transition: background 0.4s;
`;

/* ─── Bottom control bar, whose track is the intro progress ──────── */

const ControlBar = styled.div`
  position: absolute;
  bottom: 84px;
  left: 10%;
  right: 30%;
  height: 36px;
  display: flex;
  pointer-events: none;

  @media (max-width: 768px) {
    left: 5%;
    right: 5%;
  }
`;

const ControlPanel = styled.div`
  position: relative;
  width: 40%;
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  background: #1f8aa6;
  border: 2px solid #2aa3c2;

  /* Raised tab with the four slots, like the original console. */
  &::before {
    content: '';
    position: absolute;
    left: -2px;
    top: -14px;
    width: 75%;
    height: 14px;
    background:
      repeating-linear-gradient(
        to right,
        transparent 0 6%,
        rgba(160, 230, 245, 0.7) 6% 22%,
        transparent 22% 25%
      )
      center / 100% 5px no-repeat,
      #1f8aa6;
    border: 2px solid #2aa3c2;
    border-bottom: none;
  }
`;

const ControlKey = styled.div`
  width: 48px;
  height: 16px;
  background: #4fc0d8;
  border: 1px solid #8adcee;

  @media (max-width: 480px) {
    width: 32px;
  }
`;

const Track = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 0 14px 0 8px;
  background: #1a7690;
  border: 2px solid #2aa3c2;
  border-left: none;
`;

const TrackLine = styled.div`
  position: relative;
  height: 4px;
  background: rgba(2, 30, 45, 0.9);
  overflow: hidden;
`;

const TrackFill = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: #bdf2ff;
  box-shadow: 0 0 6px #bdf2ff;
`;

const Credit = styled.div`
  position: absolute;
  right: 12px;
  bottom: 8px;
  font-family: 'Orbitron', 'Courier New', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(230, 250, 255, 0.75);

  @media (max-width: 640px) {
    display: none;
  }
`;

const Disclaimer = styled.p`
  position: absolute;
  left: 12px;
  bottom: 8px;
  max-width: 40%;
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 10px;
  line-height: 1.4;
  color: rgba(230, 250, 255, 0.5);

  @media (max-width: 640px) {
    right: 12px;
    max-width: none;
    font-size: 9px;
    text-align: center;
  }
`;

/* Virtualization console and Superscan pop-up side by side. */
const Stage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
`;

const SkipHint = styled.div`
  position: absolute;
  bottom: 28px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(150, 190, 255, 0.5);

  /* Clears the full-width disclaimer below. */
  @media (max-width: 640px) {
    bottom: 60px;
  }
`;

const glow = keyframes`
  0%, 100% { opacity: 1; text-shadow: 0 0 12px rgba(0, 212, 255, 0.8); }
  50%      { opacity: 0.45; text-shadow: none; }
`;

/* Replaces the skip hint once the sequence is over: the visitor enters on their own. */
const EnterPrompt = styled(SkipHint)`
  bottom: 36px;
  font-size: 14px;

  @media (max-width: 640px) {
    bottom: 64px;
  }
  font-weight: 700;
  letter-spacing: 0.24em;
  color: ${CARTHAGE};
  animation: ${glow} 1.6s ease-in-out infinite;
`;

/**
 * Full-screen overlay mounted above the whole app. Types each line character
 * by character while ScanWindow plays the body scan and card reveal and the
 * control bar fills, holds on the result, then waits for a click before
 * fading out through `AnimatePresence` and recording the visit so it never
 * replays.
 * @component
 * @returns {JSX.Element}
 */
const VirtualizationIntro = () => {
  const [active, setActive] = useState(shouldPlay);
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [ready, setReady] = useState(false);

  const finish = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
      if (window.location.hash === '#intro') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch {
      /* storage blocked: the intro will simply play again next visit */
    }
    setActive(false);
  }, []);

  // Typing: one character per tick, a pause between lines, then the final hold.
  useEffect(() => {
    if (!active || scanning) return undefined;
    const line = LINES[lineIndex];
    let timer;
    if (charCount < line.text.length) {
      timer = setTimeout(() => setCharCount((count) => count + 1), TYPE_SPEED);
    } else if (lineIndex < LINES.length - 1) {
      timer = setTimeout(() => {
        setLineIndex((index) => index + 1);
        setCharCount(0);
      }, LINE_PAUSE);
    } else {
      timer = setTimeout(() => setScanning(true), LINE_PAUSE);
    }
    return () => clearTimeout(timer);
  }, [active, scanning, lineIndex, charCount]);

  useEffect(() => {
    if (!scanning) return undefined;
    const timer = setTimeout(() => setReady(true), FINAL_HOLD);
    return () => clearTimeout(timer);
  }, [scanning]);

  // Lock the page scroll while the screen is up.
  useEffect(() => {
    if (!active) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <Screen
          key="virtualization"
          role="dialog"
          aria-label="Intro animation. Click to skip."
          onClick={finish}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <Backdrop aria-hidden="true">
            {PILLARS.map((left, index) => (
              <Pillar key={left} style={{ left: `${left}%` }} $delay={index * 0.7} />
            ))}
            <TopBeam />
            <MidRail $top={43.5} />
            <MidRail $top={48.5} />

            <HudLeft>
              <div>
                Lyoko interface
                <br />
                v{new Date().getFullYear()}.1
              </div>
              <HudOptional>
                User ID : [{firstName}]
                <br />
                Access pass : *******
              </HudOptional>
            </HudLeft>
            <HudRight>
              <div>Missions logged : {experiences.length}</div>
              <div>Programs : {projects.length}</div>
            </HudRight>
            <HudCenter>
              <Status>{ready ? 'Lyoko connection successful' : 'Lyoko connection…'}</Status>
              <PhaseRow>
                {PHASES.map((phase, index) => {
                  const current = scanning ? LINES.length : lineIndex;
                  return (
                    <PhaseButton key={phase.label}>
                      <PhaseIcon $lit={index <= current} $current={index === current}>
                        {phase.icon}
                      </PhaseIcon>
                      <PhaseLabel $lit={index <= current}>{phase.label}</PhaseLabel>
                    </PhaseButton>
                  );
                })}
              </PhaseRow>
            </HudCenter>

            <ControlBar>
              <ControlPanel>
                <ControlKey />
              </ControlPanel>
              <Track>
                <TrackLine>
                  <TrackFill
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: TOTAL_DURATION, ease: 'linear' }}
                  />
                </TrackLine>
                <TrackLine style={{ marginLeft: '35%' }} />
              </Track>
            </ControlBar>
            <Credit>
              © {new Date().getFullYear()} Lyoko interface // {Bio.name}
            </Credit>
          </Backdrop>

          <Stage>
            <ScanWindow
              phase={scanning ? 3 : lineIndex}
              durations={PHASE_DURATIONS}
              total={TOTAL_DURATION}
            />
            <SuperscanWindow fillDuration={PHASE_DURATIONS[0]} />
          </Stage>
          {ready ? (
            <EnterPrompt>▸ Click to enter Lyoko</EnterPrompt>
          ) : (
            <SkipHint>Click to skip</SkipHint>
          )}
          <Disclaimer>
            Fan-made tribute to <em>Code Lyoko</em>. Not affiliated with or endorsed by its
            rights holders. Characters and artwork © their respective owners.
          </Disclaimer>
        </Screen>
      )}
    </AnimatePresence>
  );
};

export default VirtualizationIntro;
