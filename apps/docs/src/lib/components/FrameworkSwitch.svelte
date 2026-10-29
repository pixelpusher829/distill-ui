<script lang="ts">
	import { page } from '$app/state';
	import { framework, frameworks, isFramework } from '#lib/docs/framework.svelte.js';

	// On docs pages each option links to the same page for that framework, so search engines can
	// follow it. Elsewhere, like the home page, it swaps the framework in place.
	const onDocsPage = $derived(isFramework(page.params.framework));
	const linkTo = (id: string) =>
		page.url.pathname.replace(/^\/(svelte|vue)(?=\/|$)/, `/${id}`) + page.url.hash;
</script>

<div class="switch" role="group" aria-label="Framework">
	{#each frameworks as option (option.id)}
		{#if onDocsPage}
			<a
				href={linkTo(option.id)}
				data-option={option.id}
				aria-current={framework.current === option.id ? 'page' : undefined}
			>
				{option.name}
			</a>
		{:else}
			<button
				type="button"
				data-option={option.id}
				aria-pressed={framework.current === option.id}
				onclick={() => framework.set(option.id)}
			>
				{option.name}
			</button>
		{/if}
	{/each}
</div>

<style>
	.switch {
		display: inline-flex;
		gap: 2px;
		padding: 2px;
		border: 1px solid var(--dui-color-border);
		border-radius: var(--dui-radius-full);
		font-size: var(--dui-text-sm);
	}

	[data-option] {
		padding: var(--dui-space-1) var(--dui-space-3);
		border: 0;
		border-radius: var(--dui-radius-full);
		background: transparent;
		color: var(--dui-color-muted-foreground);
		font: inherit;
		font-weight: var(--dui-weight-medium);
		text-decoration: none;
		cursor: pointer;
		transition:
			color 120ms,
			background-color 120ms;

		&:hover {
			color: var(--dui-color-foreground);
		}

		&:focus-visible {
			outline: 2px solid var(--site-accent);
			outline-offset: 2px;
		}
	}

	/*
	 * The picked framework wears its brand color. This reads the attribute app.html sets before the
	 * page paints, rather than aria-pressed or aria-current, so the switch doesn't flicker while the
	 * page starts.
	 */
	:global(:root:not([data-framework='vue'])) [data-option='svelte'],
	:global(:root[data-framework='vue']) [data-option='vue'] {
		background: var(--site-accent);
		color: var(--site-accent-foreground);
	}

	/* Phones share the header row with the menu links, so the switch gets smaller. */
	@media (max-width: 40rem) {
		.switch {
			font-size: var(--dui-text-xs);
		}

		[data-option] {
			padding-inline: var(--dui-space-2);
		}
	}

	@media (max-width: 22rem) {
		[data-option] {
			padding-inline: var(--dui-space-1-5);
		}
	}
</style>
