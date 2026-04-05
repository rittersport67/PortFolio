import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Bio } from '../../data/contants';
import { FaGithub, FaLinkedin, FaSoundcloud } from 'react-icons/fa';

const waveScroll = keyframes`
  0%   { background-position: 0 0,   60px 10px, 130px 20px; }
  100% { background-position: 200px 0, 260px 10px, 330px 20px; }
`;

const hexPulse = keyframes`
  0%, 100% { opacity: 0.04; }
  50%       { opacity: 0.09; }
`;

const Sea = styled.footer`
  width: 100%;
  min-height: 260px;
  background-color: #020810;
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
  animation: ${waveScroll} 8s linear infinite;
  background-image:
    repeating-linear-gradient(
      -12deg,
      transparent 0px, transparent 18px,
      rgba(10, 74, 255, 0.18) 18px, rgba(10, 74, 255, 0.18) 20px
    ),
    repeating-linear-gradient(
      -8deg,
      transparent 0px, transparent 28px,
      rgba(0, 150, 255, 0.10) 28px, rgba(0, 150, 255, 0.10) 30px
    ),
    repeating-linear-gradient(
      -4deg,
      transparent 0px, transparent 40px,
      rgba(0, 200, 255, 0.06) 40px, rgba(0, 200, 255, 0.06) 42px
    );
`;

const HexGrid = styled.div`
  position: absolute;
  inset: 0;
  animation: ${hexPulse} 4s ease-in-out infinite;
  background-image:
    linear-gradient(rgba(10, 74, 255, 1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(10, 74, 255, 1) 1px, transparent 1px);
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
    rgba(10, 74, 255, 0.22) 0%,
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
  color: rgba(100, 160, 255, 0.6);
  margin: 0;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const SocialLink = styled.a`
  color: rgba(100, 170, 255, 0.55);
  font-size: 22px;
  transition: color 0.25s ease, transform 0.25s ease;
  &:hover {
    color: #5aafff;
    transform: translateY(-3px);
  }
`;

const Copyright = styled.p`
  font-size: 12px;
  color: rgba(100, 150, 255, 0.35);
  margin: 0;
  letter-spacing: 1px;
`;

const DigitalSea = () => (
  <Sea>
    <Waves />
    <HexGrid />
    <DepthGlow />
    <Content>
      <SeaTitle>Digital Sea</SeaTitle>
      <SocialRow>
        <SocialLink href={Bio.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <FaGithub />
        </SocialLink>
        <SocialLink href={Bio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </SocialLink>
        <SocialLink href="https://soundcloud.com" target="_blank" rel="noreferrer" aria-label="SoundCloud">
          <FaSoundcloud />
        </SocialLink>
      </SocialRow>
      <Copyright>© {new Date().getFullYear()} Sébastien RITTER</Copyright>
    </Content>
  </Sea>
);

export default DigitalSea;
