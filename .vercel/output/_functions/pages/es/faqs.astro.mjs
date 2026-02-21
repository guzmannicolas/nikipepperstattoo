import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DMGT1YWJ.mjs';
import 'piccolore';
import { g as getLangFromUrl, u as useTranslations, $ as $$Layout } from '../../chunks/Layout_CN9swjpg.mjs';
import { $ as $$FilterButtons, a as $$CTASection } from '../../chunks/CTASection_tkeAq7BM.mjs';
import { $ as $$FAQList } from '../../chunks/FAQList_BrNj9FrS.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Faqs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Faqs;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const faqs = [
    // Tatuajes
    {
      category: "tattoos",
      question: "\xBFC\xF3mo reservo un tatuaje?",
      answer: "Envi\xE1 tu idea a trav\xE9s del formulario de contacto con referencias y tama\xF1o/ubicaci\xF3n. Te responder\xE9 con disponibilidad, un presupuesto y los pr\xF3ximos pasos. Puede requerirse un dep\xF3sito para asegurar la fecha."
    },
    {
      category: "tattoos",
      question: "\xBFDuele?",
      answer: "El dolor var\xEDa seg\xFAn la persona y la zona del cuerpo. Trabajo con cuidado, tomo descansos cuando es necesario y proporciono instrucciones de cuidado posterior para asegurar un proceso de curaci\xF3n suave."
    },
    {
      category: "tattoos",
      question: "\xBFC\xF3mo debo prepararme?",
      answer: "Dorm\xED bien, mantente hidratada y com\xE9 antes de tu sesi\xF3n. Evit\xE1 el alcohol y anticoagulantes 24 horas antes. Us\xE1 ropa c\xF3moda que permita f\xE1cil acceso a la zona."
    },
    // Cerámica
    {
      category: "ceramics",
      question: "\xBFAcept\xE1s pedidos de cer\xE1mica personalizados?",
      answer: "S\xED. Compart\xED tu idea, funci\xF3n, medidas y acabado preferido. Confirmar\xE9 la viabilidad y un cronograma estimado antes de comenzar."
    },
    {
      category: "ceramics",
      question: "\xBFCu\xE1nto tiempo lleva una comisi\xF3n de cer\xE1mica?",
      answer: "T\xEDpicamente 3\u20136 semanas dependiendo de la complejidad, tiempos de secado, esmaltado y disponibilidad del horno."
    },
    {
      category: "ceramics",
      question: "\xBFTus piezas de cer\xE1mica son aptas para lavavajillas/microondas?",
      answer: "La mayor\xEDa de las piezas funcionales son aptas para lavavajillas y microondas a menos que se indique lo contrario. Las piezas escult\xF3ricas son solo para exhibici\xF3n."
    },
    // Obras
    {
      category: "artworks",
      question: "\xBFLas pinturas originales est\xE1n disponibles para compra?",
      answer: "S\xED, obras seleccionadas est\xE1n disponibles. Si te interesa una pieza espec\xEDfica o una comisi\xF3n, por favor contactame para discutir disponibilidad y precios."
    },
    {
      category: "artworks",
      question: "\xBFOfrec\xE9s impresiones?",
      answer: "Pueden estar disponibles impresiones de edici\xF3n limitada para ciertas piezas. Pregunt\xE1 sobre ediciones y tama\xF1os actuales."
    },
    {
      category: "artworks",
      question: "\xBFQu\xE9 medios us\xE1s?",
      answer: "Principalmente \xF3leo y acr\xEDlico sobre lienzo, acuarela sobre papel y t\xE9cnica mixta dependiendo de la serie."
    },
    // Pedidos / Comisiones
    {
      category: "orders",
      question: "\xBFC\xF3mo funcionan las comisiones?",
      answer: "Discutimos tu idea, cronograma, presupuesto y referencias. Propondr\xE9 un concepto y presupuesto. Un dep\xF3sito inicia el proyecto; el saldo se paga al entregar."
    },
    {
      category: "orders",
      question: "\xBFQu\xE9 m\xE9todos de pago acept\xE1s?",
      answer: "Se aceptan m\xE9todos digitales comunes y transferencias bancarias. Los detalles se proporcionar\xE1n durante la reserva."
    },
    // General
    {
      category: "general",
      question: "\xBFD\xF3nde est\xE1s ubicada?",
      answer: "Con base en Buenos Aires, Argentina. Algunos proyectos pueden organizarse de forma remota\u2014no dudes en preguntar."
    },
    {
      category: "general",
      question: "\xBFCu\xE1nto tiempo para recibir una respuesta?",
      answer: "T\xEDpicamente respondo dentro de 1\u20133 d\xEDas h\xE1biles. Si es urgente, mencionalo en tu mensaje."
    }
  ];
  const filterButtons = [
    { label: "Todos", value: "all", active: true },
    { label: t("faqs.categories.tattoos"), value: "tattoos" },
    { label: t("faqs.categories.ceramics"), value: "ceramics" },
    { label: t("faqs.categories.artworks"), value: "artworks" },
    { label: t("faqs.categories.orders"), value: "orders" },
    { label: t("faqs.categories.general"), value: "general" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t("faqs.title")} - Niki Peppers`, "description": t("faqs.description") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 px-4 max-w-5xl mx-auto"> <div class="text-center mb-10"> <h1 class="text-5xl font-bold mb-4 text-black">${t("faqs.title")}</h1> <p class="text-neutral-600 text-lg max-w-2xl mx-auto"> ${t("faqs.description")} </p> </div> <!-- Category Filters --> ${renderComponent($$result2, "FilterButtons", $$FilterButtons, { "buttons": filterButtons })} <!-- FAQ List --> ${renderComponent($$result2, "FAQList", $$FAQList, { "faqs": faqs })} </section>  ${renderComponent($$result2, "CTASection", $$CTASection, { "lang": lang, "t": t, "ns": "faqs" })} ` })}`;
}, "C:/xampp/htdocs/nikipepperstattoo/src/pages/es/faqs.astro", void 0);

const $$file = "C:/xampp/htdocs/nikipepperstattoo/src/pages/es/faqs.astro";
const $$url = "/es/faqs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Faqs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
