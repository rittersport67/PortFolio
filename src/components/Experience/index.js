/**
 * @file src/components/Experience/index.js
 * Experience & Education section (Forest territory): jobs and degrees on a single
 * MUI Lab (@mui/lab) timeline, newest first.
 * @component
 */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { experiences, education } from '../../data/content';
import ExperienceCards from '../Cards/ExperienceCards';
import { FOREST, ICE } from '../../utils/palette';

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

    @media (min-width: 960px) {
        max-width: 1350px;
    }
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

const DotOuter = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid ${FOREST};
    background: rgba(0, 8, 24, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`

const DotInner = styled.div`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${FOREST};
`

/* Square dot for degree milestones, to tell them apart on the rail */
const DotOuterEdu = styled(DotOuter)`
    border-radius: 3px;
    border-color: ${ICE};
`

const DotInnerEdu = styled(DotInner)`
    border-radius: 1px;
    background: ${ICE};
`

const Legend = styled.div`
    display: flex;
    gap: 24px;
    justify-content: center;
    flex-wrap: wrap;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(177, 178, 179, 0.85);
`

const LegendItem = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
        content: '';
        width: 9px;
        height: 9px;
        border-radius: ${({ square }) => (square ? '2px' : '50%')};
        background: ${({ square }) => (square ? ICE : FOREST)};
    }
`

/* The timeline has two columns (degrees on the left, jobs on the right) from
   960px up. Below that, everything falls back to a single column right of the
   rail — MUI can't do this in CSS alone, hence the matchMedia. */
/**
 * Tracks the `(min-width: 960px)` media query and updates on resize.
 * @returns {boolean} true when the window is at least 960px wide.
 */
const useTwoColumns = () => {
  const [twoColumns, setTwoColumns] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 960px)').matches
  );

  useEffect(() => {
    const query = window.matchMedia('(min-width: 960px)');
    const onChange = (event) => setTwoColumns(event.matches);
    query.addEventListener('change', onChange);
    setTwoColumns(query.matches);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return twoColumns;
};

/* Jobs and degrees on a single rail, newest first */
const timeline = [
  ...experiences.map((item) => ({ ...item, kind: 'work' })),
  ...education.map((item) => ({
    ...item,
    kind: 'education',
    role: item.degree,
    company: item.school
  }))
].sort((a, b) => b.start.localeCompare(a.start));

/**
 * On two columns, degrees sit left of the rail and jobs on the right; on one column
 * everything is on the right. Degree milestones get a blue square dot.
 * @component
 * @returns {JSX.Element}
 */
const Experience = () => {
  const twoColumns = useTwoColumns();

  return (
    <Container id="experience">
      <Wrapper>
        <TerritoryTag>Sector 2 — Forest</TerritoryTag>
        <Title>Missions &amp; Kadic</Title>
        <Desc>Every mission logged by the supercomputer.</Desc>
        <Legend>
          <LegendItem>Missions</LegendItem>
          <LegendItem square>Kadic Academy</LegendItem>
        </Legend>
        <TimelineSection>
          {/* Disable MUI's ::before: each row renders its own two columns,
              otherwise the rail shifts from one row to the next. */}
          <Timeline
            sx={{
              /* without this the Timeline shrinks to the width of its content */
              width: '100%',
              padding: 0,
              '& .MuiTimelineItem-root::before': { display: 'none' },
            }}
          >
            {timeline.map((entry, index) => {
              const isEducation = entry.kind === 'education';
              const card = <ExperienceCards experience={entry} />;

              return (
                <TimelineItem key={`${entry.kind}-${entry.id}`}>
                  {/* On two columns, degrees move to the left of the rail.
                      The column is rendered even when empty to keep the rail straight. */}
                  {twoColumns && (
                    <TimelineOppositeContent
                      sx={{
                        flex: 1,
                        py: '12px',
                        px: 2,
                        /* MUI right-aligns by default: both columns
                           should read the same way */
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {isEducation && card}
                    </TimelineOppositeContent>
                  )}
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{
                        padding: 0,
                        margin: '8px 0',
                        border: 'none',
                        background: 'transparent',
                        boxShadow: 'none',
                      }}
                    >
                      {isEducation ? (
                        <DotOuterEdu>
                          <DotInnerEdu />
                        </DotOuterEdu>
                      ) : (
                        <DotOuter>
                          <DotInner />
                        </DotOuter>
                      )}
                    </TimelineDot>
                    {index !== timeline.length - 1 && (
                      <TimelineConnector
                        sx={{
                          background: 'linear-gradient(to bottom, rgba(90,191,78,0.6), rgba(90,191,78,0.15))',
                          width: '2px',
                        }}
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent sx={{ flex: 1, py: '12px', px: 2 }}>
                    {(!twoColumns || !isEducation) && card}
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </TimelineSection>
      </Wrapper>
    </Container>
  );
};

export default Experience;
