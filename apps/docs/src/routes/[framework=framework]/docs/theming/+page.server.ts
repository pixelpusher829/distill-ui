import { snippet } from '#lib/server/snippets.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	code: {
		html: await snippet('theming/html.html'),
		edit: await snippet('theming/edit.css', 'src/lib/styles/distill-ui/tokens.css'),
		extra: await snippet('theming/extra.svelte')
	}
});
