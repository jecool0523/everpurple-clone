import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ZoomImageSectionProps {
  imageSrc: string;
  imageAlt: string;
  overlayText?: string;
  subText?: string;
}

export const ZoomImageSection = ({
  imageSrc,
  imageAlt,
  overlayText,
  subText,
}: ZoomImageSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Zoom effect: starts small and scales up as you scroll through
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.2, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Text parallax
  const textY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [100, 0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-background"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Zooming image */}
        <motion.div
          className="zoom-image-container"
          style={{ scale, opacity: imageOpacity }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-[60vh] w-auto max-w-[90vw] object-contain md:h-[70vh]"
            loading="lazy"
          />
        </motion.div>

        {/* Overlay text */}
        {overlayText && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
            style={{ y: textY, opacity: textOpacity }}
          >
            <p className="mx-auto max-w-2xl px-4 font-body text-lg text-foreground md:text-xl lg:text-2xl">
              {overlayText}
            </p>
            {subText && (
              <p className="mt-4 font-body text-sm text-muted-foreground md:text-base">
                {subText}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
