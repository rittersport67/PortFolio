/**
 * @file src/components/Cards/ExperienceCards.js
 * Card for one Experience timeline entry: a job or a degree.
 * The tint comes from the transient `$edu` prop (Forest for a job, Ice for a degree).
 * @component
 */
import React from 'react';
import styled from 'styled-components';
import { FOREST, ICE } from '../../utils/palette';

/* Degree cards share the same structure; only the tint changes */
const accent = ({ $edu }) => ($edu ? ICE : FOREST);
const accentRgb = ({ $edu }) => ($edu ? '75, 167, 209' : '90, 191, 78');

const Card = styled.div`
    position: relative;
    --accent: ${accent};
    --accent-rgb: ${accentRgb};
    width: 100%;
    max-width: 650px;
    background: rgba(0, 8, 24, 0.88);
    border: 1px solid rgba(var(--accent-rgb), 0.35);
    border-radius: 4px;
    padding: 12px 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
    overflow: hidden;

    &:hover {
        border-color: rgba(var(--accent-rgb), 0.7);
        box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.2), inset 0 0 20px rgba(var(--accent-rgb), 0.03);
    }

    &:hover ${/* sc-selector trick — utilise le data-attr */ 'span[data-clamp]'} {
        overflow: visible;
        -webkit-line-clamp: unset;
    }

    @media only screen and (max-width: 768px) {
        padding: 10px 14px;
        gap: 6px;
    }
`

const Top = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    gap: 12px;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(var(--accent-rgb), 0.15);
`

const ImageWrapper = styled.div`
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    border: 1px solid rgba(var(--accent-rgb), 0.4);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 768px) {
        width: 36px;
        height: 36px;
    }
`

const Image = styled.img`
    max-width: 34px;
    max-height: 34px;
    width: auto;
    height: auto;
    object-fit: contain;
    @media only screen and (max-width: 768px) {
        max-width: 28px;
        max-height: 28px;
    }
`

const Body = styled.div`
    width: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
`

/* Company and dates side by side: keeps the card short and wide */
const Meta = styled.div`
    display: flex;
    align-items: baseline;
    gap: 12px;
    flex-wrap: wrap;
`

const Role = styled.div`
    font-family: 'Courier New', monospace;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #e8ffe5;
    @media only screen and (max-width: 768px) {
        font-size: 12px;
    }
`

const Company = styled.div`
    font-family: 'Courier New', monospace;
    font-size: 13px;
    font-weight: 500;
    color: rgba(var(--accent-rgb), 0.75);
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
    color: rgba(var(--accent-rgb), 0.45);
    letter-spacing: 0.06em;
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
    line-height: 1.5;
    color: rgba(200, 230, 205, 0.75);
    @media only screen and (max-width: 768px) {
        font-size: 11px;
    }
`

const Span = styled.span`
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
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
    gap: 8px;
    margin-top: 2px;
    flex-wrap: wrap;
`

const SkillsLabel = styled.b`
    font-family: 'Courier New', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(var(--accent-rgb), 0.55);
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
    color: rgba(var(--accent-rgb), 0.8);
    border: 1px solid rgba(var(--accent-rgb), 0.3);
    border-radius: 2px;
    padding: 2px 8px;
    background: rgba(var(--accent-rgb), 0.04);
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

/**
 * The logo, skill list and document link render only when provided.
 * @component
 * @param {Object} props
 * @param {Object} props.experience - Entry normalized by Experience: a degree already
 *   has `degree` → `role` and `school` → `company`.
 * @param {'work'|'education'} props.experience.kind - Picks the card tint.
 * @param {string} props.experience.role
 * @param {string} props.experience.company
 * @param {string} props.experience.date - Period, displayed as is.
 * @param {string} props.experience.desc
 * @param {string} [props.experience.img] - Logo URL.
 * @param {string[]} [props.experience.skills]
 * @param {string} [props.experience.doc] - URL of an attached document.
 * @returns {JSX.Element}
 */
const ExperienceCards = ({ experience }) => {
  const isEducation = experience.kind === 'education';

  return (
    <Card $edu={isEducation}>
      <Top>
        {experience.img && (
          <ImageWrapper>
            <Image src={experience.img} alt={experience.company} />
          </ImageWrapper>
        )}
        <Body>
          <Role>{experience.role}</Role>
          <Meta>
            <Company>{experience.company}</Company>
            <Date>{experience.date}</Date>
          </Meta>
        </Body>
      </Top>
      <Desc>
        <Span>{experience.desc}</Span>
        {experience?.skills && (
          <>
            <br />
            <Skills>
              <SkillsLabel>Abilities:</SkillsLabel>
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
