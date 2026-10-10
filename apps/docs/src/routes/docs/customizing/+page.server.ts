import { highlightAll } from '#lib/docs/highlight.server.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const code = await highlightAll({
		parent: {
			lang: 'svelte',
			code: `<div class="danger-zone">
	<Button>Delete project</Button>
</div>

<style>
	.danger-zone {
		--dui-button-bg: var(--dui-color-destructive);
		--dui-button-radius: 9999px;
	}
</style>`
		},
		parentVue: {
			lang: 'vue',
			code: `<template>
	<div class="danger-zone">
		<Button>Delete project</Button>
	</div>
</template>

<style scoped>
.danger-zone {
	--dui-button-bg: var(--dui-color-destructive);
	--dui-button-radius: 9999px;
}
</style>`
		},
		inline: {
			lang: 'svelte',
			code: `<Button style="--dui-button-bg: oklch(0.55 0.2 260)">Save</Button>`
		},
		source: {
			lang: 'css',
			title: 'button.svelte',
			code: `.button[data-variant='secondary'] {
	background: var(--dui-button-bg, var(--dui-color-secondary));
	color: var(--dui-button-fg, var(--dui-color-secondary-foreground));

	&:hover {
		background: var(--dui-button-hover-bg, var(--dui-color-secondary-hover));
	}
}`
		},
		variant: {
			lang: 'css',
			title: 'button.svelte',
			code: `.button[data-variant='brand'] {
	background: linear-gradient(135deg, oklch(0.6 0.2 300), oklch(0.6 0.2 250));
	color: white;
}`
		}
	});

	/** The same CSS sample, titled with the Vue file name. */
	const inVue = (sample: typeof code.source) => ({ ...sample, title: 'Button.vue' });

	return {
		code: {
			parent: { svelte: code.parent, vue: code.parentVue },
			inline: code.inline,
			source: { svelte: code.source, vue: inVue(code.source) },
			variant: { svelte: code.variant, vue: inVue(code.variant) }
		}
	};
};
