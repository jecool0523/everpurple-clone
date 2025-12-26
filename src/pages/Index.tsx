import { useCallback, useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { LandingSection } from '@/components/LandingSection';
import { DisclaimerSection } from '@/components/DisclaimerSection';
import { MonologueSection } from '@/components/MonologueSection';
import { HorizontalGallerySection } from '@/components/HorizontalGallerySection';
import { ZoomImageSection } from '@/components/ZoomImageSection';
import { ParallaxTextSection } from '@/components/ParallaxTextSection';
import { TripleImageSection } from '@/components/TripleImageSection';
import { ImageRevealSection } from '@/components/ImageRevealSection';
import { CreditsSection } from '@/components/CreditsSection';
import { BackgroundMusic } from '@/components/BackgroundMusic';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Navigation } from '@/components/Navigation';
import { FanStorySection } from '@/components/FanStorySection';
import { StreamingSection } from '@/components/StreamingSection';
import { ConcertGallerySection } from '@/components/ConcertGallerySection';
import { PhotoGallerySection } from '@/components/PhotoGallerySection';
import { FinalMessageSection } from '@/components/FinalMessageSection';
import { SectionDivider } from '@/components/SectionDivider';

// Import all data from centralized data file
import {
  galleryImages1,
  galleryImages2,
  anotherWorldImages,
  showdownImages,
  lockdownImages,
  festivalImages,
  fanImages,
  streamingImages,
  concertImages1,
  concertImages2,
  concertImages3,
  concertImages4,
  photoGalleryImages,
  webtoonImages,
  trafficLightImages,
  mashupImages,
  monologueTexts,
  parallaxTexts,
  zoomImageData,
  horizontalGalleryData,
  tripleImageData,
  fanStorySectionData,
  streamingSectionData,
  concertGallerySectionData,
  photoGallerySectionData,
  finalMessageData,
} from '@/data/siteData';

