import React from "react";
import styled from "styled-components";
import { Bio, skills } from "../../data/contants.js"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
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

export const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

export const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
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

/* HUD panel — style panneau de l'ordi de Jérémie */
const Skill = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  background: rgba(0, 10, 30, 0.75);
  border: 1px solid rgba(0, 212, 255, 0.35);
  border-radius: 4px;
  padding: 18px 28px 22px;
  box-shadow: 0 0 18px rgba(0, 212, 255, 0.08), inset 0 0 30px rgba(0, 212, 255, 0.03);

  /* coin supérieur gauche */
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    width: 18px;
    height: 18px;
    border-top: 2px solid #00d4ff;
    border-left: 2px solid #00d4ff;
  }

  /* coin inférieur droit */
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 18px;
    height: 18px;
    border-bottom: 2px solid #00d4ff;
    border-right: 2px solid #00d4ff;
  }

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
  color: #00d4ff;
  margin-bottom: 18px;
  text-align: left;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);

  /* petite puce devant le titre */
  &::before {
    content: '▸ ';
    color: rgba(0, 212, 255, 0.5);
  }
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

  /* coin supérieur gauche */
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    width: 12px;
    height: 12px;
    border-top: 2px solid #00d4ff;
    border-left: 2px solid #00d4ff;
    border-radius: 3px 0 0 0;
  }

  /* coin inférieur droit */
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 12px;
    height: 12px;
    border-bottom: 2px solid #00d4ff;
    border-right: 2px solid #00d4ff;
    border-radius: 0 0 3px 0;
  }

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
  filter: drop-shadow(0 0 5px rgba(0, 212, 255, 0.55));
  transition: filter 0.25s ease;

  ${SkillItem}:hover & {
    filter: drop-shadow(0 0 10px rgba(0, 212, 255, 1));
  }

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

const Skills = () => {
  return <Container id="skills">
    <Wrapper>
      <Title>Skills</Title>
      <Desc>
        Here are some of my skills which I have been working on for the past {Bio.exp}.
      </Desc>
      <SkillsContainer>
        {skills.map((item) => (
          <Skill key={item.title}>
            <SkillTitle>{item.title}</SkillTitle>
            <SkillList>
              {item.skills.map((skill) => (
                <SkillItem key={skill.name}>
                  <SkillImage src={skill.image} />
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
