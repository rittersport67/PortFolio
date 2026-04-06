import React from 'react';
import styled, { keyframes } from 'styled-components';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { experiences } from '../../data/contants';
import ExperienceCards from '../Cards/ExperienceCards';

const pulse = keyframes`
    0%   { box-shadow: 0 0 0 0 rgba(0,212,255,0.6), 0 0 6px rgba(0,212,255,0.4); }
    70%  { box-shadow: 0 0 0 8px rgba(0,212,255,0), 0 0 6px rgba(0,212,255,0.4); }
    100% { box-shadow: 0 0 0 0 rgba(0,212,255,0), 0 0 6px rgba(0,212,255,0.4); }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 40px 0px 80px 0px;
    background: radial-gradient(ellipse at 50% 0%, rgba(90, 191, 78, 0.08) 0%, transparent 65%);
    @media (max-width: 960px) {
        padding: 0px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 80px 0;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

/* ── Secteur 2 / Forêt ───────────────────────────────────────────── */
const FOREST = '#5abf4e';

const TerritoryTag = styled.div`
    font-family: 'Courier New', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: ${FOREST};
    opacity: 0.7;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &::before,
    &::after {
        content: '';
        height: 1px;
        width: 36px;
        background: ${FOREST};
        opacity: 0.5;
    }
`;

const Title = styled.div`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    position: relative;

    &::after {
        content: '';
        display: block;
        margin: 6px auto 0;
        width: 36px;
        height: 2px;
        background: ${FOREST};
        box-shadow: 0 0 8px ${FOREST};
        border-radius: 1px;
    }

    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: rgba(177, 178, 179, 0.85);
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const TimelineSection = styled.div`
    width: 100%;
    max-width: 1000px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

/* Point cible — cercle externe + point central */
const DotOuter = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #00d4ff;
    background: rgba(0, 8, 24, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${pulse} 2.5s ease-out infinite;
    flex-shrink: 0;
`

const DotInner = styled.div`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00d4ff;
    box-shadow: 0 0 6px #00d4ff;
`

const Experience = () => {
  return (
    <Container id="experience">
      <Wrapper>
        <TerritoryTag>◈ Secteur 2 — Forêt</TerritoryTag>
        <Title>Experiences</Title>
        <Desc>Here are an extract of my experiences.</Desc>
        <TimelineSection>
          <Timeline>
            {experiences.map((experience, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  {/* Remplace TimelineDot MUI par notre cible HUD */}
                  <TimelineDot
                    sx={{
                      padding: 0,
                      margin: '8px 0',
                      border: 'none',
                      background: 'transparent',
                      boxShadow: 'none',
                    }}
                  >
                    <DotOuter>
                      <DotInner />
                    </DotOuter>
                  </TimelineDot>
                  {index !== experiences.length - 1 && (
                    <TimelineConnector
                      sx={{
                        background: 'linear-gradient(to bottom, rgba(0,212,255,0.6), rgba(0,212,255,0.15))',
                        width: '2px',
                      }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <ExperienceCards experience={experience} />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineSection>
      </Wrapper>
    </Container>
  );
};

export default Experience;
