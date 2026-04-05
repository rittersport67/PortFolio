import React from 'react';
import styled from 'styled-components';
import { photography } from '../../data/contants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 30px 80px;
  @media (max-width: 960px) {
    padding: 40px 16px 60px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;
`;

const Title = styled.div`
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 48px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const PhotoCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.card};
  cursor: pointer;
  &:hover img {
    transform: scale(1.05);
  }
  &:hover div {
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
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 16px;
`;

const PhotoTitle = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ theme }) => theme.primary}cc;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
`;

const Empty = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  padding: 60px 0;
`;

const Photography = () => (
  <Container id="photography">
    <Wrapper>
      <Title>Photography</Title>
      <Desc>A selection of edits I am proud of.</Desc>
      {photography.length === 0 ? (
        <Empty>Coming soon — photos will appear here.</Empty>
      ) : (
        <Grid>
          {photography.map((photo) => (
            <PhotoCard key={photo.id}>
              <Photo src={photo.image} alt={photo.title} />
              <CategoryBadge>{photo.category}</CategoryBadge>
              <Overlay>
                <PhotoTitle>{photo.title}</PhotoTitle>
              </Overlay>
            </PhotoCard>
          ))}
        </Grid>
      )}
    </Wrapper>
  </Container>
);

export default Photography;
