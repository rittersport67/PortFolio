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

const Title = styled.div`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
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
    <Container>
      <Wrapper>
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
