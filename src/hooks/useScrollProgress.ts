import { useEffect, useState, useRef, RefObject } from 'react';

interface ScrollProgress {
  progress: number;
  isInView: boolean;
}

export const useScrollProgress = (
  ref: RefObject<HTMLElement>,
  options: { offset?: number; triggerOnce?: boolean } = {}
): ScrollProgress => {
  const { offset = 0, triggerOnce = false } = options;
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calculate progress based on element position
      const start = windowHeight + offset;
      const end = -elementHeight - offset;
      const current = rect.top;

      // Progress from 0 (element enters) to 1 (element exits)
      const rawProgress = 1 - (current - end) / (start - end);
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setProgress(clampedProgress);

      // Check if element is in view
      const inView = rect.top < windowHeight && rect.bottom > 0;
      
      if (triggerOnce && inView) {
        if (!hasTriggered.current) {
          hasTriggered.current = true;
          setIsInView(true);
        }
      } else {
        setIsInView(inView);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, offset, triggerOnce]);

  return { progress, isInView };
};
