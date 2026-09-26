/**
 * @file src/components/HeroSection/index.js
 * #about landing section (Sector 5 / Carthage): name, title, roles, intro, contact
 * and photo, over a subtle hex data-rain background (canvas).
 * @component
 */
import React, { useRef, useEffect } from 'react';
// import { useState } from 'react'; // photo ↔ card flip, disabled
import styled from 'styled-components';
import { Bio } from '../../data/content';
// import HeroImg from '../../img/hero-pp.jpg'; // photo ↔ card flip, disabled
import LyokoCardImg from '../../img/hero-lyokocard.png';
import { CARTHAGE } from '../../utils/palette';

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
  overflow: hidden;

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

const CanvasOverlay = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  -webkit-mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0.25) 0%, #000 55%);
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0.25) 0%, #000 55%);

  @media (max-width: 960px) {
    -webkit-mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.25) 60%);
    mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.25) 60%);
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

const Name = styled.h1`
  font-family: 'Orbitron', 'Courier New', monospace;
  font-weight: 900;
  font-size: 48px;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 960px) { text-align: center; }
  @media (max-width: 640px) { font-size: 30px; }
`;

const Headline = styled.p`
  margin-top: 10px;
  font-size: 22px;
  font-weight: 600;
  color: ${CARTHAGE};

  @media (max-width: 960px) { text-align: center; }
  @media (max-width: 640px) { font-size: 17px; }
`;

const Roles = styled.p`
  margin: 10px 0 28px;
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 960px) { text-align: center; }
  @media (max-width: 640px) { font-size: 14px; margin-bottom: 20px; }
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

const ContactBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  text-align: center;
`;

const ContactTitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 14px;
`;

const CtaButton = styled.a`
  display: block;
  width: 100%;
  padding: 18px 26px;
  font-family: 'Orbitron', 'Courier New', monospace;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: #001018;
  background: ${CARTHAGE};
  border-radius: 3px;
  transition: background 0.2s ease;

  &:hover { background: #6eb5ff; }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }

  @media (max-width: 640px) {
    font-size: 13px;
    padding: 16px 18px;
  }
`;

const CtaHint = styled.a`
  display: block;
  margin-top: 10px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-decoration: none;
  color: rgba(0, 212, 255, 0.75);
  transition: color 0.2s ease;

  &:hover { color: #fff; }

  @media (max-width: 640px) { font-size: 12px; }
`;

const SecondaryRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 18px;
  margin-top: 18px;
`;

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  color: rgba(242, 243, 244, 0.7);
  border: 1px solid rgba(0, 212, 255, 0.28);
  border-radius: 2px;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;


  &:hover {
    color: #fff;
    border-color: ${CARTHAGE};
    background: rgba(0, 212, 255, 0.1);
  }
`;

/* Static Lyoko character card, keeps the PNG's 347×555 ratio. */
const LyokoCard = styled.img`
  height: 380px;
  width: auto;
  aspect-ratio: 347 / 555;
  object-fit: contain;
  filter: drop-shadow(0 0 16px rgba(0, 212, 255, 0.35));

  @media (max-width: 960px) { height: 340px; }
  @media (max-width: 640px) { height: 260px; }
`;

/* Photo ↔ card flip, disabled — kept for a possible comeback.
/* Real photo on the front, Lyoko card on the back: "virtualization" on hover,
   on keyboard focus, or on tap for touch screens. *\/
const FlipCard = styled.button`
  width: 380px;
  height: 380px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  perspective: 1200px;
  border-radius: 50%;

  &:focus-visible {
    outline: 2px solid ${CARTHAGE};
    outline-offset: 6px;
  }

  @media (max-width: 960px) { width: 340px; height: 340px; }
  @media (max-width: 640px) { width: 260px; height: 260px; }
`;

// data-allow-motion: the flip keeps its rotation under prefers-reduced-motion (see App.css).
const FlipInner = styled.div.attrs({ 'data-allow-motion': true })`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);

  @media (hover: hover) {
    ${FlipCard}:hover & { transform: rotateY(180deg); }
  }
  ${FlipCard}:focus-visible & { transform: rotateY(180deg); }

  @media (hover: none) {
    transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'none')};
  }
