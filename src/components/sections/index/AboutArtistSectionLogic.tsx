import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface AboutArtistProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0, filter: 'blur(6px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 30,
      damping: 5,
    },
  },
};

const AboutArtistSectionLogic: React.FC<AboutArtistProps> = ({
  title,
  subtitle,
  buttonText,
  buttonHref,
}) => {
  return (
    <section className="relative overflow-hidden py-24 px-4 z-20 bg-white">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/home/background-bg-hero.avif"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover rotate-180 opacity-60"
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-serif mb-6 text-black leading-tight"
            variants={itemVariants}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-2xl md:text-3xl text-neutral-600 mb-10 leading-relaxed font-serif"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          <motion.a
            href={buttonHref}
            className="inline-block px-8 py-4 bg-black hover:bg-neutral-800 text-white rounded-full font-semibold transition-colors text-lg shadow-lg shadow-black/10"
            variants={itemVariants}
          >
            {buttonText}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutArtistSectionLogic;
