import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface StyleCard {
  key: string;
  title: string;
  description: string;
  badge: string;
  image: string;
  filterLabel: string;
  href: string;
}

interface StylesSectionProps {
  heading: string;
  kicker?: string;
  intro?: string;
  cards: StyleCard[];
  ctaAllLabel: string;
  ctaAllHref: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 90, damping: 16 },
  },
};

const StylesSectionLogic: React.FC<StylesSectionProps> = ({
  heading,
  kicker,
  intro,
  cards,
  ctaAllLabel,
  ctaAllHref,
}) => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 space-y-3">
        {kicker ? (
          <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">{kicker}</p>
        ) : null}
        <h2 className="text-4xl md:text-5xl font-serif text-black">{heading}</h2>
        {intro ? (
          <p className="text-neutral-600 max-w-3xl mx-auto text-base md:text-lg">{intro}</p>
        ) : null}
      </div>

      <motion.div
        className="grid gap-6 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {cards.map((style, idx) => {
          // Construir la URL con filtro para cada estilo
          const filterParam = style.key === 'animals' ? 'animals' : style.key === 'colour' ? 'colour' : 'fineline';
          const cardHref = `${style.href}?filter=${encodeURIComponent(filterParam)}`;
          return (
            <motion.article
              key={style.key}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-lg transition duration-500 will-change-transform min-h-[420px] md:min-h-[480px] cursor-pointer ${idx === 1 ? 'md:translate-y-6' : ''}`}
              tabIndex={0}
              role="link"
              onClick={() => window.location.href = cardHref}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') window.location.href = cardHref; }}
            >
              <div className="absolute inset-0">
                <img
                  src={style.image}
                  alt={style.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/38 to-transparent" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-12">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-2xl uppercase tracking-[0.16em]">
                  {style.badge}
                </span>
                <p className="text-2xl text-white/80 leading-relaxed">{style.description}</p>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default StylesSectionLogic;
