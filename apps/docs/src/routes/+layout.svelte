<script lang="ts">
	import '@distill-ui/tokens/tokens.css';
	import { Toaster } from '@distill-ui/svelte';
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import ThemeToggle from '#lib/docs/ThemeToggle.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a class="skip" href="#content">Skip to content</a>

<header>
	<a class="logo" href="/">distill-ui</a>
	<nav aria-label="Main">
		<a href="/docs">Docs</a>
		<a href="/docs/components/button">Components</a>
		<a href="https://github.com/pixelpusher829/distill-ui">GitHub</a>
	</nav>
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
		font-weight: var(--dui-font-weight-semibold);
		text-decoration: none;
		letter-spacing: -0.01em;
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
	}
</style>
