import { perFramework, snippet } from '#lib/server/snippets.js';
import type { PageServerLoad } from './$types';

/** The same CSS sample, titled with each framework's file name. */
const inButton = async (path: string) => ({
	svelte: await snippet(path, 'button.svelte'),
	vue: await snippet(path, 'Button.vue')
});

export const load: PageServerLoad = async () => ({
	code: {
		parent: await perFramework('customizing/parent'),
		inline: await snippet('customizing/inline.svelte'),
		source: await inButton('customizing/source.css'),
		variant: await inButton('customizing/variant.css')
	}
});
