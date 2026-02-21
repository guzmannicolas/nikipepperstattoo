import { c as createComponent, a as createAstro, m as maybeRenderHead, b as renderTemplate } from './astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$HeroTitlePages = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeroTitlePages;
  const { lang, t, ns = "tattoos" } = Astro2.props;
  return renderTemplate`<!-- Content -->${maybeRenderHead()}<div class="relative z-10 text-center mb-16"> <h1 class="text-5xl font-bold mb-4 text-black"> ${t(`${ns}.title`)} </h1> <p class="text-neutral-600 text-lg max-w-2xl mx-auto pt-10"> ${t(`${ns}.description`)} </p> </div>`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/components/sections/HeroTitlePages.astro", void 0);

export { $$HeroTitlePages as $ };
