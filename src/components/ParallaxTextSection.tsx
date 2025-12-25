import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxTextSectionProps {
  heading?: string;
  lines: string[];
  alignment?: 'left' | 'center' | 'right';
}

export const ParallaxTextSection = ({
  heading,
  lines,
  alignment = 'center',
}: ParallaxTextSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-32"
    >
      <motion.div
        className={`flex max-w-4xl flex-col gap-6 ${alignmentClasses[alignment]}`}
        style={{ opacity: containerOpacity }}
      >
        {heading && (
          <motion.h3
            className="font-body text-sm font-medium uppercase tracking-widest text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {heading}
          </motion.h3>
        )}
        
        {lines.map((line, index) => (
          <motion.p
            key={index}
            className="font-body text-lg font-light leading-relaxed text-text-body md:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: true, margin: '-10%' }}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
};
