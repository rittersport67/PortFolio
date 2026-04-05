import React from 'react';
import styled, { keyframes } from 'styled-components';

const scanline = keyframes`
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(400%); }
`;

const Card = styled.div`
    position: relative;
    width: 650px;
    background: rgba(0, 8, 24, 0.88);
    border: 1px solid rgba(0, 212, 255, 0.35);
    border-radius: 4px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
    overflow: hidden;

    /* ligne de scan animée — subtile */
    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 30%;
        background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 212, 255, 0.03),
            transparent
        );
        animation: ${scanline} 6s linear infinite;
        pointer-events: none;
        z-index: 0;
    }

    /* coin supérieur droit */
    &::after {
        content: '';
        position: absolute;
        top: -2px;
        right: -2px;
        width: 16px;
        height: 16px;
        border-top: 2px solid #00d4ff;
        border-right: 2px solid #00d4ff;
        pointer-events: none;
    }

    &:hover {
        border-color: rgba(0, 212, 255, 0.7);
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.03);
    }

    &:hover ${/* sc-selector trick — utilise le data-attr */ 'span[data-clamp]'} {
        overflow: visible;
        -webkit-line-clamp: unset;
    }

    @media only screen and (max-width: 768px) {
        padding: 12px 14px;
        gap: 8px;
        width: 300px;
    }
`

const CornerBL = styled.span`
    position: absolute;
    bottom: -2px;
    left: -2px;
    width: 16px;
    height: 16px;
    border-bottom: 2px solid #00d4ff;
    border-left: 2px solid #00d4ff;
    pointer-events: none;
    z-index: 1;
`

const Top = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 212, 255, 0.15);
`

const ImageWrapper = styled.div`
    flex-shrink: 0;
    width: 52px;
    height: 52px;
    border: 1px solid rgba(0, 212, 255, 0.4);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
    @media only screen and (max-width: 768px) {
        width: 40px;
        height: 40px;
    }
`

const Image = styled.img`
    max-width: 44px;
    max-height: 44px;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.5));
    @media only screen and (max-width: 768px) {
        max-width: 34px;
        max-height: 34px;
    }
`

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
`

const Role = styled.div`
    font-family: 'Courier New', monospace;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #e0f7ff;
    @media only screen and (max-width: 768px) {
        font-size: 12px;
    }
`

const Company = styled.div`
    font-family: 'Courier New', monospace;
    font-size: 13px;
    font-weight: 500;
    color: rgba(0, 212, 255, 0.75);
    &::before {
        content: '// ';
        opacity: 0.5;
    }
    @media only screen and (max-width: 768px) {
        font-size: 11px;
    }
`

const Date = styled.div`
    font-family: 'Courier New', monospace;
    font-size: 11px;
    color: rgba(0, 212, 255, 0.45);
    letter-spacing: 0.06em;
    &::before {
        content: '▸ ';
    }
    @media only screen and (max-width: 768px) {
        font-size: 10px;
    }
`

const Desc = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.6;
    color: rgba(200, 230, 255, 0.75);
    @media only screen and (max-width: 768px) {
        font-size: 11px;
    }
`

const Span = styled.span`
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;

    ${Card}:hover & {
        overflow: visible;
        -webkit-line-clamp: unset;
    }
`

const Skills = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-top: 4px;
    flex-wrap: wrap;
`

const SkillsLabel = styled.b`
    font-family: 'Courier New', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(0, 212, 255, 0.55);
    padding-top: 2px;
    flex-shrink: 0;
`

const ItemWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`

const Skill = styled.div`
    font-family: 'Courier New', monospace;
    font-size: 10px;
    letter-spacing: 0.05em;
    color: rgba(0, 212, 255, 0.8);
    border: 1px solid rgba(0, 212, 255, 0.3);
    border-radius: 2px;
    padding: 2px 8px;
    background: rgba(0, 212, 255, 0.04);
    @media only screen and (max-width: 768px) {
        font-size: 9px;
    }
`

const Document = styled.img`
    display: none;
    height: 70px;
    width: fit-content;
    background-color: #000;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`

const ExperienceCards = ({ experience }) => {
  return (
    <Card>
      <CornerBL />
      <Top>
        <ImageWrapper>
          <Image src={experience.img} />
        </ImageWrapper>
        <Body>
          <Role>{experience.role}</Role>
          <Company>{experience.company}</Company>
          <Date>{experience.date}</Date>
        </Body>
      </Top>
      <Desc>
        <Span>{experience.desc}</Span>
        {experience?.skills && (
          <>
            <br />
            <Skills>
              <SkillsLabel>Skills:</SkillsLabel>
              <ItemWrapper>
                {experience.skills.map((skill) => (
                  <Skill key={skill}>{skill}</Skill>
                ))}
              </ItemWrapper>
            </Skills>
          </>
        )}
      </Desc>
      {experience.doc && (
        <a href={experience.doc} target='new'>
          <Document />
        </a>
      )}
    </Card>
  );
};

export default ExperienceCards;
