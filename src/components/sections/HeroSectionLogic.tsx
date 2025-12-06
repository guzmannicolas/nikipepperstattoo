import React, { useEffect } from 'react';
import { motion, useAnimation, type Variants } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  lang: string;
}

const HeroSectionLogic: React.FC<HeroProps> = ({ title, subtitle, ctaPrimary, ctaSecondary, lang }) => {
  // control de animaciones de Framer Motion (comando para iniciar/stop animaciones)
  const controls = useAnimation();

  // Inicio de la animación: espera un 'splash' inicial si existe, sino inicia de inmediato.
  // - Busca el elemento con id `loading-splash`.
  // - Si está visible, se suscribe al evento `splash:done` y arranca las animaciones al dispararse.
  // - Si no hay splash, arranca las animaciones inmediatamente.
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

  // Variantes de animación (Framer Motion)
  // - `containerVariants` controla la opacidad del contenedor y define un `staggerChildren`
  //   para animar los hijos con retraso entre ellos.
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

  // - `itemVariants` es la animación individual de cada elemento (entrada desde abajo con resorte).
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

  // Render del componente
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Capas de fondo: imagen base y overlay encima */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/home/background-bg-hero.jpg"
          alt="Textured background"
          className="w-full h-full object-cover"
        />
        {/* Imagen PNG encima para detalles (punta superior de la composición) */}
        <img
          src="/images/home/background-hero.png"
          alt="Hero overlay"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none object-[70%_center] md:object-center opacity-90"
        />
      </div>

      {/* Contenedor centrado con paddings responsivos */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content: texto principal animado */}
          <motion.div
            className="z-10"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >

            {/* Título grande: cada palabra es un span para animar por palabra */}
            <motion.h1
              className="text-5xl md:text-7xl font-serif text-neutral-900 mb-6 tracking-tight leading-tight"
              variants={itemVariants}
            >
              {title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-4"
                  variants={itemVariants}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtítulo / descripción corta */}
            <motion.p
              className="text-lg md:text-xl text-neutral-600 mb-8 max-w-lg font-light leading-relaxed"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>

            {/* CTAs: botones primario y secundario */}
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
            {/* Marquee full-width debajo de los botones: ocupa toda la pantalla
                - Aquí rompemos el contenedor centrado usando `w-screen` y
                  transform para centrar respecto al viewport.
                - El contenido dentro está duplicado para crear un loop seamless. */}
            <div className="relative w-screen left-1/2 -translate-x-1/2 mt-12 pointer-events-none">
                <div className="inline-flex animate-marquee text-6xl md:text-7xl font-black uppercase tracking-widest text-black/80 whitespace-nowrap">
                  {/* Grupo 1: Contenido duplicado para asegurar que cubra pantallas grandes */}
                  <div className="flex items-center gap-12 pr-12 font-serif">
                    <span>Lorem</span><span>*</span><span>Ipsum</span><span>*</span><span>Dorime</span><span>*</span>
                    <span>Lorem</span><span>*</span><span>Ipsum</span><span>*</span><span>Dorime</span><span>*</span>
                  </div>
                  {/* Grupo 2: Idéntico al primero */}
                  <div className="flex items-center gap-12 pr-12 font-serif">
                    <span>Lorem</span><span>*</span><span>Ipsum</span><span>*</span><span>Dorime</span><span>*</span>
                    <span>Lorem</span><span>*</span><span>Ipsum</span><span>*</span><span>Dorime</span><span>*</span>
                  </div>
                </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionLogic;
