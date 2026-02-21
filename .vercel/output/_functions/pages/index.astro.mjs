import { c as createComponent, a as createAstro, b as renderTemplate, r as renderComponent } from '../chunks/astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import { g as getLangFromUrl, u as useTranslations, $ as $$Layout } from '../chunks/Layout_CN9swjpg.mjs';
import { $ as $$HeroSection, a as $$AboutArtistSection, b as $$StylesSection, c as $$NewsletterSection, d as $$AboutPreviewSection } from '../chunks/AboutPreviewSection_BUMZF5_h.mjs';
import 'clsx';
import { t as tattoo1, a as tattoo3 } from '../chunks/blue-flower-tattoo-green-leaves-forearm_dCvMlDZa.mjs';
import { t as tattoo2 } from '../chunks/pink-flower-forearm-tattoo-wrist-design_DONxfIEh.mjs';
import { w as work1, c as work2, d as work3 } from '../chunks/river-rose-or-lily_4M-qhy06.mjs';
import { c as ceramic1, b as ceramic2, a as ceramic3 } from '../chunks/Coral candle holder_C7z72fGt.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$FeaturedWork = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FeaturedWork;
  const { t } = Astro2.props;
  const col1Images = [tattoo1.src, tattoo2.src, tattoo3.src];
  const col2Images = [work1.src, work2.src, work3.src];
  const col3Images = [ceramic1.src, ceramic2.src, ceramic3.src];
  const title = t("featuredWork.title");
  const description = t("featuredWork.description");
  return renderTemplate`<FeaturedWorkLogic 
  client:load 
  title=${title}
description=${description}
col1Images=${col1Images}
col2Images=${col2Images}
col3Images=${col3Images}
/`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/components/sections/index/FeaturedWork.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Niki Peppers - ${t("home.title")}` }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "HeroSection", $$HeroSection, { "lang": lang, "t": t })}  ${renderComponent($$result2, "FeaturedWork", $$FeaturedWork, { "lang": lang, "t": t })}  ${renderComponent($$result2, "AboutArtistSection", $$AboutArtistSection, { "lang": lang, "t": t })}  ${renderComponent($$result2, "StylesSection", $$StylesSection, { "t": t })}  ${renderComponent($$result2, "NewsletterSection", $$NewsletterSection, { "t": t })}  ${renderComponent($$result2, "AboutPreviewSection", $$AboutPreviewSection, { "lang": lang, "t": t })} ` })}`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/pages/index.astro", void 0);

const $$file = "C:/xampp/htdocs/nikipepperstattoo/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
