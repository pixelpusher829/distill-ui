<script lang="ts">
	import '@distill-ui/tokens/tokens.css';
	import { Button, Toaster } from '@distill-ui/svelte';
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import ThemeToggle from '#lib/docs/ThemeToggle.svelte';
	import { framework } from '#lib/docs/framework.svelte.js';
	import { onMount } from 'svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => framework.load());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&display=swap"
	/>
</svelte:head>

<a class="skip" href="#content">Skip to content</a>

<header>
	<a class="logo" href="/">
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M12 2.5c3.8 4.6 6.5 8.4 6.5 11.9a6.5 6.5 0 0 1-13 0c0-3.5 2.7-7.3 6.5-11.9Z" />
		</svg>
		<span class="name">distill-ui</span>
	</a>
	<nav aria-label="Main">
		<a href="/docs">Docs</a>
		<a href="/docs/components/button">Components</a>
		<a href="https://github.com/pixelpusher829/distill-ui">GitHub</a>
	</nav>
	<span class="coffee">
		<Button href="https://buymeacoffee.com/jbarnes" variant="outline" size="sm">
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M17 8h1a4 4 0 1 1 0 8h-1" />
				<path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
				<path d="M6 2v2M10 2v2M14 2v2" />
			</svg>
			<span class="label">Buy me a coffee</span>
		</Button>
	</span>
	<ThemeToggle />
</header>

<div id="content">
	{@render children()}
</div>
<Toaster />

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		gap: var(--dui-space-6);
		height: 3.5rem;
		padding-inline: var(--dui-space-6);
		border-bottom: 1px solid var(--dui-color-border);
		background: color-mix(in oklch, var(--dui-color-background) 85%, transparent);
		backdrop-filter: blur(8px);
	}

	.logo {
		display: inline-flex;
		align-items: center;
		gap: var(--dui-space-2);
		font-family: var(--site-font-display);
		font-size: 1.125rem;
		font-weight: 700;
		text-decoration: none;
		letter-spacing: -0.01em;
		white-space: nowrap;
	}

	.logo svg {
		width: 1.25rem;
		height: 1.25rem;
		fill: var(--site-accent);
	}

	nav {
		display: flex;
		gap: var(--dui-space-5);
		margin-inline-end: auto;
		font-size: var(--dui-text-sm);

		& a {
			color: var(--dui-color-muted-foreground);
			text-decoration: none;

			&:hover {
				color: var(--dui-color-foreground);
			}
		}
	}

	.skip {
		position: absolute;
		inset-inline-start: var(--dui-space-2);
		top: -3rem;
		z-index: 20;
		padding: var(--dui-space-2) var(--dui-space-3);
		border-radius: var(--dui-radius-md);
		background: var(--dui-color-primary);
		color: var(--dui-color-primary-foreground);

		&:focus {
			top: var(--dui-space-2);
		}
	}

	@media (max-width: 40rem) {
		header {
			gap: var(--dui-space-4);
			padding-inline: var(--dui-space-4);
		}

		nav {
			gap: var(--dui-space-3);
		}

		/* Only the cup on phones; the label is still read out by screen readers. */
		.coffee .label,
		.logo .name {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
		}
	}

	/* The smallest phones need tighter spacing to fit everything on one row. */
	@media (max-width: 22rem) {
		header {
			gap: var(--dui-space-2);
			padding-inline: var(--dui-space-3);
		}
	}

	/* Show the logo's name again where there's room for it next to the links. */
	@media (min-width: 28rem) and (max-width: 40rem) {
		.logo .name {
			position: static;
			width: auto;
			height: auto;
			clip-path: none;
		}
	}
</style>
