import { useRef, RefObject } from 'react';

export function useHoverScroll<T extends HTMLElement = HTMLDivElement>(externalRef?: RefObject<T | null>) {
  const internalRef = useRef<T | null>(null);
  const scrollRef = externalRef || internalRef;
  const rafRef = useRef<number | null>(null);
  const speedRef = useRef<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    const threshold = width * 0.25;

    if (x < threshold) {
      const intensity = (threshold - x) / threshold;
      speedRef.current = -14 * intensity;
    } else if (x > width - threshold) {
      const intensity = (x - (width - threshold)) / threshold;
      speedRef.current = 14 * intensity;
    } else {
      speedRef.current = 0;
    }

    if (speedRef.current !== 0) {
      if (!rafRef.current) {
        const scrollStep = () => {
          if (scrollRef.current && speedRef.current !== 0) {
            scrollRef.current.scrollLeft += speedRef.current;
            rafRef.current = requestAnimationFrame(scrollStep);
          } else {
            rafRef.current = null;
          }
        };
        rafRef.current = requestAnimationFrame(scrollStep);
      }
    } else {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }
  };

  const handleMouseLeave = () => {
    speedRef.current = 0;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  return { scrollRef, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}
