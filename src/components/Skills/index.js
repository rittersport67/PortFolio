/**
 * @file src/components/Skills/index.js
 * Section Skills (territoire Banquise) : une carte par catégorie de `skills[]`,
 * chaque compétence en tuile icône + libellé.
 * @component
 */
import React from "react";
import styled from "styled-components";
import { ICE } from '../../utils/palette';
import { CARTHAGE } from '../../utils/palette';
import { Bio, skills } from "../../data/content"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding-top: 72px;
  background: radial-gradient(ellipse at 50% 0%, rgba(75, 167, 209, 0.09) 0%, transparent 65%);

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

const TerritoryTag = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: ${ICE};
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
    background: ${ICE};
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
    background: ${ICE};
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
    font-size: 16px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`

const Skill = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  background: rgba(0, 10, 30, 0.75);
  border: 1px solid rgba(0, 212, 255, 0.35);
  border-radius: 4px;
  padding: 18px 28px 22px;

  @media (max-width: 768px) {
    max-width: 400px;
    padding: 12px 20px 18px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 10px 14px 16px;
  }
`

const SkillTitle = styled.h2`
  font-family: 'Courier New', monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${CARTHAGE};
  margin-bottom: 18px;
  text-align: left;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
`

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 4px;
`

const SkillItem = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(0, 212, 255, 0.04);
  border: 1.5px solid rgba(0, 212, 255, 0.4);
  border-radius: 12px;
  padding: 10px 6px 8px;
  cursor: default;
  transition: box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;

  &:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: rgba(0, 212, 255, 0.85);
    box-shadow: 0 0 14px rgba(0, 212, 255, 0.4), inset 0 0 10px rgba(0, 212, 255, 0.07);
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
  font-family: 'Courier New', monospace;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(0, 212, 255, 0.8);
  text-align: center;
  line-height: 1.2;
  max-width: 80px;
  word-break: break-word;
`

/**
 * L'icône est optionnelle : sans `image`, seul le libellé s'affiche.
 * La durée d'expérience vient de `Bio.exp`.
 * @component
 * @returns {JSX.Element}
 */
const Skills = () => {
  return <Container id="skills">
    <Wrapper>
      <TerritoryTag>Sector 1 — Ice</TerritoryTag>
      <Title>Abilities</Title>
      <Desc>
        Powers acquired over {Bio.exp} on Lyoko.
      </Desc>
      <SkillsContainer>
        {skills.map((item) => (
          <Skill key={item.title}>
            <SkillTitle>{item.title}</SkillTitle>
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
          </Skill>
        ))}
      </SkillsContainer>
    </Wrapper>
  </Container>
}

export default Skills;
