/**
 * @file src/components/Projects/index.js
 * Personal Project section (Mountain territory): grid of Lyoko windows filterable
 * by category, fed by `projects[]` from content.js.
 * @component
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../SectionHeader';
import { projects } from '../../data/content';
import { MOUNTAIN } from '../../utils/palette';
import LyokoWindow from '../Cards/LyokoWindow';
import {
  alpha,
  BLACK,
  WHITE,
  MOUNTAIN_DEEP,
  TEXT_SECONDARY,
  WINDOW_TEXT,
  WINDOW_TEXT_SOFT,
  WINDOW_HEADING,
  WINDOW_PANEL_BORDER,
  WINDOW_PILL,
  WINDOW_PILL_TEXT,
} from '../../utils/colors';
import { FONT_MONO, FONT_WINDOW } from '../../utils/fonts';
import { monthsBetween, formatDuration, formatPeriod } from '../../utils/period';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 30px 80px;
  background: radial-gradient(ellipse at 50% 0%, ${alpha(MOUNTAIN_DEEP, 0.09)} 0%, transparent 65%);
  @media (max-width: 960px) {
    padding: 40px 16px 60px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;
`;

const Header = styled(SectionHeader)`
  margin-bottom: 40px;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 36px;
`;

const FilterBtn = styled.button`
  font-family: ${FONT_MONO};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  border: 1px solid ${({ active }) => (active ? MOUNTAIN : alpha(MOUNTAIN, 0.3))};
  background: ${({ active }) => (active ? alpha(MOUNTAIN, 0.13) : 'transparent')};
  color: ${({ active }) => (active ? MOUNTAIN : alpha(TEXT_SECONDARY, 0.7))};

  &:hover {
    border-color: ${MOUNTAIN};
    color: ${MOUNTAIN};
    box-shadow: 0 0 8px ${alpha(MOUNTAIN, 0.33)};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

/* Fills the window panel so the links line up at the bottom of each grid row */
const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: ${FONT_MONO};
  font-size: 13px;
  line-height: 1.5;
  color: ${WINDOW_TEXT};
`;

const CardImg = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: 1px solid ${WINDOW_PANEL_BORDER};
  border-radius: 2px;
`;

const CardTitle = styled.h4`
  font-family: ${FONT_WINDOW};
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${WINDOW_HEADING};
`;

const Category = styled.div`
  margin-top: -6px;
  color: ${WINDOW_TEXT_SOFT};
  text-transform: capitalize;
`;

const CardDesc = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TagList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 2px 16px;
`;

const Tag = styled.li`
  display: flex;
  align-items: baseline;
  gap: 7px;

  &::before {
    content: '';
    flex-shrink: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${MOUNTAIN};
    transform: translateY(-2px);
  }
`;

const LinkRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 4px;
`;

/* Dark pill, like the title-bar pills */
const LinkBtn = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 0;
  font-family: ${FONT_MONO};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${WINDOW_PILL_TEXT};
  background: ${WINDOW_PILL};
  border: 1px solid transparent;
  border-radius: 7px;
  box-shadow: inset 0 1px 1px ${alpha(BLACK, 0.45)};
  transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;

  &:hover {
    color: ${WHITE};
    border-color: ${MOUNTAIN};
    box-shadow: 0 0 10px ${alpha(MOUNTAIN, 0.3)};
  }
`;

/* Filters computed once at load: 'all' followed by each distinct category */
const CATEGORIES = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

/* Period and duration of each project; the gauge compares it to the longest one */
const programs = projects.map((p) => ({ ...p, months: monthsBetween(p.start, p.end) }));
const longest = Math.max(...programs.map((p) => p.months));

/**
 * Shows at most 5 tags per card, and the GitHub / Live links only when they exist.
 * The description (`projects.<key>.description` in content.json) is rendered as HTML,
 * so it must only come from the locale files.
 * @component
 * @returns {JSX.Element}
 */
const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? programs : programs.filter((p) => p.category === filter);

  return (
    <Container id="projects">
      <Wrapper>
        <Header
          sector={t('projects.sector')}
          title={t('projects.title')}
          accent={MOUNTAIN}
        >
          {t('projects.description')}
        </Header>
        <FilterRow>
          {CATEGORIES.map((cat) => (
            <FilterBtn key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
              {cat === 'all' ? t('projects.allSectors') : t(`content:projectCategories.${cat}`)}
            </FilterBtn>
          ))}
        </FilterRow>
        <Grid>
          {visible.map((project) => (
            <LyokoWindow
              key={project.id}
              title={t('projects.window')}
              accent={MOUNTAIN}
              leftLabel={formatPeriod(project.start, project.end)}
              rightLabel={formatDuration(project.months)}
              rightTitle={t('projects.duration')}
              gauge={project.months / longest}
            >
              <Body>
                <CardImg src={project.image} alt={project.title} />
                <CardTitle>{project.title}</CardTitle>
                <Category>{t(`content:projectCategories.${project.category}`)}</Category>
                <CardDesc
                  dangerouslySetInnerHTML={{
                    __html: t(`content:projects.${project.key}.description`)
                  }}
                />
                <Stack>
                  <span>{t('projects.stack')}</span>
                  <TagList>
                    {project.tags.slice(0, 5).map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagList>
                </Stack>
                <LinkRow>
                  {project.github && (
                    <LinkBtn href={project.github} target="_blank" rel="noreferrer">
                      {t('projects.github')}
                    </LinkBtn>
                  )}
                  {project.webapp && (
                    <LinkBtn href={project.webapp} target="_blank" rel="noreferrer">
                      {t('projects.live')}
                    </LinkBtn>
                  )}
                </LinkRow>
              </Body>
            </LyokoWindow>
          ))}
        </Grid>
      </Wrapper>
    </Container>
  );
};

export default Projects;
