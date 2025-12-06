import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  lang: string;
}

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

const HeroSectionLogic: React.FC<HeroProps> = ({ title, subtitle, lang }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Fondo imagen */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/images/home/background-hero.png"
          alt="Fondo Hero"
          className="w-full h-full object-cover object-center opacity-90"
        />
      </div>
      {/* Texto principal */}
      <div className="relative z-10 w-full max-w-3xl px-8 py-24 flex flex-col items-start">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-white/80 mb-8 max-w-xl font-light leading-relaxed"
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
              className="px-8 py-4 bg-neutral-900/90 text-white rounded-full font-medium hover:bg-neutral-800 transition-all transform hover:scale-105 text-center shadow-lg"
            >
              Ver trabajos
            </a>
            <a
              href={`/${lang === 'en' ? '' : lang + '/'}contact`}
              className="px-8 py-4 bg-white/80 text-neutral-900 rounded-full font-medium hover:bg-white transition-all transform hover:scale-105 text-center shadow-lg"
            >
              Reservar consulta
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSectionLogic;
