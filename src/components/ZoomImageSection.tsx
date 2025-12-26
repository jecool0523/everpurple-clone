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

  // Image stays centered and scales from tiny to full size
  // The sticky container keeps it fixed while scrolling
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], [0.02, 0.4, 1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.8, 0.95], [0, 0.5, 1, 1, 0]);

  // Text appears after image is scaled up
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.85], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.4, 0.55, 0.85], [30, 0, -30]);
  const textScale = useTransform(scrollYProgress, [0.4, 0.55, 0.85], [0.95, 1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-background md:h-[250vh]"
    >
      {/* Sticky container keeps content fixed in center while scrolling */}
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
        {/* Image container - scales from center */}
        <motion.div
          className="zoom-image-container flex items-center justify-center"
          style={{ 
            scale, 
            opacity: imageOpacity,
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-auto max-h-[70vh] w-auto max-w-[85vw] rounded-lg object-contain shadow-2xl md:max-h-[75vh] md:max-w-[80vw]"
            loading="lazy"
          />
        </motion.div>

        {/* Overlay text - appears after image is fully scaled */}
        {overlayText && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ y: textY, opacity: textOpacity, scale: textScale }}
          >
            <div className="rounded-xl bg-background/60 px-8 py-6 backdrop-blur-sm md:px-12 md:py-8">
              <p className="mx-auto max-w-lg font-body text-lg font-medium leading-relaxed text-foreground md:max-w-2xl md:text-xl lg:text-2xl">
                {overlayText}
              </p>
              {subText && (
                <p className="mt-4 font-body text-sm text-muted-foreground md:mt-5 md:text-base lg:text-lg">
                  {subText}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
