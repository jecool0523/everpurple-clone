import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface LandingSectionProps {
  onStart: () => void;
}

export const LandingSection = ({ onStart }: LandingSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
      >
        <img
          src="https://static-assets.everpurple.kr/history/ine_history_landing_background.png?1"
          alt="Landing background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-4"
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <img
            src="https://static-assets.everpurple.kr/history/ine_history_title_c.png"
            alt="INE History"
            className="h-auto w-[300px] md:w-[400px] lg:w-[500px]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 text-center font-body text-lg text-text-body md:text-xl"
        >
          히스토리 페이지에 오신 것을 환영합니다.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          onClick={onStart}
          className="hero-button group"
        >
          <span>관람 시작하기</span>
          <ChevronRight className="h-5 w-5" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center font-body text-sm text-muted-foreground"
        >
          아이네에 대한 이야기를 몰입형 전시와 함께 감상해보세요.
        </motion.p>
      </motion.div>

      {/* Scroll indicator at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs">Scroll</span>
          <ChevronRight className="h-4 w-4 scroll-indicator" />
        </div>
      </motion.div>
    </section>
  );
};
