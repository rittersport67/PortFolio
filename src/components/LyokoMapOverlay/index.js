import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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

const MapImg = styled.img`
  width: 100%;
  height: 100%;
  mix-blend-mode: screen;
  opacity: 0.55;
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
`;

/*
  Sections dans l'ordre de scroll.
  show: false → overlay caché sur cette section.
  Rotations clockwise continues pour que le territoire
  pointe vers la gauche (vers le contenu) :
    Banquise (Ouest) →   0°
    Forêt    (Est)   → 180°
    Montagne (Nord)  → 270°
    Désert   (Sud)   → 450°
*/
const SECTIONS = [
  { id: 'about',       rotation: 0,   show: false },
  { id: 'skills',      rotation: 0,   show: true  },
  { id: 'experience',  rotation: 180, show: true  },
  { id: 'projects',    rotation: 270, show: true  },
  { id: 'photography', rotation: 450, show: true  },
];

const LyokoMapOverlay = () => {
  const [rotation, setRotation] = useState(0);
  const [opacity,  setOpacity]  = useState(0);

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight / 2;

      // Parcourt les sections du bas vers le haut
      // → prend la dernière dont le top est au-dessus du milieu écran
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= mid) {
          setRotation(SECTIONS[i].rotation);
          setOpacity(SECTIONS[i].show ? 1 : 0);
          return;
        }
      }
      // Avant toute section visible
      setOpacity(0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // état initial

    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <Wrapper style={{ opacity }}>
      <MapImg
        src="/img/code-lyoko-monde.png"
        alt=""
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </Wrapper>
  );
};

export default LyokoMapOverlay;
