/**
 * @file src/components/Cards/ExperienceCards.js
 * Card for one Experience timeline entry, a job or a degree, drawn as a Lyoko
 * window: description and abilities on a single panel, no click needed.
 * The tint comes from the entry kind (Forest for a job, Ice for a degree).
 * @component
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LyokoWindow from './LyokoWindow';
import { FOREST, ICE } from '../../utils/palette';
import {
  alpha,
  BLACK,
  WINDOW_TEXT,
  WINDOW_TEXT_SOFT,
  WINDOW_TEXT_FAINT,
  WINDOW_HEADING,
} from '../../utils/colors';
import { FONT_MONO, FONT_WINDOW } from '../../utils/fonts';

const Window = styled(LyokoWindow)`
    max-width: 650px;
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-family: ${FONT_MONO};
    font-size: 13.5px;
    line-height: 1.5;
    color: ${WINDOW_TEXT};
    @media only screen and (max-width: 768px) {
        font-size: 12.5px;
        gap: 12px;
    }
`

const Identity = styled.div`
    display: flex;
    gap: 14px;
    align-items: flex-start;
`

const LogoWrapper = styled.div`
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border: 1px solid rgba(var(--accent-rgb), 0.45);
    border-radius: 3px;
    background: ${alpha(BLACK, 0.35)};
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 768px) {
        width: 36px;
        height: 36px;
    }
`

const Logo = styled.img`
    max-width: 34px;
    max-height: 34px;
    object-fit: contain;
    @media only screen and (max-width: 768px) {
        max-width: 28px;
        max-height: 28px;
    }
`

const Heading = styled.div`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
`

const Role = styled.h4`
    font-family: ${FONT_WINDOW};
    font-size: 15px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-wrap: balance;
    color: ${WINDOW_HEADING};
    @media only screen and (max-width: 768px) {
        font-size: 12px;
    }
`

const Company = styled.div`
    color: ${WINDOW_TEXT_SOFT};
`

const Via = styled.span`
    color: ${WINDOW_TEXT_FAINT};
`

const Abilities = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const AbilityList = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 2px 18px;
`

const Ability = styled.li`
    display: flex;
    align-items: baseline;
    gap: 7px;

    &::before {
        content: '';
        flex-shrink: 0;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgb(var(--accent-rgb));
        transform: translateY(-2px);
    }
`

/**
 * The logo, `via` and abilities render only when provided.
 * @component
 * @param {Object} props
 * @param {Object} props.experience - Entry localized by Experience: a degree already
 *   has `degree` → `role` and `school` → `company`.
 * @param {'work'|'education'} props.experience.kind - Picks the title and tint.
 * @param {string} props.experience.role
 * @param {string} props.experience.company
 * @param {string} [props.experience.via] - Consulting firm for contracted work.
 * @param {string} props.experience.period - Formatted period, e.g. `'Aug 2023 – Jun 2025'`.
 * @param {string} props.experience.duration - Formatted duration, e.g. `'1 yr 11 mo'`.
 * @param {number} props.experience.gauge - Duration relative to the longest entry (0–1).
 * @param {string} props.experience.desc
 * @param {string} [props.experience.img] - Logo URL.
 * @param {string[]} [props.experience.skills]
 * @returns {JSX.Element}
 */
const ExperienceCards = ({ experience }) => {
  const { t } = useTranslation();
  const isEducation = experience.kind === 'education';
  return (
    <Window
      title={t(isEducation ? 'experience.educationWindow' : 'experience.missionWindow')}
      accent={isEducation ? ICE : FOREST}
      leftLabel={experience.period}
      rightLabel={experience.duration}
      rightTitle={t('experience.duration')}
      gauge={experience.gauge}
    >
      <Body>
        <Identity>
          {experience.img && (
            <LogoWrapper>
              <Logo src={experience.img} alt={experience.company} />
            </LogoWrapper>
          )}
          <Heading>
            <Role>{experience.role}</Role>
            <Company>
              {experience.company}
              {experience.via && (
                <Via> {t('experience.via', { firm: experience.via })}</Via>
              )}
            </Company>
          </Heading>
        </Identity>
        <p>{experience.desc}</p>
        {experience.skills && (
          <Abilities>
            <span>{t('experience.abilities')}</span>
            <AbilityList>
              {experience.skills.map((skill) => (
                <Ability key={skill}>{skill}</Ability>
              ))}
            </AbilityList>
          </Abilities>
        )}
      </Body>
    </Window>
  );
};

export default ExperienceCards;
