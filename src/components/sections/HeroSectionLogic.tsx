import React, { useState, useEffect } from 'react';
import { motion, useAnimation, type Variants } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  lang: string;
}

// Sample images for the carousel - replace with actual imports or props
const images = [
  '/images/home/carousel-1.jpg',
  '/images/home/carousel-2.jpg',
  '/images/home/carousel-3.jpg',
  '/images/home/carousel-4.jpg',
  '/images/home/carousel-5.jpg',
  '/images/home/carousel-6.jpg',
];

const HeroSectionLogic: React.FC<HeroProps> = ({ title, subtitle, ctaPrimary, ctaSecondary, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  // Carousel auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Animation start logic
  useEffect(() => {
    const splash = document.getElementById('loading-splash');
    const isSplashVisible = splash && window.getComputedStyle(splash).display !== 'none';

    if (isSplashVisible) {
      const onDone = () => controls.start('visible');
      document.addEventListener('splash:done', onDone, { once: true });
      return () => document.removeEventListener('splash:done', onDone);
    } else {
      controls.start('visible');
    }
  }, [controls]);

  // Text animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            className="z-10"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >

            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6 tracking-tight leading-tight"
              variants={itemVariants}
            >
              {title.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-4">{word}</span>
              ))}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-neutral-600 mb-8 max-w-lg font-light leading-relaxed"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <a
                href={`/${lang === 'en' ? '' : lang + '/'}works`}
                className="px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all transform hover:scale-105 text-center"
              >
                {ctaPrimary}
              </a>
              <a
                href={`/${lang === 'en' ? '' : lang + '/'}contact`}
                className="px-8 py-4 bg-transparent border border-neutral-300 text-neutral-900 rounded-full font-medium hover:border-neutral-900 transition-all transform hover:scale-105 text-center"
              >
                {ctaSecondary}
              </a>
            </motion.div>
          </motion.div>

          {/* Right Carousel */}
          <div className="relative h-[520px] md:h-[640px] w-full hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              {images.map((img, index) => {
                // Calculate relative position for overlapping effect
                const offset = (index - currentIndex + images.length) % images.length;
                const isActive = offset === 0;
                const isNext = offset === 1;
                const isPrev = offset === images.length - 1;
                
                // Only render relevant slides for performance
                if (!isActive && !isNext && !isPrev && offset > 2) return null;

                return (
                  <motion.div
                    key={index}
                    className="absolute w-80 h-96 md:w-96 md:h-[560px] rounded-2xl overflow-hidden shadow-2xl"
                    // className="absolute w-[min(40vw,480px)] h-[min(52vh,560px)] rounded-2xl overflow-hidden shadow-2xl"
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isNext ? 100 : isPrev ? -100 : 0,
                      y: isActive ? 0 : 20,
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.4,
                      zIndex: isActive ? 10 : 0,
                      rotate: isActive ? 0 : isNext ? 5 : -5,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      transformOrigin: 'center bottom',
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`Slide ${index}`} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                );
              })}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionLogic;
