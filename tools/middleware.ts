// Moved middleware out of `src/` to avoid triggering SSR lambdas on Vercel.
// Kept as a copy for safekeeping; not imported by the build.
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (_context, next) => {
  return next();
});
