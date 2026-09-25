/**
 * @file src/components/Navbar/UlrichEasterEgg.js
 * Navbar easter egg: floating character with a glow and scan lines.
 * Lazy-loaded by Navbar and portaled into `document.body`.
 * @component
 */
import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

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
  filter: ${({ glowcolor }) =>
    `drop-shadow(0 0 8px ${glowcolor}) drop-shadow(0 0 20px ${glowcolor}66)`};
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

/**
 * Springs in under the logo when `visible` turns true, floats in a loop, then
 * springs out through `AnimatePresence`. Never captures clicks.
 * @component
 * @param {Object} props
 * @param {boolean} props.visible - Shows or hides the character.
 * @param {string} props.src - Transparent PNG (Ulrich or Ulrich-XANA).
 * @param {string} [props.glowColor='#0DB6A4'] - Hex color of the drop-shadow.
 * @returns {React.ReactPortal}
 */
const UlrichEasterEgg = ({ visible, src, glowColor = '#0DB6A4' }) =>
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
            src={src}
            alt="Ulrich Stern"
            glowcolor={glowColor}
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
