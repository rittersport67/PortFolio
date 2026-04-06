import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components'; // keyframes kept for ringPulse
import { Bio } from '../../data/contants.js';
import TypeWriter from 'typewriter-effect';
import HeroImg from '../../img/hero-pp.jpg';

/* ─── Secteur 5 / Carthage ──────────────────────────────────────── */
const CARTHAGE = '#00d4ff';

/* ── animations ─────────────────────────────────────────────────── */
const ringPulse = keyframes`
  0%   { transform: translate(-50%, -50%) scale(0.85); opacity: 0.18; }
  50%  { transform: translate(-50%, -50%) scale(1.05); opacity: 0.06; }
  100% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.18; }
`;

/* ── styled components ──────────────────────────────────────────── */
const SectorTag = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: ${CARTHAGE};
  opacity: 0.55;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    height: 1px;
    width: 24px;
    background: ${CARTHAGE};
    opacity: 0.5;
  }

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
  overflow: hidden;

  /* fond Sector 5 : grille cartésienne + radial deep-blue */
  background:
    linear-gradient(rgba(0, 212, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.025) 1px, transparent 1px),
    radial-gradient(ellipse at 62% 28%, rgba(0, 26, 255, 0.18) 0%, transparent 50%),
    radial-gradient(ellipse at 18% 72%, rgba(0, 212, 255, 0.09) 0%, transparent 42%),
    #000814;
  background-size: 40px 40px, 40px 40px, 100% 100%, 100% 100%, 100% 100%;

  @media (max-width: 960px) { padding: 66px 16px; }
  @media (max-width: 640px) { padding: 32px 16px; }
`;

/* anneaux concentriques pulsants (sphère Carthage) */
const Ring = styled.div`
  position: absolute;
  top: 50%;
  left: 68%;
  border-radius: 50%;
  border: 1px solid rgba(0, 212, 255, 0.12);
  pointer-events: none;
  z-index: 0;
  animation: ${ringPulse} ${({ dur }) => dur || '4s'} ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || '0s'};
  width: ${({ size }) => size || '300px'};
  height: ${({ size }) => size || '300px'};

  @media (max-width: 960px) { display: none; }
`;

/* canvas pour la pluie de données hex */
const CanvasOverlay = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 1;
`;

const HeroBg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  z-index: 3;

  @media (max-width: 960px) { flex-direction: column; }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  display: flex;
  order: 2;
  justify-content: end;
  gap: 12px;
  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
  }
  @media (max-width: 640px) { margin-bottom: 30px; }
`;

/* ─── textes ─────────────────────────────────────────────────────── */
const Title = styled.div`
  font-family: 'Orbitron', 'Courier New', monospace;
  font-weight: 700;
  font-size: 44px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;

  @media (max-width: 960px) { text-align: center; }
  @media (max-width: 640px) {
    font-size: 28px;
    margin-bottom: 8px;
  }
