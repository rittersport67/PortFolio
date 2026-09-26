/**
 * @file src/components/HeroSection/index.js
 * #about landing section (Sector 5 / Carthage): the shared sector header, then an
 * "Identity" Lyoko window (name,
 * title, roles, intro, contact) beside a "Card scan" window holding the Lyoko
 * character card, over a subtle hex data-rain background (canvas).
 * @component
 */
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Bio } from '../../data/content';
import LyokoCardImg from '../../img/hero-lyokocard.png';
import LyokoWindow, { WindowPill } from '../Cards/LyokoWindow';
import SectionHeader from '../SectionHeader';
import { CARTHAGE } from '../../utils/palette';
import {
  alpha,
  HERO_HALO,
  NAVY_HERO,
  BLACK,
  CTA_TEXT,
  CTA_HOVER,
  WHITE,
  WINDOW_TEXT,
  WINDOW_TEXT_SOFT,
  WINDOW_PANEL_BORDER,
  WINDOW_PILL_TEXT,
} from '../../utils/colors';
import { FONT_MONO, FONT_WINDOW } from '../../utils/fonts';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  position: relative;
  padding: 64px 30px 72px;
  z-index: 1;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 62% 28%, ${alpha(HERO_HALO, 0.18)} 0%, transparent 50%),
    radial-gradient(ellipse at 18% 72%, ${alpha(CARTHAGE, 0.09)} 0%, transparent 42%),
    ${NAVY_HERO};

  @media (max-width: 960px) {
    padding: 48px 16px;
  }
  @media (max-width: 640px) {
    padding: 28px 16px;
  }
`;

const CanvasOverlay = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  -webkit-mask-image: linear-gradient(90deg, ${alpha(BLACK, 0.25)} 0%, ${BLACK} 55%);
  mask-image: linear-gradient(90deg, ${alpha(BLACK, 0.25)} 0%, ${BLACK} 55%);

  @media (max-width: 960px) {
    -webkit-mask-image: linear-gradient(180deg, ${BLACK} 0%, ${alpha(BLACK, 0.25)} 60%);
    mask-image: linear-gradient(180deg, ${BLACK} 0%, ${alpha(BLACK, 0.25)} 60%);
  }
`;

const Header = styled(SectionHeader)`
  position: relative;
  z-index: 3;
`;

/* Identity window + fixed-width card window; the card goes first when stacked */
const HeroGrid = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const CardWindow = styled(LyokoWindow)`
  @media (max-width: 960px) {
    order: -1;
    max-width: 340px;
    justify-self: center;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${FONT_MONO};
  font-size: 14px;
  line-height: 1.6;
  color: ${WINDOW_TEXT};
`;

const Name = styled.h1`
  font-family: ${FONT_WINDOW};
  font-weight: 400;
  font-size: 36px;
  line-height: 1.25;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-wrap: balance;
  color: ${WHITE};

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

const Headline = styled.p`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 700;
  color: ${CARTHAGE};

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

/* "Key : value" lines, as in the Lyoko description window */
const Facts = styled.dl`
  margin-top: 18px;
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 2px 1ch;

  dt {
    white-space: pre;
    color: ${WINDOW_TEXT_SOFT};
  }
  dt::after {
    content: ' :';
  }
`;

const Roles = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 2px 16px;

  li {
    display: flex;
    align-items: baseline;
    gap: 7px;
  }
  li::before {
    content: '';
    flex-shrink: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${CARTHAGE};
    transform: translateY(-2px);
  }
`;

const About = styled.div`
  margin-top: 20px;
  max-width: 62ch;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Contact = styled.div`
  margin-top: 26px;
  padding-top: 20px;
  border-top: 1px solid ${alpha(WINDOW_PANEL_BORDER, 0.35)};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContactLead = styled.p`
  font-size: 13px;
  color: ${WINDOW_TEXT_SOFT};
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const CtaButton = styled.a`
  padding: 12px 22px;
  font-family: ${FONT_WINDOW};
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${CTA_TEXT};
  background: ${CARTHAGE};
  border-radius: 7px;
  box-shadow: inset 0 -2px 0 ${alpha(BLACK, 0.25)};
  transition: background 0.2s ease;

  &:hover {
    background: ${CTA_HOVER};
  }
  &:focus-visible {
    outline: 2px solid ${WHITE};
    outline-offset: 3px;
  }

  @media (max-width: 640px) {
    font-size: 11px;
    padding: 11px 16px;
  }
`;

const LinkPill = styled(WindowPill).attrs({ as: 'a' })`
  padding: 8px 14px;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 7px;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: ${WHITE};
    border-color: ${CARTHAGE};
  }
`;

const MailLink = styled.a`
  font-size: 12.5px;
  color: ${WINDOW_TEXT_SOFT};
  text-decoration: none;
  &:hover {
    color: ${WHITE};
  }
`;

