import { docsPaths } from '#lib/docs/components.js';
import { frameworks } from '#lib/docs/framework.svelte.js';
import { SITE_URL } from '#lib/docs/site.js';

// Every public page, for search engines, with each docs page once per framework. /components is a
// test page and stays out.
export const prerender = true;

export function GET() {
	const paths = ['/', ...frameworks.flatMap(({ id }) => docsPaths.map((path) => `/${id}${path}`))];
	const urls = paths.map((path) => `\t<url><loc>${SITE_URL}${path}</loc></url>`).join('\n');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
}
