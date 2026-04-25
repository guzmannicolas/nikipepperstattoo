import React, { useEffect, useMemo, useRef } from 'react';
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const tripledCards = useMemo(() => [...cards, ...cards, ...cards], [cards]);
  const baseCount = cards.length;

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || baseCount === 0) return;

    const gapPx = 16; // gap-4
    const firstCard = el.querySelector<HTMLElement>('[data-card-item]');
    const cardWidth = firstCard ? firstCard.offsetWidth : 0;
    const offset = baseCount * (cardWidth + gapPx);
    el.scrollLeft = offset;

    const handleLoop = () => {
      const maxOffset = offset * 2;
      if (el.scrollLeft <= gapPx || el.scrollLeft >= maxOffset + gapPx) {
        el.style.scrollBehavior = 'auto';
        if (el.scrollLeft <= gapPx) {
          el.scrollLeft += offset;
        } else {
          el.scrollLeft -= offset;
        }
        requestAnimationFrame(() => {
          el.style.scrollBehavior = '';
        });
      }
    };

    el.addEventListener('scroll', handleLoop, { passive: true });
    return () => el.removeEventListener('scroll', handleLoop);
  }, [baseCount]);

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

      {/* Mobile & Tablet: swipeable infinite carousel (native scroll, snap) */}
      <div className="lg:hidden relative overflow-hidden rounded-2xl shadow-lg">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          ref={carouselRef}
          className="styles-carousel flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-2 pb-4 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollbarWidth: 'none' }}
        >
          <style>{`.styles-carousel::-webkit-scrollbar{display:none;}`}</style>
          {tripledCards.map((style, idx) => {
            const filterParam = style.key;
            const cardHref = `${style.href}?filter=${encodeURIComponent(filterParam)}`;
            return (
              <article
                key={`${style.key}-${idx}`}
                data-card-item
                className="styles-carousel relative flex-none snap-center w-[78vw] sm:w-[70vw] md:w-[60vw] h-[420px] md:h-[480px] overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-md cursor-pointer"
                onClick={() => { window.location.href = cardHref; }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') window.location.href = cardHref; }}
                tabIndex={0}
                role="link"
              >
                <img
                  src={style.image}
                  alt={style.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-8 text-white">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-base uppercase tracking-[0.14em]">
                    {style.badge}
                  </span>
                  <p className="text-lg md:text-xl text-white/85 leading-relaxed">{style.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Desktop: static grid */}
      <motion.div
        className="hidden lg:grid gap-6 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {cards.map((style, idx) => {
          const filterParam = style.key;
          const cardHref = `${style.href}?filter=${encodeURIComponent(filterParam)}`;
          return (
            <motion.article
              key={style.key}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-lg transition duration-500 will-change-transform min-h-[420px] lg:min-h-[480px] cursor-pointer ${idx === 1 ? 'lg:translate-y-6' : ''}`}
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
