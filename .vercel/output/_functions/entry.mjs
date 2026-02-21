import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CmqJRGjj.mjs';
import { manifest } from './manifest_D28AoEa5.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/biography.astro.mjs');
const _page2 = () => import('./pages/ceramics.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/es/biography.astro.mjs');
const _page5 = () => import('./pages/es/ceramics.astro.mjs');
const _page6 = () => import('./pages/es/contact.astro.mjs');
const _page7 = () => import('./pages/es/faqs.astro.mjs');
const _page8 = () => import('./pages/es/murals.astro.mjs');
const _page9 = () => import('./pages/es/tattoos.astro.mjs');
const _page10 = () => import('./pages/es/works.astro.mjs');
const _page11 = () => import('./pages/es.astro.mjs');
const _page12 = () => import('./pages/faqs.astro.mjs');
const _page13 = () => import('./pages/murals.astro.mjs');
const _page14 = () => import('./pages/tattoos.astro.mjs');
const _page15 = () => import('./pages/works.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/biography.astro", _page1],
    ["src/pages/ceramics.astro", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/es/biography.astro", _page4],
    ["src/pages/es/ceramics.astro", _page5],
    ["src/pages/es/contact.astro", _page6],
    ["src/pages/es/faqs.astro", _page7],
    ["src/pages/es/murals.astro", _page8],
    ["src/pages/es/tattoos.astro", _page9],
    ["src/pages/es/works.astro", _page10],
    ["src/pages/es/index.astro", _page11],
    ["src/pages/faqs.astro", _page12],
    ["src/pages/murals.astro", _page13],
    ["src/pages/tattoos.astro", _page14],
    ["src/pages/works.astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "f1d60553-548a-4584-b3dc-2117fe59eb36",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
