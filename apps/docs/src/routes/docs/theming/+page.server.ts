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
			title: 'src/lib/styles/distill-ui/tokens.css',
			code: `:root {
	/* A preset, or any oklch() like oklch(0.6 0.18 330) */
	--dui-primary: var(--dui-violet);
	--dui-neutral: var(--dui-gray-stone);

	/* One value scales every corner: 0 for square, 1rem for soft. */
	--dui-radius: 0.375rem;
	--dui-font-sans: 'Inter', system-ui, sans-serif;
}`
		},
		extra: {
			lang: 'svelte',
			code: `<section class="dui-theme promo">
	<Button>Upgrade</Button>
</section>

<style>
	.promo {
		--dui-primary: oklch(0.6 0.19 150);
	}
</style>`
		}
	})
});
