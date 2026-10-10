import { highlightAll } from '#lib/docs/highlight.server.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const code = await highlightAll({
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
		configVue: {
			lang: 'json',
			title: 'distill-ui.json',
			code: `{
	"framework": "vue",
	"components": "src/components/ui",
	"styles": "src/styles/distill-ui"
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
		useVue: {
			lang: 'vue',
			code: `<script setup lang="ts">
import { Button } from '@/components/ui/button';
import * as Dialog from '@/components/ui/dialog';
</script>

<template>
	<Button>Click me</Button>
</template>`
		},
		nuxt: {
			lang: 'ts',
			title: 'nuxt.config.ts',
			code: `export default defineNuxtConfig({
	css: ['~/assets/styles/distill-ui/tokens.css'],
	// Each component folder has an index.ts; auto-import only the .vue files so they don't clash.
	components: [{ path: '~/components', extensions: ['.vue'] }]
});`
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
		main: {
			lang: 'ts',
			title: 'src/main.ts',
			code: `import './styles/distill-ui/tokens.css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');`
		},
		packages: { lang: 'sh', code: 'npm install melt@0.44.0 @floating-ui/dom' },
		packagesVue: { lang: 'sh', code: 'npm install reka-ui' }
	});

	return {
		code: {
			...code,
			config: { svelte: code.config, vue: code.configVue },
			use: { svelte: code.use, vue: code.useVue },
			entry: { svelte: code.layout, vue: code.main },
			packages: { svelte: code.packages, vue: code.packagesVue }
		}
	};
};
