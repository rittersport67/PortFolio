/**
 * @file src/components/SectionHeader/index.js
 * Shared header of every territory section: "Sector N — Territory" tag between two
 * rules, large title underlined with the territory accent, one-line description.
 * Keeps all sector titles identical in font and design.
 * @component
 */
import React from 'react';
import styled from 'styled-components';
import { alpha, TEXT_SECONDARY } from '../../utils/colors';
import { FONT_MONO } from '../../utils/fonts';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

const TerritoryTag = styled.div`
  font-family: ${FONT_MONO};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent};
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
    background: ${({ $accent }) => $accent};
    opacity: 0.5;
  }
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};

  &::after {
    content: '';
    display: block;
    margin: 6px auto 0;
    width: 36px;
    height: 2px;
    background: ${({ $accent }) => $accent};
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.p`
  max-width: 600px;
  font-size: 18px;
  color: ${alpha(TEXT_SECONDARY, 0.85)};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

/**
 * @component
 * @param {Object} props
 * @param {string} props.sector - Tag text, e.g. `'Sector 1 — Ice'`.
 * @param {string} props.title
 * @param {string} props.accent - Territory accent hex (tag and underline).
 * @param {React.ReactNode} props.children - Description line.
 * @param {string} [props.className] - Set by `styled(SectionHeader)` for outer spacing.
 * @returns {JSX.Element}
 */
const SectionHeader = ({ sector, title, accent, children, className }) => (
  <Header className={className}>
    <TerritoryTag $accent={accent}>{sector}</TerritoryTag>
    <Title $accent={accent}>{title}</Title>
    <Desc>{children}</Desc>
  </Header>
);

export default SectionHeader;
