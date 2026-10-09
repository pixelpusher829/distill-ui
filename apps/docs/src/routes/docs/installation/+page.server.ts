import { highlightAll } from '#lib/docs/highlight.server.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	code: await highlightAll({
		init: { lang: 'sh', code: 'npx distill-ui init' },
		add: { lang: 'sh', code: 'npx distill-ui add button dialog' },
		config: {
			lang: 'json',
			title: 'distill-ui.json',
			code: `{
	"framework": "svelte",
	"components": "src/lib/components/ui",
	"styles": "src/lib/styles/distill-ui"
}`
		},
		use: {
			lang: 'svelte',
			code: `<script lang="ts">
	import { Button } from '#lib/components/ui/button/index.js';
	import * as Dialog from '#lib/components/ui/dialog/index.js';
</script>

<Button>Click me</Button>`
		},
		layout: {
			lang: 'svelte',
			title: 'src/routes/+layout.svelte',
			code: `<script lang="ts">
	import '#lib/styles/distill-ui/tokens.css';

	let { children } = $props();
</script>

{@render children()}`
		},
		packages: { lang: 'sh', code: 'npm install melt@0.44.0 @floating-ui/dom' }
	})
});
