import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Custom hook that returns the current breakpoint based on Tailwind CSS defaults:
 * - mobile: < 640px
 * - tablet: 640px – 1023px
 * - desktop: >= 1024px
 *
 * Uses window.matchMedia for efficient, event-driven updates (handles rotation too).
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === 'undefined') return 'desktop'; // SSR fallback
    const w = window.innerWidth;
    if (w < 640) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  });

  useEffect(() => {
    const mqTablet = window.matchMedia('(min-width: 640px)');
    const mqDesktop = window.matchMedia('(min-width: 1024px)');

    const update = () => {
      if (mqDesktop.matches) {
        setBreakpoint('desktop');
      } else if (mqTablet.matches) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('mobile');
      }
    };

    // Set initial value
    update();

    mqTablet.addEventListener('change', update);
    mqDesktop.addEventListener('change', update);

    return () => {
      mqTablet.removeEventListener('change', update);
      mqDesktop.removeEventListener('change', update);
    };
  }, []);

  return breakpoint;
}
