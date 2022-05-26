import { useEffect, useState } from 'react';

type TWindowSize = [number, number];

type THook = TWindowSize;

export const useWindowResize = (): THook => {
  const isSSR = typeof window !== 'undefined';
  const [windowSize, setWindowSize] = useState<TWindowSize>([
    isSSR ? window.innerWidth : 1200,
    isSSR ? window.innerHeight : 800
  ]);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};
