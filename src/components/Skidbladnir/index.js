import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import SkidImg from '../../img/skidbladnir.png';

/*
  Parallax Y-only: the Skid floats at a fixed horizontal position
  and drifts downward slower than the scroll speed, creating depth.
*/

const SkidWrapper = styled(motion.div)`
  position: fixed;
  right: 0px;
  z-index: 5;
  pointer-events: none;
  width: 260px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SkidImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 0 12px rgba(13, 182, 164, 0.45))
    drop-shadow(0 0 28px rgba(13, 182, 164, 0.18));
`;

const Skidbladnir = () => {
  const { scrollYProgress } = useScroll();

  /* Drifts from just above viewport to below — slower than scroll = parallax depth */
  const top = useTransform(scrollYProgress, [0, 1], ['8vh', '82vh']);

  /* Subtle forward-tilt as it descends */
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.97, 1],
    [0, 0.8, 0.8, 0]
  );

  return (
    <SkidWrapper style={{ top, rotate, opacity }}>
      <SkidImage src={SkidImg} alt="Skidbladnir" />
    </SkidWrapper>
  );
};

export default Skidbladnir;
