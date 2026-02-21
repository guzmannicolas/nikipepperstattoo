import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import { g as getLangFromUrl, u as useTranslations, $ as $$Layout } from '../chunks/Layout_CN9swjpg.mjs';
import { $ as $$HeroSection, a as $$AboutArtistSection, b as $$StylesSection, c as $$NewsletterSection, d as $$AboutPreviewSection } from '../chunks/AboutPreviewSection_BUMZF5_h.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Niki Peppers - ${t("home.title")}` }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="relative bg-white overflow-hidden"> <!-- Video Background for both sections --> <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover opacity-50 z-0" poster="/images/hero-poster.jpg"> <source src="/videos/video-hero.webm" type="video/webm"> <source src="/videos/video-hero.mp4" type="video/mp4"> </video> <!-- Hero Section (componentized) --> ${renderComponent($$result2, "HeroSection", $$HeroSection, { "lang": lang, "t": t })} <!-- About Artist Section (componentized) --> ${renderComponent($$result2, "AboutArtistSection", $$AboutArtistSection, { "lang": lang, "t": t })} </div>  ${renderComponent($$result2, "StylesSection", $$StylesSection, { "t": t })}  ${renderComponent($$result2, "NewsletterSection", $$NewsletterSection, { "t": t })}  ${renderComponent($$result2, "AboutPreviewSection", $$AboutPreviewSection, { "lang": lang, "t": t })} ` })}`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/pages/es/index.astro", void 0);

const $$file = "C:/xampp/htdocs/nikipepperstattoo/src/pages/es/index.astro";
const $$url = "/es";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
