import { defineMiddleware } from 'astro:middleware';

// No-op middleware for static (SSG) deployment. Kept to preserve file structure
// but it simply forwards the request.
export const onRequest = defineMiddleware(async (_context, next) => {
	return next();
});
