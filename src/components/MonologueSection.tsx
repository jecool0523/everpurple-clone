import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface MonologueSectionProps {
  lines: string[];
  className?: string;
}

export const MonologueSection = ({ lines, className = '' }: MonologueSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={ref}
      className={`relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-32 ${className}`}
    >
      <div className="monologue-text">
        {lines.map((line, index) => {
          const start = 0.1 + index * 0.1;
          const end = start + 0.3;
          
          return (
            <MonologueLine
              key={index}
              line={line}
              scrollProgress={scrollYProgress}
              start={start}
              end={end}
            />
          );
        })}
      </div>
    </section>
  );
};

interface MonologueLineProps {
  line: string;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
}

const MonologueLine = ({ line, scrollProgress, start, end }: MonologueLineProps) => {
  const opacity = useTransform(
    scrollProgress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollProgress,
    [start, start + 0.1, end - 0.1, end],
    [30, 0, 0, -30]
  );

  return (
    <motion.p
      className="text-lg font-light leading-relaxed text-text-body md:text-xl lg:text-2xl"
      style={{ opacity, y }}
    >
      {line}
    </motion.p>
  );
};
