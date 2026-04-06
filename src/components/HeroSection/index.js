import React from 'react';
import styled from 'styled-components';
import { Bio } from '../../data/contants.js';
import TypeWriter from 'typewriter-effect';
import HeroImg from '../../img/hero-pp.jpg';

/* ─── Secteur 5 / Carthage ──────────────────────────────────────── */
const CARTHAGE = '#00d4ff';

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

  /* fond Sector 5 : grille cartésienne + radial deep-blue */
  background:
    linear-gradient(rgba(0, 212, 255, 0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.022) 1px, transparent 1px),
    radial-gradient(ellipse at 60% 30%, rgba(0, 26, 255, 0.13) 0%, transparent 55%),
    radial-gradient(ellipse at 15% 75%, rgba(0, 212, 255, 0.07) 0%, transparent 40%),
    #000814;
  background-size: 40px 40px, 40px 40px, 100% 100%, 100% 100%, 100% 100%;

  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640px) {
    padding: 32px 16px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
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

  @media (max-width: 960px) {
    flex-direction: column;
  }
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
  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

/* ─── textes ─────────────────────────────────────────────────────── */
const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

/* nom propre en gradient cyan/bleu */
const NameHighlight = styled.span`
  background: linear-gradient(90deg, #00d4ff 0%, #6eb5ff 55%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 14px rgba(0, 212, 255, 0.35));
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const SubTitle = styled.div`
  font-size: 17px;
  line-height: 30px;
  margin-bottom: 42px;
  color: rgba(242, 243, 244, 0.7);
  border-left: 2px solid rgba(0, 212, 255, 0.35);
  padding-left: 16px;

  p {
    margin-bottom: 6px;
  }
  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 960px) {
    text-align: center;
    border-left: none;
    padding-left: 0;
    border-top: 1px solid rgba(0, 212, 255, 0.2);
    padding-top: 16px;
  }
  @media (max-width: 640px) {
    font-size: 15px;
    line-height: 26px;
  }
`;

/* ─── bouton HUD — style panneau Jérémie ─────────────────────────── */
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

  /* coins HUD */
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: 12px;
    height: 12px;
    border-top: 2px solid #00d4ff;
    border-left: 2px solid #00d4ff;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    right: -3px;
    width: 12px;
    height: 12px;
    border-bottom: 2px solid #00d4ff;
    border-right: 2px solid #00d4ff;
  }
  &:hover {
    background: rgba(0, 212, 255, 0.14);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    color: #fff;
  }
  @media (max-width: 640px) {
    font-size: 11px;
    padding: 11px 0;
  }
`;

/* ─── photo ──────────────────────────────────────────────────────── */
const ImgFrame = styled.div`
  position: relative;
  display: inline-block;

  /* coins HUD autour de la photo */
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    width: 28px;
    height: 28px;
    border-top: 2px solid #00d4ff;
    border-left: 2px solid #00d4ff;
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 28px;
    height: 28px;
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

  @media (max-width: 960px) {
    width: 340px;
    height: 340px;
  }
  @media (max-width: 640px) {
    width: 260px;
    height: 260px;
  }
`;

const Hero = () => {
  return (
    <div id="about">
      <HeroContainer>
        <HeroBg />
        <HeroInnerContainer>
          <HeroLeftContainer>
            <SectorTag>◈ Secteur 5 — Carthage</SectorTag>
            <Title>
              Hi, I am <br />
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
};

export default Hero;
