<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { components, guides } from '#lib/docs/components.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// The menu starts folded so phones don't open on a long list. On wide screens it's always shown
	// (see the CSS); this also opens it for browsers without ::details-content.
	let open = $state(false);
	onMount(() => {
		if (matchMedia('(min-width: 48.01rem)').matches) open = true;
	});
</script>

{#snippet links(items: { href: string; title: string }[])}
	<ul>
		{#each items as item (item.href)}
			<li>
				<a href={item.href} aria-current={page.url.pathname === item.href ? 'page' : undefined}>
					{item.title}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

<div class="docs">
	<nav aria-label="Docs">
		<details bind:open>
			<summary>Menu</summary>
			<h2>Getting started</h2>
			{@render links(guides)}
			<h2>Components</h2>
			{@render links(
				components.map((c) => ({ href: `/docs/components/${c.slug}`, title: c.name }))
			)}
		</details>
	</nav>
	<main>
		{@render children()}
	</main>
</div>

<style>
	.docs {
		display: grid;
		grid-template-columns: 14rem minmax(0, 1fr);
		gap: var(--dui-space-10);
		max-width: 76rem;
		margin: 0 auto;
		padding-inline: var(--dui-space-6);
	}

	nav {
		position: sticky;
		top: 3.5rem;
		align-self: start;
		max-height: calc(100dvh - 3.5rem);
		overflow-y: auto;
		padding-block: var(--dui-space-8);
		font-size: var(--dui-text-sm);
	}

	summary {
		display: none;
	}

	@media (min-width: 48.01rem) {
		details::details-content {
			content-visibility: visible;
			height: auto;
		}
	}

	h2 {
		margin: var(--dui-space-6) 0 var(--dui-space-2);
		padding-inline: var(--dui-space-2);
		font-size: var(--dui-text-sm);
		font-weight: var(--dui-font-weight-semibold);

		&:first-of-type {
			margin-top: 0;
		}
	}

	/* Each list hangs off a thin rail; the current page lights up its stretch of it. */
	ul {
		display: grid;
		margin: 0 0 0 var(--dui-space-2);
		padding: 0;
		border-left: 1px solid var(--dui-color-border);
		list-style: none;
	}

	a {
		display: block;
		margin-left: -1px;
		padding: var(--dui-space-1) var(--dui-space-3);
		border-left: 2px solid transparent;
		color: var(--dui-color-muted-foreground);
		text-decoration: none;
		border-radius: 0 var(--dui-radius-sm) var(--dui-radius-sm) 0;
		transition:
			color 120ms,
			border-color 120ms,
			background-color 120ms;

		&:hover {
			border-left-color: var(--dui-color-muted-foreground);
			color: var(--dui-color-foreground);
		}

		&[aria-current='page'] {
			border-left-color: var(--site-accent);
			background: color-mix(in oklch, var(--dui-color-foreground) 6%, transparent);
			color: var(--dui-color-foreground);
			font-weight: var(--dui-font-weight-semibold);
		}
	}

	main {
		min-width: 0;
		padding-block: var(--dui-space-8) var(--dui-space-12);
	}

	/* On small screens the menu sits above the page and folds away. */
	@media (max-width: 48rem) {
		.docs {
			grid-template-columns: minmax(0, 1fr);
			gap: 0;
			padding-inline: var(--dui-space-4);
		}

		nav {
			position: static;
			max-height: none;
			padding-block: var(--dui-space-4) 0;
		}

		summary {
			display: list-item;
			cursor: pointer;
			font-weight: var(--dui-font-weight-medium);
		}

		details {
			padding: var(--dui-space-2) var(--dui-space-3);
			border: 1px solid var(--dui-color-border);
			border-radius: var(--dui-radius-md);
		}

		details[open] summary {
			margin-bottom: var(--dui-space-3);
		}
	}
</style>
