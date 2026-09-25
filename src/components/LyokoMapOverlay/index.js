/**
 * @file src/components/LyokoMapOverlay/index.js
 * Lyoko map pinned to the right edge: it rotates to point at the territory of the
 * current section. Hidden on the Hero and below 960px.
 * @component
 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import lyokoMap from '../../img/code-lyoko-monde.png';

// data-allow-motion: the rotation between territories survives prefers-reduced-motion (see App.css).
const Wrapper = styled.div.attrs({ 'data-allow-motion': true })`
  position: fixed;
  right: -70px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  pointer-events: none;
  width: 280px;
  height: 280px;
  transition: opacity 0.6s ease;

  @media (max-width: 960px) {
    display: none;
  }
`;

const MapImg = styled.img.attrs({ 'data-allow-motion': true })`
  width: 100%;
  height: 100%;
  mix-blend-mode: screen;
  opacity: 0.55;
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
`;

/*
  Sections in scroll order.
  show: false → overlay hidden on that section.
  Continuous clockwise rotations so the territory
  points left (towards the content):
    Ice      (West)  →   0°
    Forest   (East)  → 180°
    Mountain (North) → 270°
    Desert   (South) → 450°
*/
const SECTIONS = [
  { id: 'about',       rotation: 0,   show: false },
  { id: 'skills',      rotation: 0,   show: true  },
  { id: 'experience',  rotation: 180, show: true  },
  { id: 'projects',    rotation: 270, show: true  },
  { id: 'photography', rotation: 450, show: true  },
];

/**
 * On scroll, picks the last `SECTIONS` entry whose top has passed the middle of the
 * viewport, then applies its rotation and visibility.
 * The ids must match the section ids.
 * @component
 * @returns {JSX.Element}
 */
const LyokoMapOverlay = () => {
  const [rotation, setRotation] = useState(0);
  const [opacity,  setOpacity]  = useState(0);

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight / 2;

      // Walk the sections from bottom to top
      // → take the last one whose top is above the middle of the viewport
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= mid) {
          setRotation(SECTIONS[i].rotation);
          setOpacity(SECTIONS[i].show ? 1 : 0);
          return;
        }
      }
      // Before any section is visible
      setOpacity(0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // initial state

    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <Wrapper style={{ opacity }}>
      <MapImg
        src={lyokoMap}
        alt=""
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </Wrapper>
  );
};

export default LyokoMapOverlay;
