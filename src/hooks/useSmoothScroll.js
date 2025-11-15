import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert GSAP's time to milliseconds for Lenis
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);
};

