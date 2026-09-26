/**
 * @file src/components/Skills/index.js
 * Skills section (Ice territory): one Lyoko window per `skills[]` category, titled
 * with the category, each skill as an icon + label tile.
 * @component
 */
import React from "react";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import SectionHeader from '../SectionHeader';
import LyokoWindow from '../Cards/LyokoWindow';
import { ICE } from '../../utils/palette';
import { alpha, BLACK, WINDOW_TEXT } from '../../utils/colors';
import { Bio, skills } from "../../data/content"
import { FONT_MONO } from '../../utils/fonts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding-top: 72px;
  background: radial-gradient(ellipse at 50% 0%, ${alpha(ICE, 0.09)} 0%, transparent 65%);

  @media (max-width: 768px) {
    padding-top: 48px;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`

/* Width steps kept from the former cards: the section has no side padding */
const Window = styled(LyokoWindow)`
  max-width: 500px;
  @media (max-width: 768px) {
    max-width: 400px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
  }
`

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
`

const SkillItem = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${alpha(BLACK, 0.22)};
  border: 1.5px solid ${alpha(ICE, 0.45)};
  border-radius: 10px;
  padding: 10px 6px 8px;
  cursor: default;
  transition: box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;

  &:hover {
    background: ${alpha(BLACK, 0.32)};
    border-color: ${ICE};
    box-shadow: 0 0 14px ${alpha(ICE, 0.4)};
  }

  @media (max-width: 768px) {
    width: 76px;
    height: 76px;
  }
`

const SkillImage = styled.img`
  width: 38px;
  height: 38px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`

const SkillLabel = styled.span`
  font-size: 9px;
  font-family: ${FONT_MONO};
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${WINDOW_TEXT};
  text-align: center;
  line-height: 1.2;
  max-width: 80px;
  word-break: break-word;
`

/* The gauge compares each category to the largest one */
const largestCategory = Math.max(...skills.map((item) => item.skills.length));

/**
 * The icon is optional: without `image`, only the label is shown.
 * The years of experience come from `Bio.expYears`; category labels are
 * `skillCategories.<key>` in content.json.
 * @component
 * @returns {JSX.Element}
 */
const Skills = () => {
  const { t } = useTranslation();

  return <Container id="skills">
    <Wrapper>
      <SectionHeader
        sector={t('skills.sector')}
        title={t('skills.title')}
        accent={ICE}
      >
        {t('skills.description', { count: Bio.expYears })}
      </SectionHeader>
      <SkillsContainer>
        {skills.map((item) => (
          <Window
            key={item.key}
            title={t(`content:skillCategories.${item.key}`)}
            accent={ICE}
            rightLabel={t('skills.count', { count: item.skills.length })}
            gauge={item.skills.length / largestCategory}
          >
            <SkillList>
              {item.skills.map((skill) => (
                <SkillItem key={skill.name}>
                  {skill.image && (
                    <SkillImage src={skill.image} alt={skill.name} />
                  )}
                  <SkillLabel>{skill.name}</SkillLabel>
                </SkillItem>
              ))}
            </SkillList>
          </Window>
        ))}
      </SkillsContainer>
    </Wrapper>
  </Container>
}

export default Skills;