`;

const NameHighlight = styled.span`
  display: block;
  font-family: 'Orbitron', 'Courier New', monospace;
  font-weight: 900;
  font-size: 48px;
  background: linear-gradient(90deg, #00d4ff 0%, #6eb5ff 50%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 16px rgba(0, 212, 255, 0.4));
  letter-spacing: 0.04em;

  @media (max-width: 640px) { font-size: 30px; }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 28px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) { text-align: center; }
  @media (max-width: 640px) {
    font-size: 20px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const SubTitle = styled.div`
  font-size: 16px;
  line-height: 28px;
  margin-bottom: 42px;
  color: rgba(242, 243, 244, 0.65);
  border-left: 2px solid rgba(0, 212, 255, 0.35);
  padding-left: 16px;

  p { margin-bottom: 6px; }
  p:last-child { margin-bottom: 0; }

  @media (max-width: 960px) {
    text-align: center;
    border-left: none;
    padding-left: 0;
    border-top: 1px solid rgba(0, 212, 255, 0.2);
    padding-top: 16px;
  }
  @media (max-width: 640px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

/* ─── bouton HUD ─────────────────────────────────────────────────── */
const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 95%;
  max-width: 280px;
  padding: 13px 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.06);
  border: 1px solid rgba(0, 212, 255, 0.5);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    top: -3px; left: -3px;
    width: 12px; height: 12px;
    border-top: 2px solid #00d4ff;
    border-left: 2px solid #00d4ff;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -3px; right: -3px;
    width: 12px; height: 12px;
    border-bottom: 2px solid #00d4ff;
    border-right: 2px solid #00d4ff;
  }
  &:hover {
    background: rgba(0, 212, 255, 0.14);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    color: #fff;
  }
  @media (max-width: 640px) { font-size: 11px; padding: 11px 0; }
`;

/* ─── photo ──────────────────────────────────────────────────────── */
const ImgFrame = styled.div`
  position: relative;
  display: inline-block;

  &::before {
    content: '';
    position: absolute;
    top: -10px; left: -10px;
    width: 28px; height: 28px;
    border-top: 2px solid #00d4ff;
    border-left: 2px solid #00d4ff;
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -10px; right: -10px;
    width: 28px; height: 28px;
    border-bottom: 2px solid #00d4ff;
    border-right: 2px solid #00d4ff;
    z-index: 1;
  }
`;

const Img = styled.img`
  display: block;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 2px solid rgba(0, 212, 255, 0.6);
  box-shadow:
    0 0 24px rgba(0, 212, 255, 0.25),
    0 0 60px rgba(0, 26, 255, 0.15);

  @media (max-width: 960px) { width: 340px; height: 340px; }
  @media (max-width: 640px) { width: 260px; height: 260px; }
`;

/* ─── DataRain — pluie de données hex ───────────────────────────── */
const CHARS = '0123456789ABCDEF';

const DataRain = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const SIZE = 13;
    let W, H, cols, drops;

    const setup = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cols  = Math.floor(W / SIZE);
      drops = Array.from({ length: cols }, () => -(Math.random() * 80 | 0));
    };
    setup();

    let raf, last = 0;

    const draw = (ts) => {
      raf = requestAnimationFrame(draw);
      if (ts - last < 80) return; // ~12 fps → lent, données ambiantes
      last = ts;

      /* fondu vers le fond (trail) */
      ctx.fillStyle = 'rgba(0, 8, 20, 0.1)';
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${SIZE}px 'Courier New', monospace`;

      for (let i = 0; i < cols; i++) {
        const y = drops[i] * SIZE;
        if (y < 0) { drops[i]++; continue; }

        const ch = CHARS[Math.random() * CHARS.length | 0];
        /* tête de la colonne plus lumineuse */
        const isHead = drops[i] % 5 === 0;
        ctx.fillStyle = isHead
          ? 'rgba(0, 212, 255, 0.75)'
          : `rgba(0, 212, 255, ${(Math.random() * 0.2 + 0.05).toFixed(2)})`;
        ctx.fillText(ch, i * SIZE, y);

        drops[i]++;
        if (y > H && Math.random() > 0.975) {
          drops[i] = -(Math.random() * 60 | 0);
        }
      }
    };

    raf = requestAnimationFrame(draw);

    const onResize = () => { setup(); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <CanvasOverlay ref={ref} />;
};

/* ─── Hero ───────────────────────────────────────────────────────── */
const Hero = () => (
  <div id="about">
    <HeroContainer>
      <HeroBg />
      <DataRain />

      {/* anneaux concentriques côté photo */}
      <Ring size="260px" dur="5s"   delay="0s"   />
      <Ring size="380px" dur="5s"   delay="0.8s" />
      <Ring size="500px" dur="5s"   delay="1.6s" />
      <Ring size="640px" dur="5s"   delay="2.4s" />

      <HeroInnerContainer>
        <HeroLeftContainer>
          <SectorTag>◈ Secteur 5 — Carthage</SectorTag>
          <Title>
            Hi, I am
            <NameHighlight>{Bio.name}</NameHighlight>
          </Title>
          <TextLoop>
            I am a
            <Span>
              <TypeWriter
                options={{
                  strings: Bio.roles,
                  autoStart: true,
                  loop: true,
                  delay: 100,
                }}
              />
            </Span>
          </TextLoop>
          <SubTitle>
            {Bio.description.map((sentence, index) => (
              <p key={index}>{sentence}</p>
            ))}
          </SubTitle>
          <ResumeButton href={Bio.resume} target="_blank" rel="noreferrer">
            ▸ Check Resume
          </ResumeButton>
        </HeroLeftContainer>

        <HeroRightContainer>
          <ImgFrame>
            <Img src={HeroImg} alt="hero-image" />
          </ImgFrame>
        </HeroRightContainer>
      </HeroInnerContainer>
    </HeroContainer>
  </div>
);

export default Hero;
