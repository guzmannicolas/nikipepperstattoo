import { c as createComponent, a as createAstro, m as maybeRenderHead, e as renderScript, d as addAttribute, b as renderTemplate } from './astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$FAQList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FAQList;
  const { faqs } = Astro2.props;
  return renderTemplate`<!-- FAQ List -->${maybeRenderHead()}<div class="space-y-4"> ${faqs.map((item, idx) => renderTemplate`<details class="faq-item group bg-white border border-neutral-200 rounded-xl"${addAttribute(item.category, "data-category")}${addAttribute(idx === 0, "open")}> <summary class="cursor-pointer list-none px-5 py-4 flex items-start justify-between gap-4"> <span class="font-semibold text-black"> ${item.question} </span> <svg class="w-5 h-5 text-neutral-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </summary> <div class="px-5 pb-5 text-neutral-700 leading-relaxed"> ${item.answer} </div> </details>`)} </div> ${renderScript($$result, "C:/xampp/htdocs/nikipepperstattoo/src/components/sections/faqs/FAQList.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/components/sections/faqs/FAQList.astro", void 0);

export { $$FAQList as $ };
