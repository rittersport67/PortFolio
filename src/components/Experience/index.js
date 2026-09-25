/**
 * @file src/components/Experience/index.js
 * Section Experience & Education (territoire Forêt) : expériences et formations
 * sur une seule timeline MUI Lab (@mui/lab), du plus récent au plus ancien.
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

/* Point carré pour les jalons de formation, afin de les distinguer sur le rail */
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

/* La timeline est à deux colonnes (formation à gauche, expérience à droite) à
   partir de 960px. En dessous, tout retombe dans une seule colonne à droite du
   rail — MUI ne sait pas le faire en CSS seul, d'où le matchMedia. */
/**
 * Suit la media query `(min-width: 960px)` et se met à jour au redimensionnement.
 * @returns {boolean} true si la fenêtre fait au moins 960px de large.
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

/* Expériences et formations sur un seul rail, du plus récent au plus ancien */
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
 * Sur deux colonnes, la formation est à gauche du rail et l'expérience à droite ;
 * sur une colonne, tout est à droite. Les jalons de formation ont un point carré bleu.
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
          {/* On neutralise le ::before de MUI : chaque ligne rend elle-même ses
              deux colonnes, sinon le rail se décale d'une ligne à l'autre. */}
          <Timeline
            sx={{
              /* sans cela le Timeline se rétracte à la largeur de son contenu */
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
                  {/* Sur deux colonnes, la formation passe à gauche du rail.
                      La colonne reste rendue même vide pour garder le rail droit. */}
                  {twoColumns && (
                    <TimelineOppositeContent
                      sx={{
                        flex: 1,
                        py: '12px',
                        px: 2,
                        /* MUI aligne à droite par défaut : les deux colonnes
                           doivent se lire de la même façon */
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
