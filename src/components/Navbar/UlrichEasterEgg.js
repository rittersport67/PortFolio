import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import UlrichImg from '../../img/ulrich.png';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 88px;
  left: 24px;
  z-index: 9999;
  pointer-events: none;
`;

const UlrichImage = styled(motion.img)`
  height: 180px;
  width: auto;
  display: block;
  filter: drop-shadow(0 0 8px #0DB6A4) drop-shadow(0 0 20px rgba(13, 182, 164, 0.4));
`;

const ScanLines = styled.div`
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0, 0, 0, 0.12) 3px,
    rgba(0, 0, 0, 0.12) 4px
  );
`;

const UlrichEasterEgg = ({ visible }) =>
  createPortal(
    <AnimatePresence>
      {visible && (
        <Overlay
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        >
          <UlrichImage
            src={UlrichImg}
            alt="Ulrich Stern"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
          <ScanLines />
        </Overlay>
      )}
    </AnimatePresence>,
    document.body
  );

export default UlrichEasterEgg;
