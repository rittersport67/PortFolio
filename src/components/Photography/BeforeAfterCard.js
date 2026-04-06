import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: #000;
  cursor: ${({ dragging }) => (dragging ? 'grabbing' : 'default')};
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y;
`;

const Img = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
`;

const Divider = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  margin-left: -1px;
  background: #00d4ff;
  box-shadow: 0 0 10px #00d4ff, 0 0 24px rgba(0, 212, 255, 0.35);
  z-index: 3;
  pointer-events: none;
`;

const Handle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: rgba(0, 6, 18, 0.92);
  border: 2px solid #00d4ff;
  border-radius: 50%;
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.55), 0 0 4px #00d4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00d4ff;
  font-size: 11px;
  letter-spacing: -1px;
  cursor: ew-resize;
  pointer-events: all;
  transition: box-shadow 0.2s, transform 0.2s;
  ${({ dragging }) =>
    dragging &&
    `
    box-shadow: 0 0 28px rgba(0, 212, 255, 0.9), 0 0 8px #00d4ff;
    transform: translate(-50%, -50%) scale(1.15);
  `}
`;

const Label = styled.span`
  position: absolute;
  top: 12px;
  font-family: 'Courier New', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(0, 212, 255, 0.9);
  background: rgba(0, 4, 14, 0.78);
  border: 1px solid rgba(0, 212, 255, 0.3);
  padding: 3px 8px;
  border-radius: 2px;
  z-index: 4;
  pointer-events: none;
  transition: opacity 0.2s;
`;

const TitleBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 14px 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 100%);
  z-index: 4;
  pointer-events: none;
`;

const TitleText = styled.span`
  font-family: 'Courier New', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
`;

const BeforeAfterCard = ({ before, after, title }) => {
  const [pos, setPos] = useState(0.5);
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef(null);
  const animRef = useRef(null);
  const hasAnimated = useRef(false);
  const draggingRef = useRef(false);

  const getRelativePos = useCallback((clientX) => {
    const rect = cardRef.current.getBoundingClientRect();
    return Math.max(0.04, Math.min(0.96, (clientX - rect.left) / rect.width));
  }, []);

  const cancelAnim = useCallback(() => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  }, []);

  // ── Mouse drag ──────────────────────────────────────────────────
  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      cancelAnim();
      draggingRef.current = true;
      setDragging(true);
      setPos(getRelativePos(e.clientX));
    },
    [cancelAnim, getRelativePos]
  );

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!draggingRef.current) return;
      setPos(getRelativePos(e.clientX));
    };
    const onMouseUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [getRelativePos]);

  // ── Touch drag ──────────────────────────────────────────────────
  const onTouchStart = useCallback(
    (e) => {
      cancelAnim();
      setPos(getRelativePos(e.touches[0].clientX));
    },
    [cancelAnim, getRelativePos]
  );

  const onTouchMove = useCallback(
    (e) => {
      setPos(getRelativePos(e.touches[0].clientX));
    },
    [getRelativePos]
  );

  // ── Auto-sweep on first viewport entry: 0.5 → 0.08 → 0.5 ───────
  useEffect(() => {
    const card = cardRef.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const DURATION = 1500;

          const sweep = (now) => {
            const t = Math.min((now - start) / DURATION, 1);
            let p;
            if (t < 0.55) {
              const u = t / 0.55;
              const ease = 1 - Math.pow(1 - u, 3);
              p = 0.5 - ease * 0.42;
            } else {
              const u = (t - 0.55) / 0.45;
              const ease = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
              p = 0.08 + ease * 0.42;
            }
            setPos(p);
            if (t < 1) {
              animRef.current = requestAnimationFrame(sweep);
            } else {
              animRef.current = null;
            }
          };
          animRef.current = requestAnimationFrame(sweep);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(card);
    return () => {
      obs.disconnect();
      cancelAnim();
    };
  }, [cancelAnim]);

  return (
    <Card
      ref={cardRef}
      dragging={dragging}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {/* Before — base layer */}
      <Img src={before} alt="avant" draggable={false} />

      {/* After — clipped to the left of the divider */}
      <Img
        src={after}
        alt="après"
        draggable={false}
        style={{ clipPath: `inset(0 ${(1 - pos) * 100}% 0 0)` }}
      />

      <Label style={{ left: 12, opacity: pos > 0.12 ? 1 : 0 }}>Après</Label>
      <Label style={{ right: 12, opacity: pos < 0.88 ? 1 : 0 }}>Avant</Label>

      <Divider style={{ left: `${pos * 100}%` }}>
        <Handle dragging={dragging}>◄►</Handle>
      </Divider>

      <TitleBar>
        <TitleText>{title}</TitleText>
      </TitleBar>
    </Card>
  );
};

export default BeforeAfterCard;
