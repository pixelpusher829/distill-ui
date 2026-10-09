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
			title: "Styling another library's button",
			code: `<!-- Workaround 1: leak the style to the
     whole app with :global(). -->
<Button class="save">Save</Button>

<style>
	:global(.save) {
		border-radius: 9999px;
	}
</style>

<!-- Workaround 2: render the button yourself
     with a child snippet, so a scoped .save rule
     reaches it. Repeat everywhere you use one. -->
<Button>
	{#snippet child({ props })}
		<button {...props} class="save">Save</button>
	{/snippet}
</Button>`
		},
		after: {
			lang: 'svelte',
			title: 'Styling a distill-ui button',
			code: `<!-- In your app -->
<Button>Save</Button>

<!-- In button.svelte, which lives in your project -->
<button class="button">
	{@render children?.()}
</button>

<style>
	/* Change the scoped style here. It just works. */
	.button {
		border-radius: 9999px;
	}
</style>`
		},
		start: { lang: 'sh', code: 'npx distill-ui init\nnpx distill-ui add button dialog' }
	})
});
