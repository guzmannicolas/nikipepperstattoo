import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface FeaturedWorkProps {
  title: string;
  description: string;
  col1Images: string[];
  col2Images: string[];
  col3Images: string[];
}

/* ─── Helpers ─── */

/** Interleave images from all 3 categories: tattoo1, work1, ceramic1, tattoo2, ... */
function interleaveImages(
  col1: string[],
  col2: string[],
  col3: string[]
): { src: string; alt: string }[] {
  const maxLen = Math.max(col1.length, col2.length, col3.length);
  const result: { src: string; alt: string }[] = [];
  for (let i = 0; i < maxLen; i++) {
    if (col1[i]) result.push({ src: col1[i], alt: 'Tattoo work' });
    if (col2[i]) result.push({ src: col2[i], alt: 'Art work' });
    if (col3[i]) result.push({ src: col3[i], alt: 'Ceramic work' });
  }
  return result;
}

/* ─── Mobile Layout: Sticky text + scroll-snap gallery ─── */

const MobileLayout: React.FC<{
  title: string;
  description: string;
  images: { src: string; alt: string }[];
}> = ({ title, description, images }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest);
  });

  const totalTransitions = Math.max(images.length - 1, 1);
  const sectionHeightVh = Math.max(180, 120 + totalTransitions * 22);

  const getTranslateY = (index: number): number => {
    if (index === 0) return 0;

    const transitionStart = (index - 1) / totalTransitions;
    const transitionEnd = index / totalTransitions;

    if (progress <= transitionStart) return 100;
    if (progress >= transitionEnd) return 0;

    const localProgress =
      (progress - transitionStart) / (transitionEnd - transitionStart);

    return (1 - localProgress) * 100;
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: `${sectionHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen px-5 pt-6 pb-6 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-[40vh] z-20 bg-white/95 backdrop-blur-sm pb-5 flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-4xl font-serif text-neutral-900 mb-4 leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-2xl text-neutral-600 font-serif leading-relaxed max-w-xl">
            {description}
          </p>
        </motion.div>

        <div className="relative h-[60vh] rounded-2xl overflow-hidden shadow-sm">
          {images.map((img, i) => {
            const hasNext = i < images.length - 1;
            const nextTranslate = hasNext ? getTranslateY(i + 1) : 0;
            const overlayOpacity = hasNext
              ? Math.max(0, Math.min(0.75, ((100 - nextTranslate) / 100) * 0.75))
              : 0;

            return (
              <motion.div
                key={`mobile-stack-${i}`}
                className="absolute inset-0"
                style={{
                  y: `${getTranslateY(i)}%`,
                  zIndex: i + 1,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-black pointer-events-none"
                  style={{ opacity: overlayOpacity }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─── Tablet Layout: 2-column parallax ─── */

const TabletLayout: React.FC<{
  title: string;
  description: string;
  col1Images: string[];
  col2Images: string[];
  col3Images: string[];
}> = ({ title, description, col1Images, col2Images, col3Images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    setVh(window.innerHeight);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Proportional parallax values based on viewport height
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -(vh * 0.4)]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-(vh * 0.4), 0]);

  // Combine columns: col1 + first half of col3 → left; col2 + second half of col3 → right
  const leftCol = [...col1Images, ...col3Images.slice(0, 1), ...col1Images];
  const rightCol = [...col2Images, ...col3Images.slice(1), ...col2Images];

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-white">
      <div className="sticky top-0 h-screen px-5 pt-6 pb-6 flex flex-col overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-[40vh] z-20 bg-white/95 backdrop-blur-sm pb-5 flex flex-col items-center justify-center text-center mb-8"
          >
            <h2 className="text-4xl font-serif text-neutral-900 mb-4 leading-tight tracking-tight">
              {title || 'Featured Works'}
            </h2>
            <p className="text-2xl text-neutral-600 font-serif leading-relaxed max-w-xl">
              {description}
            </p>
          </motion.div>

          {/* 2-column parallax grid */}
          <div className="relative h-[60vh] overflow-hidden">
            {/* Gradient masks */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                style={{ y: y1 }}
                className="flex flex-col gap-4 transform-gpu will-change-transform"
              >
                {leftCol.map((src, i) => (
                  <div
                    key={`tab-l-${i}`}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm"
                  >
                    <img
                      src={src}
                      alt="Featured work"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>

              <motion.div
                style={{ y: y2 }}
                className="flex flex-col gap-4 -mt-24 transform-gpu will-change-transform"
              >
                {rightCol.map((src, i) => (
                  <div
                    key={`tab-r-${i}`}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm"
                  >
                    <img
                      src={src}
                      alt="Featured work"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Desktop Layout: 3-column parallax (improved) ─── */

const DesktopLayout: React.FC<{
  title: string;
  description: string;
  col1Images: string[];
  col2Images: string[];
  col3Images: string[];
}> = ({ title, description, col1Images, col2Images, col3Images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vh, setVh] = useState(900);

  useEffect(() => {
    setVh(window.innerHeight);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Proportional parallax values based on actual viewport height
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -(vh * 0.75)]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-(vh * 0.75), 0]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -(vh * 0.6)]);

  // Triplicate images for continuous scroll content
  const col1 = [...col1Images, ...col1Images, ...col1Images];
  const col2 = [...col2Images, ...col2Images, ...col2Images];
  const col3 = [...col3Images, ...col3Images, ...col3Images];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row gap-20 items-center h-full">
            {/* Left Content – Static */}
            <div className="w-1/3 z-20">
              <h2 className="text-5xl xl:text-6xl font-serif text-neutral-900 mb-6 leading-tight">
                {title || 'Featured Works'}
              </h2>
              <p className="text-2xl xl:text-3xl text-neutral-600 font-serif leading-relaxed max-w-md">
                {description}
              </p>
            </div>

            {/* Right Content – 3-column parallax grid */}
            <div className="w-2/3 h-[80vh] overflow-hidden relative">
              {/* Gradient masks */}
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

              <div className="grid grid-cols-3 gap-6">
                {/* Column 1 – Moves up */}
                <motion.div
                  style={{ y: y1 }}
                  className="flex flex-col gap-6 transform-gpu will-change-transform"
                >
                  {col1.map((src, i) => (
                    <div
                      key={`col1-${i}`}
                      className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm"
                    >
                      <img
                        src={src}
                        alt="Tattoo work"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </motion.div>

                {/* Column 2 – Moves down */}
                <motion.div
                  style={{ y: y2 }}
                  className="flex flex-col gap-6 -mt-40 transform-gpu will-change-transform"
                >
                  {col2.map((src, i) => (
                    <div
                      key={`col2-${i}`}
                      className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm"
                    >
                      <img
                        src={src}
                        alt="Art work"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </motion.div>

                {/* Column 3 – Moves up */}
                <motion.div
                  style={{ y: y3 }}
                  className="flex flex-col gap-6 transform-gpu will-change-transform"
                >
                  {col3.map((src, i) => (
                    <div
                      key={`col3-${i}`}
                      className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm"
                    >
                      <img
                        src={src}
                        alt="Ceramic work"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Main Component: renders the correct layout per breakpoint ─── */

const FeaturedWorkLogic: React.FC<FeaturedWorkProps> = ({
  title,
  description,
  col1Images,
  col2Images,
  col3Images,
}) => {
  const breakpoint = useBreakpoint();

  if (breakpoint === 'mobile') {
    return (
      <MobileLayout
        title={title}
        description={description}
        images={interleaveImages(col1Images, col2Images, col3Images)}
      />
    );
  }

  if (breakpoint === 'tablet') {
    return (
      <TabletLayout
        title={title}
        description={description}
        col1Images={col1Images}
        col2Images={col2Images}
        col3Images={col3Images}
      />
    );
  }

  return (
    <DesktopLayout
      title={title}
      description={description}
      col1Images={col1Images}
      col2Images={col2Images}
      col3Images={col3Images}
    />
  );
};

export default FeaturedWorkLogic;
