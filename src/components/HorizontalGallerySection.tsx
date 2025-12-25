import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  ratio?: number; // width/height ratio
}

interface HorizontalGallerySectionProps {
  images: GalleryImage[];
  description?: string;
  title?: string;
  linkText?: string;
  height?: string;
}

export const HorizontalGallerySection = ({
  images,
  description,
  title,
  linkText,
  height = '400vh',
}: HorizontalGallerySectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate total gallery width
  const totalWidth = images.length * 450 + (images.length - 1) * 32; // image width + gaps
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    ['10vw', `-${totalWidth - window.innerWidth + 200}px`]
  );

  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Gallery */}
        <motion.div
          className="flex items-center gap-8"
          style={{ x: translateX }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="gallery-image-wrapper h-[50vh] flex-shrink-0"
              style={{
                width: image.ratio ? `calc(50vh * ${image.ratio})` : '350px',
                aspectRatio: image.ratio || 0.8,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, margin: '-10%' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Text overlay */}
        {(description || title) && (
          <motion.div
            className="absolute bottom-16 left-0 right-0 px-8 text-center"
            style={{ opacity: textOpacity }}
          >
            {description && (
              <p className="mx-auto max-w-2xl font-body text-base text-text-body md:text-lg">
                {description}
              </p>
            )}
            {linkText && (
              <button className="mt-4 font-body text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground">
                {linkText}
              </button>
            )}
            {title && (
              <p className="mt-4 font-display text-lg italic text-primary md:text-xl">
                {title}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
