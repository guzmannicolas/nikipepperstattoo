import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import { g as getLangFromUrl, u as useTranslations, $ as $$Layout } from '../chunks/Layout_CN9swjpg.mjs';
import { $ as $$FilterButtons, a as $$CTASection } from '../chunks/CTASection_tkeAq7BM.mjs';
import { $ as $$FAQList } from '../chunks/FAQList_BrNj9FrS.mjs';
import { $ as $$HeroTitlePages } from '../chunks/HeroTitlePages_BoTSlCjn.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Faqs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Faqs;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const faqs = [
    // Tattoos
    {
      category: "tattoos",
      question: "How do I book a tattoo?",
      answer: "Send your idea via the contact form with references and size/placement. I'll reply with availability, an estimate, and the next steps. A deposit may be required to secure a date."
    },
    {
      category: "tattoos",
      question: "Does it hurt?",
      answer: "Pain varies by person and body area. I work gently, take breaks when needed, and provide aftercare instructions to ensure a smooth healing process."
    },
    {
      category: "tattoos",
      question: "How should I prepare?",
      answer: "Sleep well, stay hydrated, and eat before your session. Avoid alcohol and blood thinners 24 hours prior. Wear comfortable clothing that provides easy access to the area."
    },
    // Ceramics
    {
      category: "ceramics",
      question: "Do you accept custom ceramic orders?",
      answer: "Yes. Share your idea, function, measurements, and preferred finish. I'll confirm feasibility and an estimated timeline before starting."
    },
    {
      category: "ceramics",
      question: "How long does a ceramic commission take?",
      answer: "Typically 3\u20136 weeks depending on complexity, drying times, glazing, and kiln availability."
    },
    {
      category: "ceramics",
      question: "Are your ceramic pieces dishwasher/microwave safe?",
      answer: "Most functional pieces are dishwasher safe and microwave friendly unless stated otherwise. Sculptural pieces are for display only."
    },
    // Artworks
    {
      category: "artworks",
      question: "Are original paintings available for purchase?",
      answer: "Yes, selected works are available. If you're interested in a specific piece or commission, please reach out to discuss availability and pricing."
    },
    {
      category: "artworks",
      question: "Do you offer prints?",
      answer: "Limited edition prints may be available for certain pieces. Ask about current editions and sizes."
    },
    {
      category: "artworks",
      question: "What mediums do you use?",
      answer: "Primarily oil and acrylic on canvas, watercolor on paper, and mixed media depending on the series."
    },
    // Orders / Commissions
    {
      category: "orders",
      question: "How do commissions work?",
      answer: "We discuss your idea, timeline, budget, and references. I'll propose a concept and quote. A deposit starts the project; the balance is due upon delivery."
    },
    {
      category: "orders",
      question: "What payment methods do you accept?",
      answer: "Common digital methods and bank transfers are accepted. Details will be provided during booking."
    },
    // General
    {
      category: "general",
      question: "Where are you located?",
      answer: "Based in Buenos Aires, Argentina. Some projects can be arranged remotely\u2014feel free to ask."
    },
    {
      category: "general",
      question: "How long to receive a reply?",
      answer: "I typically respond within 1\u20133 business days. If it's urgent, mention it in your message."
    }
  ];
  const filterButtons = [
    { label: "All", value: "all", active: true },
    { label: t("faqs.categories.tattoos"), value: "tattoos" },
    { label: t("faqs.categories.ceramics"), value: "ceramics" },
    { label: t("faqs.categories.artworks"), value: "artworks" },
    { label: t("faqs.categories.orders"), value: "orders" },
    { label: t("faqs.categories.general"), value: "general" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t("faqs.title")} - Niki Peppers`, "description": t("faqs.description") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-29 px-4 max-w-5xl mx-auto"> <!-- Hero Title Pages Section (componentized) --> ${renderComponent($$result2, "HeroTitlePages", $$HeroTitlePages, { "lang": lang, "t": t, "ns": "faqs" })} <!-- Category Filters --> ${renderComponent($$result2, "FilterButtons", $$FilterButtons, { "buttons": filterButtons })} <!-- FAQ List --> ${renderComponent($$result2, "FAQList", $$FAQList, { "faqs": faqs })} </section>  ${renderComponent($$result2, "CTASection", $$CTASection, { "lang": lang, "t": t, "ns": "faqs" })} ` })}`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/pages/faqs.astro", void 0);

const $$file = "C:/xampp/htdocs/nikipepperstattoo/src/pages/faqs.astro";
const $$url = "/faqs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Faqs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
