import { d as defineMiddleware, s as sequence } from './chunks/index_C9-3kmvG.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_l8ogbFnI.mjs';
import 'piccolore';
import './chunks/astro/server_DMGT1YWJ.mjs';
import 'clsx';
import 'cookie';

const COOKIE_NAME = "preferred-language";
const onRequest$1 = defineMiddleware(async (context, next) => {
  const url = context.url;
  const pathname = url.pathname;
  if (pathname.includes(".") || pathname.startsWith("/_")) {
    return next();
  }
  if (pathname.startsWith("/es/")) {
    return next();
  }
  if (pathname !== "/" && pathname !== "") {
    return next();
  }
  if (pathname === "/" || pathname === "") {
    const cookieLang = context.cookies.get(COOKIE_NAME)?.value;
    if (cookieLang === "es") {
      return context.redirect("/es/");
    }
    const acceptLanguage = context.request.headers.get("accept-language");
    if (acceptLanguage) {
      const preferredLang = acceptLanguage.split(",")[0].split("-")[0].toLowerCase();
      if (preferredLang === "es") {
        context.cookies.set(COOKIE_NAME, "es", { path: "/", maxAge: 31536e3 });
        return context.redirect("/es/");
      }
    }
    if (!cookieLang) {
      context.cookies.set(COOKIE_NAME, "en", { path: "/", maxAge: 31536e3 });
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
