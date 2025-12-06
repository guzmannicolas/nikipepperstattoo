import React, { useState, useEffect } from 'react';
import { motion, useAnimation, type Variants } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  lang: string;
}

const HeroSectionLogic: React.FC<HeroProps> = ({ title, subtitle, ctaPrimary, ctaSecondary, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();


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

        </div>
      </div>
    </section>
  );
};

export default HeroSectionLogic;
