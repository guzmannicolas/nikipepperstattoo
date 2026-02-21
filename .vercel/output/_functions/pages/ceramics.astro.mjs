import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import { g as getLangFromUrl, u as useTranslations, $ as $$Layout } from '../chunks/Layout_CN9swjpg.mjs';
import { c as ceramicsData, a as cer10, b as cer9, d as cer8, e as cer7, f as cer6, g as cer5, h as cer2, i as cer1, $ as $$AboutCeramicsSection } from '../chunks/AboutCeramicsSection_iJvbZrz_.mjs';
import { c as ceramic1, a as ceramic3, b as ceramic2 } from '../chunks/Coral candle holder_C7z72fGt.mjs';
import { $ as $$FilterButtons, a as $$CTASection } from '../chunks/CTASection_tkeAq7BM.mjs';
import { $ as $$Gallery } from '../chunks/Gallery_CmJs6cLd.mjs';
import { $ as $$CrossPromo } from '../chunks/CrossPromo_DGI8-yFN.mjs';
import { $ as $$HeroTitlePages } from '../chunks/HeroTitlePages_BoTSlCjn.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Ceramics = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ceramics;
  const assetMap = {
    "Mateta Pisces - Back.avif": cer1,
    "Mateta Pisces - Front.avif": cer2,
    "Kisses pot.avif": ceramic2,
    "Leaf mask.avif": ceramic3,
    "Pop pot - Back.avif": cer5,
    "Pop pot - Front.avif": cer6,
    "Chrysanthemum bowl - Side view.avif": cer7,
    "Chrysanthemum bowl - Inside view.avif": cer8,
    "Pisces bowl - Inside view.avif": cer9,
    "Pisces bowl - Side view.avif": cer10,
    "Coral candle holder.avif": ceramic1
  };
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const galleryItems = ceramicsData.items.map((item) => {
    const srcPath = item.images && item.images[0] ? item.images[0].path : "";
    const filename = srcPath ? srcPath.split("/").pop() : "";
    const has = filename && Object.prototype.hasOwnProperty.call(assetMap, filename);
    const image = has ? assetMap[filename] : srcPath;
    return {
      image,
      title: item.title.en,
      alt: item.images && item.images[0] ? item.images[0].alt || "" : "",
      categories: item.category
    };
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t("ceramics.title")} - Niki Peppers`, "description": t("ceramics.description"), "data-astro-cid-lbgnciw6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-29 px-4 max-w-7xl mx-auto" data-astro-cid-lbgnciw6> <!-- Hero Title Pages Section (componentized) --> ${renderComponent($$result2, "HeroTitlePages", $$HeroTitlePages, { "lang": lang, "t": t, "ns": "ceramics", "data-astro-cid-lbgnciw6": true })} <!-- Unified Gallery component (replaces manual grid + lightbox) --> ${renderComponent($$result2, "Gallery", $$Gallery, { "items": galleryItems, "id": "ceramics-gallery", "showInitialCount": 6, "loadMoreLabel": t("ceramics.loadMore"), "data-astro-cid-lbgnciw6": true }, { "filters": ($$result3) => renderTemplate`<div data-astro-cid-lbgnciw6> ${(() => {
    const buttons = [
      {
        label: t("ceramics.filters.all"),
        value: "all",
        active: true
      },
      {
        label: t("ceramics.filters.functional"),
        value: "functional"
      },
      {
        label: t("ceramics.filters.decorative"),
        value: "decorative"
      },
      {
        label: t("ceramics.filters.sculptural"),
        value: "sculptural"
      }
    ];
    return renderTemplate`${renderComponent($$result3, "FilterButtons", $$FilterButtons, { "buttons": buttons, "data-astro-cid-lbgnciw6": true })}`;
  })()} </div>` })} </section>  ${renderComponent($$result2, "AboutCeramicsSection", $$AboutCeramicsSection, { "t": t, "data-astro-cid-lbgnciw6": true })}  ${renderComponent($$result2, "CTASection", $$CTASection, { "lang": lang, "t": t, "ns": "ceramics", "data-astro-cid-lbgnciw6": true })} ${renderComponent($$result2, "CrossPromo", $$CrossPromo, { "lang": lang, "data-astro-cid-lbgnciw6": true })}  ` })}`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/pages/ceramics.astro", void 0);

const $$file = "C:/xampp/htdocs/nikipepperstattoo/src/pages/ceramics.astro";
const $$url = "/ceramics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Ceramics,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
