import { perFramework, snippet } from '#lib/server/snippets.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	code: {
		utility: await snippet('home/utility.svelte', 'A button styled with utility classes'),
		plain: await perFramework('home/plain', {
			svelte: "distill-ui's button, shortened",
			vue: "distill-ui's button, shortened"
		}),
		before: await perFramework('home/before', {
			svelte: "Styling another library's button",
			vue: "Styling another library's select menu"
		}),
		after: await perFramework('home/after', {
			svelte: 'Styling a distill-ui button',
			vue: 'Styling a distill-ui button'
		}),
		start: await snippet('home/start.sh')
	}
});
