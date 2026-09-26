/**
 * @file src/components/Photography/index.js
 * Photography section (Desert territory): 3/2/1-column grid fed by `photography[]`
 * from content.js.
 * @component
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../SectionHeader';
import { photography } from '../../data/content';
import BeforeAfterCard from './BeforeAfterCard';
import { DESERT } from '../../utils/palette';
import {
  alpha,
  DESERT_SHADOW,
  DESERT_PANEL
} from '../../utils/colors';
import { FONT_MONO } from '../../utils/fonts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 30px 80px;
  background: radial-gradient(
    ellipse at 50% 30%,
    ${alpha(DESERT, 0.08)} 0%,
    transparent 70%
  );
  @media (max-width: 960px) {
    padding: 40px 16px 60px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;
`;

const Header = styled(SectionHeader)`
  margin-bottom: 48px;
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
  border: 1px solid ${alpha(DESERT, 0.35)};
  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    border-color: ${alpha(DESERT, 0.75)};
    box-shadow:
      0 0 20px ${alpha(DESERT, 0.22)},
      inset 0 0 20px ${alpha(DESERT, 0.04)};
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
  background: linear-gradient(
    to top,
    ${alpha(DESERT_SHADOW, 0.78)} 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 16px;
`;

const PhotoTitle = styled.span`
  font-family: ${FONT_MONO};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${alpha(DESERT, 0.9)};
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${alpha(DESERT_PANEL, 0.82)};
  color: ${alpha(DESERT, 0.9)};
  font-family: ${FONT_MONO};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 3px 9px;
  border: 1px solid ${alpha(DESERT, 0.45)};
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
const Photography = () => {
  const { t } = useTranslation();

  return (
  <Container id="photography">
    <Wrapper>
      <Header
        sector={t('photography.sector')}
        title={t('photography.title')}
        accent={DESERT}
      >
        {t('photography.description')}
      </Header>
      {photography.length === 0 ? (
        <Empty>{t('photography.empty')}</Empty>
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
                <CategoryBadge>{t(`content:photoCategories.${photo.category}`)}</CategoryBadge>
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
};

export default Photography;
