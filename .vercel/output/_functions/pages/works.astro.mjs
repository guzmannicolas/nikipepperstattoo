import { w as worksData, _ as __vite_glob_0_15, a as __vite_glob_0_14, b as __vite_glob_0_13, c as __vite_glob_0_12, d as __vite_glob_0_11, e as __vite_glob_0_10, f as __vite_glob_0_6, g as __vite_glob_0_5, h as __vite_glob_0_4, i as __vite_glob_0_3, j as __vite_glob_0_2, k as __vite_glob_0_1, l as __vite_glob_0_0, $ as $$GalleryPlus, m as $$AboutSeriesSection } from '../chunks/works_CmvHpbb-.mjs';
import { _ as __vite_glob_0_9, a as __vite_glob_0_8, b as __vite_glob_0_7 } from '../chunks/river-rose-or-lily_4M-qhy06.mjs';
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import { g as getLangFromUrl, u as useTranslations, $ as $$Layout } from '../chunks/Layout_CN9swjpg.mjs';
import { $ as $$FilterButtons, a as $$CTASection } from '../chunks/CTASection_tkeAq7BM.mjs';
import { $ as $$CrossPromo } from '../chunks/CrossPromo_DGI8-yFN.mjs';
import { $ as $$HeroTitlePages } from '../chunks/HeroTitlePages_BoTSlCjn.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Works = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Works;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const paintings = worksData;
  const images = /* #__PURE__ */ Object.assign({"/src/assets/works/amid_gestures,_gazes_and_shared_memories/camila-and-milena.avif": __vite_glob_0_0,"/src/assets/works/amid_gestures,_gazes_and_shared_memories/movement-as-a-creative-engine-fatima-and-milena.avif": __vite_glob_0_1,"/src/assets/works/amid_gestures,_gazes_and_shared_memories/the-photographer.avif": __vite_glob_0_2,"/src/assets/works/childhood/cinderella-of-ballester.avif": __vite_glob_0_3,"/src/assets/works/childhood/imagination.avif": __vite_glob_0_4,"/src/assets/works/childhood/it-goes-up-and-down.avif": __vite_glob_0_5,"/src/assets/works/echoes_from_the_deep/calis.avif": __vite_glob_0_6,"/src/assets/works/echoes_from_the_deep/mind-and-body.avif": __vite_glob_0_7,"/src/assets/works/echoes_from_the_deep/orange-rose.avif": __vite_glob_0_8,"/src/assets/works/echoes_from_the_deep/river-rose-or-lily.avif": __vite_glob_0_9,"/src/assets/works/echoes_from_the_deep/the-lotus-as-a-symbol-of-resilience.avif": __vite_glob_0_10,"/src/assets/works/echoes_from_the_deep/the-origin.avif": __vite_glob_0_11,"/src/assets/works/on_demand/float.avif": __vite_glob_0_12,"/src/assets/works/on_demand/patagonia-triptych.avif": __vite_glob_0_13,"/src/assets/works/on_demand/pet-portrait.avif": __vite_glob_0_14,"/src/assets/works/on_demand/remembrance-of-family.avif": __vite_glob_0_15


});
  const galleryItems = paintings.map((p) => {
    const imagePath = p.image;
    const imageModule = images[imagePath];
    return {
      ...p,
      title: p.title.en,
      technique: p.technique,
      categories: p.series,
      image: imageModule ? imageModule.default : ""
    };
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t("artworks.title")} - Niki Peppers`, "description": t("artworks.description") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-29 px-4 max-w-7xl mx-auto"> <!-- Hero Title Pages Section (componentized) --> ${renderComponent($$result2, "HeroTitlePages", $$HeroTitlePages, { "lang": lang, "t": t, "ns": "artworks" })} ${renderComponent($$result2, "GalleryPlus", $$GalleryPlus, { "items": galleryItems, "showInitialCount": 6, "loadMoreLabel": t("tattoos.loadMore") }, { "filters": ($$result3) => renderTemplate`<div> ${(() => {
    const buttons = [
      {
        label: t("artworks.filters.all") || "All",
        value: "all",
        active: true
      },
      {
        label: t("artworks.filters.echoes") || "Echoes from the deep",
        value: "echoes"
      },
      {
        label: t("artworks.filters.gestures") || "Amidst gestures...",
        value: "gestures"
      },
      {
        label: t("artworks.filters.childhood") || "Childhood",
        value: "childhood"
      },
      {
        label: t("artworks.filters.on_demand") || "On Demand",
        value: "on_demand"
      }
    ];
    return renderTemplate`${renderComponent($$result3, "FilterButtons", $$FilterButtons, { "buttons": buttons })}`;
  })()} </div>` })} </section>  ${renderComponent($$result2, "AboutSeriesSection", $$AboutSeriesSection, { "lang": lang })}  ${renderComponent($$result2, "CTASection", $$CTASection, { "lang": lang, "t": t, "ns": "artworks" })} ${renderComponent($$result2, "CrossPromo", $$CrossPromo, { "lang": lang })} ` })}`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/pages/works.astro", void 0);

const $$file = "C:/xampp/htdocs/nikipepperstattoo/src/pages/works.astro";
const $$url = "/works";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Works,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
