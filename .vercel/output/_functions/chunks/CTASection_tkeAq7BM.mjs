import { c as createComponent, a as createAstro, m as maybeRenderHead, e as renderScript, d as addAttribute, b as renderTemplate } from './astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import 'clsx';
/* empty css                            */

const $$Astro$1 = createAstro();
const $$FilterButtons = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FilterButtons;
  const { buttons = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-wrap justify-center relative mb-12 filter-carousel" data-astro-cid-ssuvmt7a> <!-- left arrow (mobile only) --> <button type="button" class="filter-prev md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-md text-lg text-neutral-800" aria-label="Anterior filtros" data-astro-cid-ssuvmt7a>&lt;</button> <div class="filter-scroll js-filter-scroll flex gap-4 px-4 py-2 overflow-x-auto md:overflow-visible md:flex-wrap no-scrollbar scroll-snap-x snap-mandatory" role="tablist" aria-label="Filtros" data-astro-cid-ssuvmt7a> ${buttons.map((b, i) => renderTemplate`<button type="button" role="tab" class="flex-shrink-0 filter-btn series-filter snap-start px-6 py-2 rounded-full font-semibold transition-all border-2 bg-white border-neutral-200 text-black hover:border-green-400 aria-[pressed=true]:bg-green-500 aria-[pressed=true]:text-white aria-[pressed=true]:border-transparent"${addAttribute(b.value, "data-filter")}${addAttribute(b.value, "data-value")}${addAttribute(b.active ? "true" : "false", "aria-pressed")} data-astro-cid-ssuvmt7a> ${b.label} </button>`)} </div> <!-- right arrow (mobile only) --> <button type="button" class="filter-next md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-md text-lg text-neutral-800" aria-label="Siguiente filtros" data-astro-cid-ssuvmt7a>&gt;</button> </div>  ${renderScript($$result, "C:/xampp/htdocs/nikipepperstattoo/src/components/buttons/FilterButtons.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/components/buttons/FilterButtons.astro", void 0);

const $$Astro = createAstro();
const $$CTASection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CTASection;
  const { lang, t, ns = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-20 px-4 bg-neutral-50 border-y border-neutral-200"> <div class="max-w-3xl mx-auto text-center"> <h2 class="text-3xl font-bold mb-4 text-black">${t(`${ns}.ctaTitle`)}</h2> <p class="text-neutral-600 mb-8 text-lg">${t(`${ns}.ctaSubtitle`)}</p> <a${addAttribute(`/${lang === "en" ? "" : lang + "/"}contact`, "href")} class="inline-block px-8 py-3 bg-black hover:bg-neutral-800 text-white rounded-lg font-semibold transition-colors"> ${t(`${ns}.ctaButton`)} </a> </div> </section>`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/components/calltoaction/CTASection.astro", void 0);

export { $$FilterButtons as $, $$CTASection as a };
