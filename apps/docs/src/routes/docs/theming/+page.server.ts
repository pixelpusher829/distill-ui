import { highlightAll } from '#lib/docs/highlight.server.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	code: await highlightAll({
		html: {
			lang: 'html',
			code: `<!-- Follow the visitor's system setting (the default) -->
<html>

<!-- Always dark, or always light -->
<html data-theme="dark">
<html data-theme="light">`
		},
		edit: {
			lang: 'css',
			title: 'src/lib/styles/distill-ui/themes/light.css',
			code: `:root,
[data-theme='light'] {
	color-scheme: light;

	--dui-color-primary: oklch(0.55 0.2 260);
	--dui-color-primary-foreground: oklch(0.985 0 0);
	/* …the rest of the colors */
}`
		},
		radius: {
			lang: 'css',
			title: 'src/lib/styles/distill-ui/tokens.css',
			code: `:root {
	/* One value scales every corner: 0 for square, 1rem for soft. */
	--dui-radius: 0.375rem;

	--dui-font-sans: 'Inter', system-ui, sans-serif;
}`
		},
		extra: {
			lang: 'css',
			title: 'src/lib/styles/distill-ui/themes/ocean.css',
			code: `[data-theme='ocean'] {
	color-scheme: dark;

	--dui-color-background: oklch(0.2 0.04 240);
	--dui-color-foreground: oklch(0.97 0.01 240);
	--dui-color-primary: oklch(0.75 0.12 200);
	--dui-color-primary-foreground: oklch(0.2 0.04 240);
	/* Copy every --dui-color-* from dark.css and change what you like. */
}`
		}
	})
});
