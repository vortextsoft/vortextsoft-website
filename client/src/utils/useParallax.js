import { useEffect, useRef, useState } from 'react';

/**
 * useParallax - returns a ref and a CSS transform string.
 * Attach ref to the element you want to track, and apply
 * the style to the element that should move.
 *
 * @param {number} speed  - parallax intensity (0.1 = subtle, 0.5 = strong)
 * @param {boolean} reverse - reverse direction
 */
export function useParallax(speed = 0.2, reverse = false) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // distance of element center from viewport center
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowH / 2;
      const delta = (viewportCenter - elementCenter) * speed * (reverse ? -1 : 1);
      setOffset(delta);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialise

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, reverse]);

  return { ref, offset };
}

/**
 * useScrollFade - returns opacity + translateY based on scroll position.
 * Elements fade & slide in as they enter the viewport.
 */
export function useScrollFade(threshold = 0.15) {
  const ref = useRef(null);
  const [style, setStyle] = useState({ opacity: 0, transform: 'translateY(40px)' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStyle({ opacity: 1, transform: 'translateY(0)' });
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, style };
}