`;

const Img = styled.img`
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 2px solid rgba(0, 212, 255, 0.6);
  backface-visibility: hidden;
`;

const CardImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: rotateY(180deg);
  backface-visibility: hidden;
`;
*/

/* ─── DataRain — hex data rain ───────────────────────────────────── */
const CHARS = '0123456789ABCDEF';

/**
 * Matrix-style columns of hex characters drawn on a canvas at ~8 fps, dimmed on the
 * text side. Frozen to a single frame under prefers-reduced-motion. The canvas is
 * rebuilt on resize; the loop and listener are removed on unmount. Does nothing when
 * the 2D context is unavailable (jsdom).
 * @component
 * @returns {JSX.Element}
 */
const DataRain = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = 13;
    let W, H, cols, drops;

    const setup = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cols  = Math.floor(W / SIZE);
      drops = Array.from({ length: cols }, () => -(Math.random() * 80 | 0));
    };

    const step = () => {
      ctx.fillStyle = 'rgba(0, 8, 20, 0.1)';
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${SIZE}px 'Courier New', monospace`;

      for (let i = 0; i < cols; i++) {
        const y = drops[i] * SIZE;
        if (y < 0) { drops[i]++; continue; }

        const ch = CHARS[Math.random() * CHARS.length | 0];
        const isHead = drops[i] % 5 === 0;
        ctx.fillStyle = isHead
          ? 'rgba(0, 212, 255, 0.5)'
          : `rgba(0, 212, 255, ${(Math.random() * 0.12 + 0.05).toFixed(2)})`;
        ctx.fillText(ch, i * SIZE, y);

        drops[i]++;
        if (y > H && Math.random() > 0.975) {
          drops[i] = -(Math.random() * 60 | 0);
        }
      }
    };

    // Reduced motion: paint one frozen frame instead of animating.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const paintStatic = () => {
      for (let n = 0; n < 120; n++) step();
    };

    setup();
    let raf, last = 0;

    const draw = (ts) => {
      raf = requestAnimationFrame(draw);
      if (ts - last < 120) return; // ~8 fps
      last = ts;
      step();
    };

    if (reduced) paintStatic();
    else raf = requestAnimationFrame(draw);

    const onResize = () => {
      setup();
      if (reduced) paintStatic();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <CanvasOverlay ref={ref} />;
};

/**
 * All text and links come from `Bio`: name, roles, description, email, linkedin
 * and location.
 * @component
 * @returns {JSX.Element}
 */
const Hero = () => {
  // const [flipped, setFlipped] = useState(false); // photo ↔ card flip, disabled

  return (
    <div id="about">
      <HeroContainer>
        <DataRain />

        <HeroInnerContainer>
          <HeroLeftContainer>
            <SectorTag>Sector 5 — Carthage</SectorTag>
            <Name>{Bio.name}</Name>
            <Headline>{Bio.title} · {Bio.location}</Headline>
            <Roles>{Bio.roles.join(' · ')}</Roles>
            <SubTitle>
              {Bio.description.map((sentence, index) => (
                <p key={index}>{sentence}</p>
              ))}
            </SubTitle>
            <ContactBlock>
              <ContactTitle>Open to new missions, any sector.</ContactTitle>
              <CtaButton href={`mailto:${Bio.email}`}>Get in touch</CtaButton>
              <CtaHint href={`mailto:${Bio.email}`}>Channel open: {Bio.email}</CtaHint>
              <SecondaryRow>
                <SecondaryLink href={Bio.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </SecondaryLink>
              </SecondaryRow>
            </ContactBlock>
          </HeroLeftContainer>

          <HeroRightContainer>
            <LyokoCard src={LyokoCardImg} alt={`${Bio.name} as a Code Lyoko character card`} />
            {/* Photo ↔ card flip, disabled:
            <FlipCard
              type="button"
              aria-label="Show my Lyoko card"
              onClick={() => setFlipped((f) => !f)}
            >
              <FlipInner $flipped={flipped}>
                <Img src={HeroImg} alt={Bio.name} />
                <CardImg src={LyokoCardImg} alt={`${Bio.name} as a Code Lyoko character card`} />
              </FlipInner>
            </FlipCard>
            */}
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default Hero;
