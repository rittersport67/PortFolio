/**
 * @file src/utils/useCurrentSection.js
 * Hook tracking which page section is currently in view, used by the navbar to
 * light the matching tab.
 * @module useCurrentSection
 */
import { useEffect, useState } from 'react';

/**
 * On scroll, picks the last id whose element top has passed the middle of the viewport.
 * @param {string[]} ids - Section ids, in scroll order.
 * @returns {string|null} The current section id, or null before the first one.
 */
const useCurrentSection = (ids) => {
  const [current, setCurrent] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    const list = key.split('|');
    const update = () => {
      const mid = window.innerHeight / 2;
      // Walk the sections from bottom to top: the first one above the middle wins
      for (let i = list.length - 1; i >= 0; i--) {
        const el = document.getElementById(list[i]);
        if (el && el.getBoundingClientRect().top <= mid) {
          setCurrent(list[i]);
          return;
        }
      }
      setCurrent(null);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [key]);

  return current;
};

export default useCurrentSection;
