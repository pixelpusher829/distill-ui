import { highlightAll } from '#lib/docs/highlight.server.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	code: await highlightAll({
		before: {
			lang: 'svelte',
			title: 'With a headless library',
			code: `<Select.Trigger class="trigger" />

<style>
	/* Svelte removes this as unused: the button
	   is rendered inside Select.Trigger, not here. */
	.trigger {
		border-radius: 9999px;
	}

	/* So you end up writing this instead. */
	:global(.trigger) {
		border-radius: 9999px;
	}
</style>`
		},
		after: {
			lang: 'svelte',
			title: 'With distill-ui: select-trigger.svelte',
			code: `<button {...select.trigger} class="trigger">
	{@render children?.()}
</button>

<style>
	/* The button is right here, so this works. */
	.trigger {
		border-radius: 9999px;
	}
</style>`
		},
		parent: {
			lang: 'svelte',
			title: 'Or change it from anywhere',
			code: `<div style="--dui-select-trigger-radius: 9999px">
	<Select.Root>…</Select.Root>
</div>`
		},
		start: { lang: 'sh', code: 'npx distill-ui init\nnpx distill-ui add button dialog' }
	})
});
