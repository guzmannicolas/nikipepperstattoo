import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from './astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useEffect, useRef } from 'react';
import { useAnimation, useScroll, useTransform, motion } from 'framer-motion';
import 'clsx';
import { k as koiFish, a as tattoo3, t as tattoo1 } from './blue-flower-tattoo-green-leaves-forearm_dCvMlDZa.mjs';
/* empty css                         */

const HeroSectionLogic = ({ title, wordsliderhero, ctaPrimary, ctaSecondary, lang }) => {
  const controls = useAnimation();
  useEffect(() => {
    const splash = document.getElementById("loading-splash");
    const isSplashVisible = splash && window.getComputedStyle(splash).display !== "none";
    if (isSplashVisible) {
      const onDone = () => controls.start("visible");
      document.addEventListener("splash:done", onDone, { once: true });
      return () => document.removeEventListener("splash:done", onDone);
    } else {
      controls.start("visible");
    }
  }, [controls]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0
      }
    }
  };
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 1e3], [0, 400]);
  useTransform(scrollY, [0, 1e3], [0, 200]);
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-24 md:pt-24", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0", children: /* @__PURE__ */ jsx(
      motion.img,
      {
        src: "/images/home/background-bg-hero.jpg",
        alt: "Textured background",
        className: "w-full h-full object-cover",
        style: { y: yBackground }
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 container mx-auto px-4", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        ref: containerRef,
        className: "max-w-5xl mx-auto text-center",
        variants: containerVariants,
        initial: "hidden",
        animate: controls,
        children: [
          /* @__PURE__ */ jsx(motion.h1, { className: "text-5xl md:text-7xl font-serif leading-tight text-black mb-6", variants: itemVariants, children: title }),
          /* @__PURE__ */ jsx(motion.p, { className: "text-xl md:text-2xl text-neutral-600 mb-8", variants: itemVariants, children: wordsliderhero }),
          /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center justify-center gap-4", variants: itemVariants, children: [
            /* @__PURE__ */ jsx("a", { href: `/${lang === "en" ? "" : lang + "/"}works`, className: "px-6 py-3 bg-black text-white rounded-lg font-semibold", children: ctaPrimary }),
            /* @__PURE__ */ jsx("a", { href: `/${lang === "en" ? "" : lang + "/"}contact`, className: "px-6 py-3 border border-neutral-300 rounded-lg text-black", children: ctaSecondary })
          ] })
        ]
      }
    ) })
  ] });
};

const $$Astro$4 = createAstro();
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const { lang, t } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "HeroSectionLogic", HeroSectionLogic, { "client:load": true, "title": "Transform your space into a botanical beauty.", "wordsliderhero": t("home.wordsliderhero"), "ctaPrimary": t("home.viewWorks"), "ctaSecondary": t("home.bookConsultation"), "lang": lang, "client:component-hydration": "load", "client:component-path": "C:/xampp/htdocs/nikipepperstattoo/src/components/sections/index/HeroSectionLogic", "client:component-export": "default" })}`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/components/sections/index/HeroSection.astro", void 0);

const $$Astro$3 = createAstro();
const $$AboutArtistSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$AboutArtistSection;
  const { lang, t } = Astro2.props;
  const buttonHref = `/${lang === "en" ? "" : lang + "/"}biography`;
  return renderTemplate`<AboutArtistSectionLogic
  client:visible
  title=${t("home.aboutArtistTitle")}
subtitle=${t("home.aboutArtistSubtitle")}
buttonText=${t("home.aboutArtistButton")}
buttonHref=${buttonHref}
/`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/components/sections/index/AboutArtistSection.astro", void 0);

const $$Astro$2 = createAstro();
const $$StylesSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$StylesSection;
  const { t, lang } = Astro2.props;
  const basePath = typeof lang === "string" && lang !== "en" ? `/${lang}` : "";
  const tattoosHref = `${basePath}/tattoos`;
  const cards = [
    {
      key: "animals",
      title: t("tattoos.filterAnimals"),
      description: t("home.animals.description"),
      badge: t("tattoos.filterAnimals"),
      image: koiFish.src,
      filterLabel: t("tattoos.filterAnimals"),
      href: tattoosHref
    },
    {
      key: "colour",
      title: t("tattoos.filterColour"),
      description: t("home.colour.description"),
      badge: t("tattoos.filterColour"),
      image: tattoo3.src,
      filterLabel: t("tattoos.filterColour"),
      href: tattoosHref
    },
    {
      key: "fineline",
      title: t("home.fineline.title"),
      description: t("home.fineline.description"),
      badge: t("home.fineline.title"),
      image: tattoo1.src,
      filterLabel: t("tattoos.filterFineline"),
      href: tattoosHref
    }
  ];
  return renderTemplate`<StylesSectionLogic
  client:visible
  heading=${t("home.stylesTitle")}
intro=${t("home.stylesIntro")}
cards=${cards}
ctaAllLabel=${t("home.viewGallery")}
ctaAllHref=${tattoosHref}
/`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/components/sections/index/StylesSection.astro", void 0);

const $$Astro$1 = createAstro();
const $$NewsletterSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$NewsletterSection;
  const { t } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-20 px-4 max-w-7xl mx-auto" data-astro-cid-fxeckhkc> <div class="max-w-3xl mx-auto text-center space-y-6" data-astro-cid-fxeckhkc> <p class="text-sm uppercase tracking-[0.18em] text-neutral-500 animate-fade-in-up" data-astro-cid-fxeckhkc>Newsletter</p> <h2 class="text-4xl md:text-5xl font-serif text-black animate-fade-in-up delay-100" data-astro-cid-fxeckhkc>${t("home.newsletterTitle")}</h2> <p class="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto animate-fade-in-up delay-200" data-astro-cid-fxeckhkc>${t("home.newsletterDescription")}</p> <form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4 animate-scale-in delay-300" id="newsletter-form" data-astro-cid-fxeckhkc> <input type="email"${addAttribute(t("home.emailPlaceholder"), "placeholder")} required class="flex-1 px-5 py-3 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-300 text-black placeholder:text-neutral-400" data-astro-cid-fxeckhkc> <button type="submit" class="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-medium transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95" data-astro-cid-fxeckhkc>${t("home.subscribe")}</button> </form> <p class="text-sm text-neutral-500 pt-2 animate-fade-in-up delay-300" data-astro-cid-fxeckhkc>${t("home.newsletterDisclaimer")}</p> </div> </section>`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/components/sections/index/NewsletterSection.astro", void 0);

const aboutImage = new Proxy({"src":"/_astro/Niki-about-me.B4Sq1drr.avif","width":583,"height":939,"format":"avif"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/home/Niki-about-me.avif";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro();
const $$AboutPreviewSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AboutPreviewSection;
  const { lang, t } = Astro2.props;
  const basePath = typeof lang === "string" && lang !== "en" ? `/${lang}` : "";
  const biographyHref = `${basePath}/biography`;
  return renderTemplate`<AboutPreviewSectionLogic
  client:visible
  heading=${t("home.aboutTitle")}
text1=${t("home.aboutText1")}
text2=${t("home.aboutText2")}
ctaLabel=${t("home.learnMore")}
ctaHref=${biographyHref}
imageSrc=${aboutImage.src}
imageAlt=${t("home.photoPlaceholder")}
/`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/components/sections/index/AboutPreviewSection.astro", void 0);

export { $$HeroSection as $, $$AboutArtistSection as a, $$StylesSection as b, $$NewsletterSection as c, $$AboutPreviewSection as d };
