import { perFramework, snippet } from '#lib/server/snippets.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	code: {
		init: await snippet('installation/init.sh'),
		add: await snippet('installation/add.sh'),
		config: await perFramework('installation/config', {
			svelte: 'distill-ui.json',
			vue: 'distill-ui.json'
		}),
		use: await perFramework('installation/use'),
		entry: await perFramework('installation/entry', {
			svelte: 'src/routes/+layout.svelte',
			vue: 'src/main.ts'
		}),
		nuxt: await snippet('installation/nuxt.ts', 'nuxt.config.ts'),
		packages: await perFramework('installation/packages')
	}
});
