import { c as createComponent, a as createAstro, m as maybeRenderHead, d as addAttribute, f as renderSlot, r as renderComponent, e as renderScript, b as renderTemplate } from './astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import { $ as $$FilterButtons } from './CTASection_tkeAq7BM.mjs';
import { a as $$LoadMore } from './CrossPromo_DGI8-yFN.mjs';
/* empty css                            */

const $$Astro = createAstro();
const $$Gallery = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Gallery;
  const {
    items = [],
    id = "gallery",
    showInitialCount = 6,
    loadMoreLabel
  } = Astro2.props;
  const categorySet = /* @__PURE__ */ new Set();
  for (const it of items) {
    if (!it) continue;
    let cats = [];
    if (Array.isArray(it.categories)) {
      cats = it.categories.map((c) => String(c));
    } else if (typeof it.categories === "string") {
      cats = it.categories.split(",").map((c) => c.trim());
    } else if (it.categories) {
      cats = [String(it.categories)];
    }
    for (const c of cats) {
      if (c) categorySet.add(c);
    }
  }
  const defaultButtons = [
    { label: "All", value: "all" },
    ...Array.from(categorySet).map((c) => ({
      label: String(c).replace(/[-_]/g, " "),
      value: String(c)
    }))
  ];
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")} class="gallery-component"> <div class="mb-8 text-center"> ${renderSlot($$result, $$slots["filters"], renderTemplate` ${renderComponent($$result, "FilterButtons", $$FilterButtons, { "buttons": defaultButtons })} `)} </div> <div${addAttribute(`${id}-grid`, "id")} class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> ${items.map((item, i) => {
    const srcVal = item?.image ?? item?.thumb ?? item?.src ?? "";
    const src = typeof srcVal === "string" ? srcVal : srcVal && srcVal.src ? srcVal.src : "";
    const w = typeof srcVal !== "string" && srcVal?.width ? srcVal.width : 1600;
    const h = typeof srcVal !== "string" && srcVal?.height ? srcVal.height : 1200;
    const alt = item?.alt ?? item?.title ?? "";
    const cats = Array.isArray(item?.categories) ? item.categories.join(",") : item?.categories || "";
    return renderTemplate`<figure${addAttribute([
      "gallery-item relative overflow-hidden rounded-xl bg-neutral-100 border-2 border-neutral-200",
      i >= showInitialCount ? "hidden" : ""
    ], "class:list")}${addAttribute(cats, "data-categories")}${addAttribute(i, "data-index")}> <a class="block"${addAttribute(src, "href")}${addAttribute(w, "data-pswp-width")}${addAttribute(h, "data-pswp-height")} data-action="open-pswp"${addAttribute(i, "data-index")}> <img${addAttribute(src, "src")}${addAttribute(alt, "alt")} class="w-full h-full object-cover aspect-square"> <div class="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-end opacity-0 hover:opacity-100"> <div class="p-4 text-white"> <h3 class="text-lg font-bold">${item?.title}</h3> ${item?.categories ? renderTemplate`<p class="text-sm mt-1"> ${item.displayCategories ? item.displayCategories : Array.isArray(item.categories) ? item.categories.join(", ") : item.categories} </p>` : null} </div> </div> </a> </figure>`;
  })} </div> <div class="text-center mt-8"> ${renderComponent($$result, "LoadMore", $$LoadMore, { "buttonId": `${id}-load-more-btn`, "label": loadMoreLabel })} </div> ${renderScript($$result, "C:/xampp/htdocs/nikipepperstattoo/src/components/ui/Gallery.astro?astro&type=script&index=0&lang.ts")} </section>`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/components/ui/Gallery.astro", void 0);

export { $$Gallery as $ };
