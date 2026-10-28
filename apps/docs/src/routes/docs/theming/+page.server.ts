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
	--dui-neutral: oklch(0.556 0.013 58);
	--dui-primary: oklch(0.556 0.2 285);
	--dui-destructive: oklch(0.577 0.245 27.325);
	--dui-success: oklch(0.6 0.17 150);
}

:root {
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
