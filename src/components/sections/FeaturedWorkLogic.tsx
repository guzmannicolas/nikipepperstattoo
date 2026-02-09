import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * FeaturedWork Component Props
 * @interface FeaturedWorkProps
 * @property {string} title - Section title
 * @property {string} description - Section description
 * @property {string[]} col1Images - Images for first column (tattoos)
 * @property {string[]} col2Images - Images for second column (artworks)
 * @property {string[]} col3Images - Images for third column (ceramics)
 */
interface FeaturedWorkProps {
  title: string;
  description: string;
  col1Images: string[];
  col2Images: string[];
  col3Images: string[];
}

/**
 * FeaturedWork Component
 * Displays a parallax gallery with text on left and images on right
 * Uses Framer Motion for smooth scroll-based animations
 */
const FeaturedWorkLogic: React.FC<FeaturedWorkProps> = ({
  title,
  description,
  col1Images,
  col2Images,
  col3Images
}) => {
  // Refs for the containers
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  /**
   * Custom wheel event handler
   * Allows scrolling the gallery when mouse is anywhere in the section
   */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      // Access gallery ref dynamically inside the handler
      const gallery = galleryRef.current;
      if (!gallery) return;

      // Determine scroll amount, handling different delta modes (pixels vs lines)
      // Windows browsers often send deltaMode=1 (lines), which results in very slow scrolling if treated as pixels
      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 40; // Default line height estimate
      } else if (e.deltaMode === 2) {
        delta *= gallery.clientHeight; // Page scroll
      }

      // Check if gallery can scroll
      // We use a small epsilon (1px) for float precision safety
      const isAtTop = gallery.scrollTop <= 0;
      const isAtBottom = Math.abs(gallery.scrollHeight - gallery.clientHeight - gallery.scrollTop) <= 1;

      const tryingToScrollDown = delta > 0;
      const tryingToScrollUp = delta < 0;

      // Determine if we should capture the scroll
      // Capture if:
      // 1. Scrolling down AND not at bottom
      // 2. Scrolling up AND not at top
      const shouldCapture = (tryingToScrollDown && !isAtBottom) || (tryingToScrollUp && !isAtTop);

      if (shouldCapture) {
        e.preventDefault();
        e.stopPropagation(); // Stop event from bubbling to parent
        gallery.scrollTop += delta;
      }
    };

    // Add event listener with passive: false to allow preventDefault
    section.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      section.removeEventListener('wheel', handleWheel);
    };
  }, []);

  /**
   * Track scroll progress within the gallery container
   * Range: 0 (top) to 1 (bottom)
   */
  const { scrollYProgress } = useScroll({
    container: galleryRef,
  });

  /**
   * Parallax transformations for each column
   * Column 1 & 3: Move down as user scrolls
   * Column 2: Move up as user scrolls (opposite direction for visual interest)
   */
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -350]);

  /**
   * Duplicate images to create seamless scrolling effect
   * Each column gets 2x the original images
   */
  const col1 = [...col1Images, ...col1Images];
  const col2 = [...col2Images, ...col2Images];
  const col3 = [...col3Images, ...col3Images];

  return (
    <section ref={sectionRef} className="relative bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* Left: Text Content - Static */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 flex-shrink-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right: Parallax Gallery - Scrollable */}
          <div className="lg:w-2/3 flex-grow">
            <div
              ref={galleryRef}
              className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-y-auto overflow-x-hidden scrollbar-hide"
            >
              {/* Top gradient mask for smooth fade effect */}
              <div className="sticky top-0 left-0 w-full h-24 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />

              <div className="grid grid-cols-3 gap-3 md:gap-6 px-1">

                {/* Column 1: Tattoos - Downward parallax */}
                <motion.div
                  style={{ y: y1 }}
                  className="flex flex-col gap-3 md:gap-6"
                >
                  {col1.map((src, i) => (
                    <div
                      key={`tattoo-${i}`}
                      className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={src}
                        alt={`Tattoo work ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </motion.div>

                {/* Column 2: Artworks - Upward parallax (opposite direction) */}
                <motion.div
                  style={{ y: y2 }}
                  className="flex flex-col gap-3 md:gap-6 -mt-32"
                >
                  {col2.map((src, i) => (
                    <div
                      key={`artwork-${i}`}
                      className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={src}
                        alt={`Artwork ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </motion.div>

                {/* Column 3: Ceramics - Downward parallax */}
                <motion.div
                  style={{ y: y3 }}
                  className="flex flex-col gap-3 md:gap-6"
                >
                  {col3.map((src, i) => (
                    <div
                      key={`ceramic-${i}`}
                      className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={src}
                        alt={`Ceramic work ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </motion.div>

              </div>

              {/* Bottom gradient mask */}
              <div className="sticky bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedWorkLogic;
