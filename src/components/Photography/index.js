/**
 * @file src/components/Photography/index.js
 * Photography section (Desert territory): 3/2/1-column grid fed by `photography[]`
 * from content.js.
 * @component
 */
import React from 'react';
import styled from 'styled-components';
import { photography } from '../../data/content';
import BeforeAfterCard from './BeforeAfterCard';
import { DESERT } from '../../utils/palette';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 30px 80px;
  background: radial-gradient(ellipse at 50% 30%, rgba(232, 150, 10, 0.08) 0%, transparent 70%);
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
  color: ${DESERT};
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
    background: ${DESERT};
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
    background: ${DESERT};
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
  margin-bottom: 48px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: start;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const PhotoCard = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: ${({ theme }) => theme.card};
  cursor: pointer;
  border: 1px solid rgba(232, 150, 10, 0.35);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    border-color: rgba(232, 150, 10, 0.75);
    box-shadow: 0 0 20px rgba(232, 150, 10, 0.22), inset 0 0 20px rgba(232, 150, 10, 0.04);
  }
  &:hover img {
    transform: scale(1.05);
  }
  &:hover > div:last-child {
    opacity: 1;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(50, 20, 0, 0.78) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 16px;
`;

const PhotoTitle = styled.span`
  font-family: 'Courier New', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(232, 150, 10, 0.9);
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(20, 8, 0, 0.82);
  color: rgba(232, 150, 10, 0.9);
  font-family: 'Courier New', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 3px 9px;
  border: 1px solid rgba(232, 150, 10, 0.45);
  border-radius: 2px;
  z-index: 4;
`;

const Empty = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  padding: 60px 0;
`;

/**
 * An entry with `before` renders as a BeforeAfterCard, otherwise as a plain card with
 * a category badge and a title on hover. Shows a placeholder when the list is empty.
 * @component
 * @returns {JSX.Element}
 */
const Photography = () => (
  <Container id="photography">
    <Wrapper>
      <TerritoryTag>Sector 4 — Desert</TerritoryTag>
      <Title>Superscan</Title>
      <Desc>A selection of edits I am proud of.</Desc>
      {photography.length === 0 ? (
        <Empty>No activated tower detected. Superscan in progress…</Empty>
      ) : (
        <Grid>
          {photography.map((photo) =>
            photo.before ? (
              <BeforeAfterCard
                key={photo.id}
                before={photo.before}
                after={photo.after}
                title={photo.title}
              />
            ) : (
              <PhotoCard key={photo.id}>
                <Photo src={photo.image} alt={photo.title} />
                <CategoryBadge>{photo.category}</CategoryBadge>
                <Overlay>
                  <PhotoTitle>{photo.title}</PhotoTitle>
                </Overlay>
              </PhotoCard>
            )
          )}
        </Grid>
      )}
    </Wrapper>
  </Container>
);

export default Photography;
