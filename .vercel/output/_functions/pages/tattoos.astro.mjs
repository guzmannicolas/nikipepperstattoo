import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import { g as getLangFromUrl, u as useTranslations, $ as $$Layout } from '../chunks/Layout_CN9swjpg.mjs';
import { $ as $$CrossPromo } from '../chunks/CrossPromo_DGI8-yFN.mjs';
import { $ as $$FilterButtons, a as $$CTASection } from '../chunks/CTASection_tkeAq7BM.mjs';
import { $ as $$HeroTitlePages } from '../chunks/HeroTitlePages_BoTSlCjn.mjs';
import { $ as $$Gallery } from '../chunks/Gallery_CmJs6cLd.mjs';
import { t as tattoosData, p as purpleWhite, s as succulent, b as birdForearm, r as redPoppyClose, a as birdFlowers, c as pinkPetals, l as lotusForearm } from '../chunks/purple-white-flower-forearm-tattoo-green-leaves_PXEDKPhy.mjs';
import { t as tattoo1, a as tattoo3, k as koiFish } from '../chunks/blue-flower-tattoo-green-leaves-forearm_dCvMlDZa.mjs';
import { t as tattoo2 } from '../chunks/pink-flower-forearm-tattoo-wrist-design_DONxfIEh.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Tattoos = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Tattoos;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const url = new URL(Astro2.url);
  const filterParam = url.searchParams.get("filter") || "all";
  const assetMap = {
    "koi-fish-tattoo-lily-pads-water-lilies.jpeg": koiFish,
    "forearm-pink-lotus-tattoo-leaves.jpg": lotusForearm,
    "pink-flower-tattoo-green-leaves-petals.jpg": pinkPetals,
    "red-poppies-blue-cornflowers-arm-tattoo.jpeg": tattoo3,
    "bird-tattoo-orange-grey-feathers-flowers.jpg": birdFlowers,
    "pink-flower-forearm-tattoo-wrist-design.jpg": tattoo2,
    "red-poppy-tattoo-chest-closeup.jpeg": redPoppyClose,
    "bird-tattoo-forearm-orange-grey-feathers.jpg": birdForearm,
    "blue-green-succulent-pink-yellow-flowers-tattoo.jpeg": succulent,
    "purple-white-flower-forearm-tattoo-green-leaves.jpg": purpleWhite,
    "blue-flower-tattoo-green-leaves-forearm.jpg": tattoo1
  };
  let galleryItems = tattoosData.items.map((item) => {
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
  if (filterParam !== "all") {
    galleryItems = galleryItems.filter((item) => {
      if (!item.categories) return false;
      if (Array.isArray(item.categories)) {
        return item.categories.includes(filterParam);
      }
      return String(item.categories).split(",").map((s) => s.trim()).includes(filterParam);
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t("tattoos.title")} - Niki Peppers`, "description": t("tattoos.description") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-29 px-4 max-w-7xl mx-auto"> <!-- Hero Title Pages Section (componentized) --> ${renderComponent($$result2, "HeroTitlePages", $$HeroTitlePages, { "lang": lang, "t": t, "ns": "tattoos" })} ${renderComponent($$result2, "Gallery", $$Gallery, { "items": galleryItems, "showInitialCount": 6, "loadMoreLabel": t("tattoos.loadMore") }, { "filters": ($$result3) => renderTemplate`<div> ${(() => {
    const buttons = [
      {
        label: t("tattoos.filterAll"),
        value: "all",
        active: filterParam === "all"
      },
      {
        label: t("tattoos.filterBotanical"),
        value: "botanical",
        active: filterParam === "botanical"
      },
      {
        label: t("tattoos.filterColour"),
        value: "colour",
        active: filterParam === "colour"
      },
      {
        label: t("tattoos.filterFineline"),
        value: "fineline",
        active: filterParam === "fineline"
      },
      {
        label: t("tattoos.filterAnimals"),
        value: "animals",
        active: filterParam === "animals"
      },
      { label: t("tattoos.filterOtros"), value: "otros", active: filterParam === "otros" }
    ];
    return renderTemplate`${renderComponent($$result3, "FilterButtons", $$FilterButtons, { "buttons": buttons })}`;
  })()} </div>` })} </section>  ${renderComponent($$result2, "CTASection", $$CTASection, { "lang": lang, "t": t, "ns": "tattoos" })} ${renderComponent($$result2, "CrossPromo", $$CrossPromo, { "lang": lang })} ` })}`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/pages/tattoos.astro", void 0);

const $$file = "C:/xampp/htdocs/nikipepperstattoo/src/pages/tattoos.astro";
const $$url = "/tattoos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Tattoos,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