const Index = () => {
  const lenisRef = useLenis();

  const handleStart = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(window.innerHeight, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  }, [lenisRef]);

  useEffect(() => {
    document.documentElement.classList.add('lenis', 'lenis-smooth');
    return () => {
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return (
    <main className="bg-background">
      {/* Global UI elements */}
      <ScrollProgress />
      <BackgroundMusic />
      <Navigation />

      {/* Landing */}
      <LandingSection onStart={handleStart} />

      {/* Disclaimer */}
      <DisclaimerSection />

      {/* Opening monologue */}
      <MonologueSection lines={monologueTexts.opening} />

      <SectionDivider type="line" />

      <MonologueSection lines={monologueTexts.openingContinue} />

      <SectionDivider type="gradient" fromColor="hsl(var(--background))" toColor="hsl(20, 10%, 8%)" />

      {/* First horizontal gallery */}
      <HorizontalGallerySection
        images={galleryImages1}
        description={horizontalGalleryData.first.description}
        linkText={horizontalGalleryData.first.linkText}
        title={horizontalGalleryData.first.title}
        height="500vh"
      />

      <SectionDivider type="gradient" fromColor="hsl(20, 10%, 8%)" toColor="hsl(var(--background))" />

      {/* Second horizontal gallery */}
      <HorizontalGallerySection images={galleryImages2} height="500vh" />

      <SectionDivider type="line" />

      {/* Zoom image with text */}
      <ZoomImageSection
        imageSrc={zoomImageData.rewind.src}
        imageAlt={zoomImageData.rewind.alt}
        overlayText={zoomImageData.rewind.overlayText}
        subText={zoomImageData.rewind.subText}
      />

      {/* Text section */}
      <ParallaxTextSection
        heading={parallaxTexts.firstMiracle.heading}
        lines={parallaxTexts.firstMiracle.lines}
      />

      <ParallaxTextSection lines={parallaxTexts.firstMiracleContinue.lines} />

      <SectionDivider type="gradient" fromColor="hsl(var(--background))" toColor="hsl(260, 15%, 6%)" />

      {/* Singles zoom */}
      <ZoomImageSection
        imageSrc={zoomImageData.singles.src}
        imageAlt={zoomImageData.singles.alt}
      />

      <SectionDivider type="line" />

      {/* Triple image sections */}
      <TripleImageSection
        images={anotherWorldImages}
        topText={tripleImageData.anotherWorld.topText}
        title={tripleImageData.anotherWorld.title}
      />

      <TripleImageSection
        images={showdownImages}
        topText={tripleImageData.showdown.topText}
        title={tripleImageData.showdown.title}
      />

      <TripleImageSection
        images={lockdownImages}
        topText={tripleImageData.lockdown.topText}
        title={tripleImageData.lockdown.title}
      />

      <SectionDivider type="gradient" fromColor="hsl(260, 15%, 6%)" toColor="hsl(var(--background))" />

      {/* Another World zoom */}
      <ZoomImageSection
        imageSrc={zoomImageData.anotherWorld.src}
        imageAlt={zoomImageData.anotherWorld.alt}
        overlayText={zoomImageData.anotherWorld.overlayText}
        subText={zoomImageData.anotherWorld.subText}
      />

      <SectionDivider type="line" />

      {/* Text with heading */}
      <ParallaxTextSection
        heading={parallaxTexts.dimension.heading}
        lines={parallaxTexts.dimension.lines}
      />

      {/* Webtoon images */}
      <ImageRevealSection images={webtoonImages} layout="row" />

      {/* Traffic light section */}
      <ParallaxTextSection
        heading={parallaxTexts.trafficLight.heading}
        lines={parallaxTexts.trafficLight.lines}
      />

      <ImageRevealSection images={trafficLightImages} layout="row" />

      {/* Mashup section */}
      <ParallaxTextSection
        heading={parallaxTexts.mashup.heading}
        lines={parallaxTexts.mashup.lines}
      />

      <ImageRevealSection images={mashupImages} layout="row" />

      <SectionDivider type="gradient" fromColor="hsl(var(--background))" toColor="hsl(280, 20%, 5%)" />

      {/* Festival zoom */}
      <ZoomImageSection
        imageSrc={zoomImageData.festival.src}
        imageAlt={zoomImageData.festival.alt}
        overlayText={zoomImageData.festival.overlayText}
        subText={zoomImageData.festival.subText}
      />

      <SectionDivider type="line" />

      {/* Festival images grid */}
      <ImageRevealSection images={festivalImages} layout="grid" />

      <SectionDivider type="gradient" fromColor="hsl(280, 20%, 5%)" toColor="hsl(var(--background))" />

      {/* Rewind zoom */}
      <ZoomImageSection
        imageSrc={zoomImageData.rewindMin.src}
        imageAlt={zoomImageData.rewindMin.alt}
      />

      <SectionDivider type="line" />

      {/* Fan story section */}
      <MonologueSection lines={monologueTexts.fanStory} />

      <FanStorySection images={fanImages} topText={fanStorySectionData.topText} />

      <SectionDivider type="gradient" fromColor="hsl(var(--background))" toColor="hsl(220, 15%, 6%)" />

      {/* Streaming/Broadcasting section */}
      <StreamingSection images={streamingImages} text={streamingSectionData.text} />

      <SectionDivider type="gradient" fromColor="hsl(220, 15%, 6%)" toColor="hsl(var(--background))" />

      {/* Concert section intro */}
      <ImageRevealSection images={concertImages1} layout="stacked" />

      <SectionDivider type="line" />

      <MonologueSection lines={monologueTexts.concert} />

      {/* Concert images */}
      <ImageRevealSection images={concertImages2} layout="stacked" />

      <ConcertGallerySection
        images={concertImages3}
        topText={concertGallerySectionData.first.topText}
      />

      <ConcertGallerySection images={concertImages4} />

      <SectionDivider type="gradient" fromColor="hsl(var(--background))" toColor="hsl(270, 25%, 4%)" />

      {/* Photo gallery */}
      <PhotoGallerySection
        images={photoGalleryImages}
        topText={photoGallerySectionData.topText}
      />

      <SectionDivider type="gradient" fromColor="hsl(270, 25%, 4%)" toColor="hsl(var(--background))" />

      {/* Final message */}
      <FinalMessageSection
        backgroundImage={finalMessageData.backgroundImage}
        lines={finalMessageData.lines}
      />

      {/* Credits */}
      <CreditsSection />
    </main>
  );
};

export default Index;
