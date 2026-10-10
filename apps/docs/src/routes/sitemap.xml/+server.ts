import { components, guides } from '#lib/docs/components.js';
import { SITE_URL } from '#lib/docs/site.js';

// Every public page, for search engines. /components is a test page and stays out.
export const prerender = true;

export function GET() {
	const paths = [
		'/',
		...guides.map((g) => g.href),
		...components.map((c) => `/docs/components/${c.slug}`)
	];
	const urls = paths.map((path) => `\t<url><loc>${SITE_URL}${path}</loc></url>`).join('\n');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
}
