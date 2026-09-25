/**
 * @file src/components/Projects/index.js
 * Personal Project section (Mountain territory): grid of project cards filterable
 * by category, fed by `projects[]` from content.js.
 * @component
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import { projects } from '../../data/content';
import { MOUNTAIN } from '../../utils/palette';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 30px 80px;
  background: radial-gradient(ellipse at 50% 0%, rgba(123, 78, 168, 0.09) 0%, transparent 65%);
  @media (max-width: 960px) {
    padding: 40px 16px 60px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;
`;

const TerritoryTag = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: ${MOUNTAIN};
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
    background: ${MOUNTAIN};
    opacity: 0.5;
  }
`;

const Title = styled.div`
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  position: relative;

  &::after {
    content: '';
    display: block;
    margin: 6px auto 0;
    width: 36px;
    height: 2px;
    background: ${MOUNTAIN};
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  color: rgba(177, 178, 179, 0.85);
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 36px;
`;

const FilterBtn = styled.button`
  font-family: 'Courier New', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  border: 1px solid ${({ active }) => (active ? MOUNTAIN : 'rgba(155, 112, 200, 0.3)')};
  background: ${({ active }) => (active ? `${MOUNTAIN}22` : 'transparent')};
  color: ${({ active }) => (active ? MOUNTAIN : 'rgba(177,178,179,0.7)')};

  &:hover {
    border-color: ${MOUNTAIN};
    color: ${MOUNTAIN};
    box-shadow: 0 0 8px ${MOUNTAIN}55;
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

const Card = styled.div`
  position: relative;
  background: rgba(0, 6, 18, 0.8);
  border: 1px solid rgba(155, 112, 200, 0.25);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s, box-shadow 0.25s;

  &::before {
    content: '';
    position: absolute;
    top: -1px; left: -1px;
    width: 16px; height: 16px;
    border-top: 2px solid ${MOUNTAIN};
    border-left: 2px solid ${MOUNTAIN};
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -1px; right: -1px;
    width: 16px; height: 16px;
    border-bottom: 2px solid ${MOUNTAIN};
    border-right: 2px solid ${MOUNTAIN};
  }

  &:hover {
    border-color: rgba(155, 112, 200, 0.6);
    box-shadow: 0 0 20px rgba(155, 112, 200, 0.12);
  }
`;

const CardImg = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-bottom: 1px solid rgba(155, 112, 200, 0.2);
`;

const CardBody = styled.div`
  padding: 14px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardTitle = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_primary};
`;

const CardDate = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: rgba(155, 112, 200, 0.7);
  letter-spacing: 0.1em;
`;

const CardDesc = styled.div`
  font-size: 13px;
  line-height: 1.6;
  color: rgba(177, 178, 179, 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 8px;
`;

const Tag = styled.span`
  font-family: 'Courier New', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(155, 112, 200, 0.85);
  background: rgba(155, 112, 200, 0.08);
  border: 1px solid rgba(155, 112, 200, 0.25);
  padding: 2px 7px;
  border-radius: 2px;
`;

const LinkRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 16px 14px;
`;

const LinkBtn = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 0;
  font-family: 'Courier New', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${MOUNTAIN};
  border: 1px solid rgba(155, 112, 200, 0.35);
  border-radius: 2px;
  background: rgba(155, 112, 200, 0.05);
  transition: background 0.2s, box-shadow 0.2s;

  &:hover {
    background: rgba(155, 112, 200, 0.15);
    box-shadow: 0 0 10px rgba(155, 112, 200, 0.3);
  }
`;

/* Filters computed once at load: 'all' followed by each distinct category */
const CATEGORIES = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

/**
 * Shows at most 5 tags per card, and the GitHub / Live links only when they exist.
 * `description` is rendered as HTML, so it must only come from content.js.
 * @component
 * @returns {JSX.Element}
 */
const Projects = () => {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <Container id="projects">
      <Wrapper>
        <TerritoryTag>Sector 3 — Mountain</TerritoryTag>
        <Title>Programs</Title>
        <Desc>Programs coded from the lab.</Desc>
        <FilterRow>
          {CATEGORIES.map((cat) => (
            <FilterBtn key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
              {cat === 'all' ? 'all sectors' : cat}
            </FilterBtn>
          ))}
        </FilterRow>
        <Grid>
          {visible.map((project) => (
            <Card key={project.id}>
              <CardImg src={project.image} alt={project.title} />
              <CardBody>
                <CardTitle>{project.title}</CardTitle>
                <CardDate>{project.date}</CardDate>
                <CardDesc dangerouslySetInnerHTML={{ __html: project.description }} />
                <Tags>
                  {project.tags.slice(0, 5).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>
              </CardBody>
              <LinkRow>
                {project.github && (
                  <LinkBtn href={project.github} target="_blank" rel="noreferrer">
                    GitHub
                  </LinkBtn>
                )}
                {project.webapp && (
                  <LinkBtn href={project.webapp} target="_blank" rel="noreferrer">
                    Live
                  </LinkBtn>
                )}
              </LinkRow>
            </Card>
          ))}
        </Grid>
      </Wrapper>
    </Container>
  );
};

export default Projects;
