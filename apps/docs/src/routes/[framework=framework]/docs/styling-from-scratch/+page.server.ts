import { perFramework, snippet } from '#lib/server/snippets.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	code: {
		markup: await perFramework('styling-from-scratch/markup', {
			svelte: 'button.svelte (markup, unchanged)',
			vue: 'Button.vue (markup, unchanged)'
		}),
		style: {
			svelte: await snippet(
				'styling-from-scratch/style.css',
				'button.svelte (your new style block)'
			),
			vue: await snippet('styling-from-scratch/style.css', 'Button.vue (your new style block)')
		}
	}
});