/* Static Lyoko character card, keeps the PNG's 347×555 ratio. */
const LyokoCard = styled.img`
  display: block;
  width: 100%;
  max-width: 250px;
  height: auto;
  aspect-ratio: 347 / 555;
  margin: 0 auto;
  filter: drop-shadow(0 0 14px ${alpha(CARTHAGE, 0.3)});
  transition: filter 0.3s ease;

  @media (max-width: 640px) {
    max-width: 190px;
  }
`;

const CardCaption = styled.span`
  display: block;
  margin-top: 14px;
  text-align: center;
  font-family: ${FONT_MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${WINDOW_PILL_TEXT};
  transition: color 0.2s ease;
`;

/* Easter egg: the card links to #intro, which replays the virtualization intro. */
const CardLink = styled.a`
  display: block;
  text-decoration: none;
  border-radius: 4px;

  &:hover ${LyokoCard}, &:focus-visible ${LyokoCard} {
    filter: drop-shadow(0 0 24px ${alpha(CARTHAGE, 0.55)});
  }
  &:hover ${CardCaption} {
    color: ${WHITE};
  }
  &:focus-visible {
    outline: 1px solid ${alpha(CARTHAGE, 0.6)};
    outline-offset: 6px;
  }
`;

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
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cols = Math.floor(W / SIZE);
      drops = Array.from({ length: cols }, () => -((Math.random() * 80) | 0));
    };

    const step = () => {
      ctx.fillStyle = alpha(NAVY_HERO, 0.1);
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${SIZE}px ${FONT_MONO}`;

      for (let i = 0; i < cols; i++) {
        const y = drops[i] * SIZE;
        if (y < 0) {
          drops[i]++;
          continue;
        }

        const ch = CHARS[(Math.random() * CHARS.length) | 0];
        const isHead = drops[i] % 5 === 0;
        ctx.fillStyle = isHead
          ? alpha(CARTHAGE, 0.5)
          : alpha(CARTHAGE, (Math.random() * 0.12 + 0.05).toFixed(2));
        ctx.fillText(ch, i * SIZE, y);

        drops[i]++;
        if (y > H && Math.random() > 0.975) {
          drops[i] = -((Math.random() * 60) | 0);
        }
      }
    };

    // Reduced motion: paint one frozen frame instead of animating.
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const paintStatic = () => {
      for (let n = 0; n < 120; n++) step();
    };

    setup();
    let raf,
      last = 0;

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
 * Name, years of experience, location and links come from `Bio`; title, roles and
 * paragraphs from `bio` in content.json; the labels from `hero` in ui.json.
 * @component
 * @returns {JSX.Element}
 */
const Hero = () => {
  const { t } = useTranslation();
  const roles = t('content:bio.roles', { returnObjects: true });
  const description = t('content:bio.description', { returnObjects: true });

  return (
    <div id="about">
      <HeroContainer>
        <DataRain />

        {/* z-index lifts the header above the data-rain canvas */}
        <Header sector={t('hero.sector')} title={t('hero.title')} accent={CARTHAGE}>
          {t('hero.description')}
        </Header>

        <HeroGrid>
          <LyokoWindow
            title={t('hero.identityWindow')}
            accent={CARTHAGE}
            leftLabel={Bio.location}
            rightLabel={t('hero.experience', { count: Bio.expYears })}
          >
            <Profile>
              <Name>{Bio.name}</Name>
              <Headline>{t('content:bio.title')}</Headline>
              <Facts>
                <dt>{t('hero.roles')}</dt>
                <dd>
                  <Roles>
                    {roles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </Roles>
                </dd>
              </Facts>
              <About>
                {description.map((sentence, index) => (
                  <p key={index}>{sentence}</p>
                ))}
              </About>
              <Contact>
                <ContactLead>{t('hero.contactLead')}</ContactLead>
                <CtaRow>
                  <CtaButton href={`mailto:${Bio.email}`}>{t('hero.cta')}</CtaButton>
                  <LinkPill href={Bio.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </LinkPill>
                </CtaRow>
                <MailLink href={`mailto:${Bio.email}`}>
                  {t('hero.channel', { email: Bio.email })}
                </MailLink>
              </Contact>
            </Profile>
          </LyokoWindow>

          <CardWindow title={t('hero.cardWindow')} accent={CARTHAGE}>
            <CardLink href="#intro" title={t('hero.cardCaption')}>
              <LyokoCard
                src={LyokoCardImg}
                alt={t('hero.cardAlt', { name: Bio.name })}
              />
              <CardCaption>{t('hero.cardCaption')}</CardCaption>
            </CardLink>
          </CardWindow>
        </HeroGrid>
      </HeroContainer>
    </div>
  );
};

export default Hero;
