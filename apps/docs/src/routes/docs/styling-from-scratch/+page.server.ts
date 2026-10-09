import { highlightAll } from '#lib/docs/highlight.server.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	code: await highlightAll({
		markup: {
			lang: 'svelte',
			title: 'button.svelte (markup, unchanged)',
			code: `<button {...restProps} class={['button', className]} data-variant={variant} data-size={size}>
	{@render children?.()}
</button>`
		},
		style: {
			lang: 'css',
			title: 'button.svelte (your new style block)',
			code: `.button {
	padding: 0.5rem 1.25rem;
	border: 2px solid black;
	border-radius: 0;
	background: yellow;
	font-weight: 700;
	box-shadow: 4px 4px 0 black;

	&:hover {
		translate: -2px -2px;
		box-shadow: 6px 6px 0 black;
	}

	&:focus-visible {
		outline: 3px solid blue;
		outline-offset: 2px;
	}
}

.button[data-variant='outline'] {
	background: white;
}

.button[data-size='sm'] {
	padding: 0.25rem 0.75rem;
}`
		}
	})
});
