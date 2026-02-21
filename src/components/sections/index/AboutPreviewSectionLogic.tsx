import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface AboutPreviewSectionProps {
  heading: string;
  text1: string;
  text2: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 70, damping: 20, delay: 0.3 },
  },
};

const AboutPreviewSectionLogic: React.FC<AboutPreviewSectionProps> = ({
  heading,
  text1,
  text2,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}) => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Text Content */}
        <motion.div className="space-y-6" variants={textVariants}>
          <h2 className="text-4xl md:text-5xl font-serif text-black leading-tight">
            {heading}
          </h2>
          
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            {text1}
          </p>
          
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            {text2}
          </p>
          
          <motion.a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-medium transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ctaLabel}
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative group"
          variants={imageVariants}
        >
          <div className="relative rounded-2xl overflow-hidden bg-neutral-100 shadow-lg">
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-96 object-contain rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
          </div>
          
          {/* Decorative border on hover */}
          <div className="absolute inset-0 border-4 border-transparent group-hover:border-neutral-900 rounded-2xl transition-all duration-500 pointer-events-none" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutPreviewSectionLogic;
