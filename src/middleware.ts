import { defineMiddleware } from 'astro:middleware';

const COOKIE_NAME = 'preferred-language';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url;
  const pathname = url.pathname;
  
  // Skip middleware for static assets
  if (pathname.includes('.') || pathname.startsWith('/_')) {
    return next();
  }
  
  // Check if already on a localized path (only /es/ since en has no prefix)
  if (pathname.startsWith('/es/')) {
    return next();
  }
  
  // Skip if on root path (English default)
  if (pathname !== '/' && pathname !== '') {
    return next();
  }
  
  // Root path - detect language and redirect if Spanish
  if (pathname === '/' || pathname === '') {
    // 1. Check cookie first
    const cookieLang = context.cookies.get(COOKIE_NAME)?.value;
    if (cookieLang === 'es') {
      return context.redirect('/es/');
    }
    
    // 2. Check Accept-Language header
    const acceptLanguage = context.request.headers.get('accept-language');
    if (acceptLanguage) {
      const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
      if (preferredLang === 'es') {
        context.cookies.set(COOKIE_NAME, 'es', { path: '/', maxAge: 31536000 });
        return context.redirect('/es/');
      }
    }
    
    // 3. Default to English (stay on / - no redirect needed)
    if (!cookieLang) {
      context.cookies.set(COOKIE_NAME, 'en', { path: '/', maxAge: 31536000 });
    }
  }
  
  return next();
});
