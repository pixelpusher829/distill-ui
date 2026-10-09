import { highlightAll } from '#lib/docs/highlight.server.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	code: await highlightAll({
		utility: {
			lang: 'svelte',
			title: 'A button styled with utility classes',
			code: `<button
	class="inline-flex items-center justify-center gap-2
	whitespace-nowrap rounded-md text-sm font-medium
	transition-all disabled:pointer-events-none
	disabled:opacity-50 bg-primary text-primary-foreground
	shadow-xs hover:bg-primary/90 h-9 px-4 py-2
	has-[>svg]:px-3 outline-none focus-visible:border-ring
	focus-visible:ring-ring/50 focus-visible:ring-[3px]"
>
	Save
</button>`
		},
		plain: {
			lang: 'svelte',
			title: "distill-ui's button, shortened",
			code: `<button class="button">Save</button>

<style>
	.button {
		height: 2.25rem;
		padding-inline: var(--dui-space-2-5);
		border-radius: var(--dui-radius-md);
		background: var(--dui-color-primary);
		color: var(--dui-color-primary-foreground);

		&:hover {
			background: var(--dui-color-primary-hover);
		}

		&:disabled {
			opacity: 0.5;
		}
	}
</style>`
		},
		before: {
			lang: 'svelte',
			title: 'Styling a headless library',
			code: `<Select.Trigger class="trigger" />

<style>
	/* Svelte removes this as unused: the button
	   is rendered inside Select.Trigger, not here. */
	.trigger {
		border-radius: 9999px;
	}

	/* So you reach for a workaround. */
	:global(.trigger) {
		border-radius: 9999px;
	}
</style>`
		},
		after: {
			lang: 'svelte',
			title: 'select-trigger.svelte in distill-ui',
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
		start: { lang: 'sh', code: 'npx distill-ui init\nnpx distill-ui add button dialog' }
	})
});
