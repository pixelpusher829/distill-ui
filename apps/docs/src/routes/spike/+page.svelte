<script lang="ts">
	import { Button, SpikeA, SpikeB, SpikeC } from '@distill-ui/svelte';
	import Demo from '#lib/spike/Demo.svelte';

	let dark = $state(false);
	$effect(() => {
		document.documentElement.dataset.theme = dark ? 'dark' : 'light';
	});
</script>

<svelte:head>
	<title>Scoping spike · distill-ui</title>
</svelte:head>

<main>
	<header>
		<h1>Phase 1a: scoping spike</h1>
		<Button.Root variant="ghost" size="sm" onclick={() => (dark = !dark)}>
			{dark ? 'Light' : 'Dark'} mode
		</Button.Root>
	</header>

	<section data-testid="option-a">
		<h2>Option A: Bits UI + child snippet</h2>
		<Demo Dialog={SpikeA.Dialog} Select={SpikeA.Select} />
	</section>

	<section data-testid="option-b">
		<h2>Option B: Bits UI + :global()</h2>
		<Demo Dialog={SpikeB.Dialog} Select={SpikeB.Select} />
	</section>

	<section data-testid="option-c">
		<h2>Option C: Melt UI builders</h2>
		<Demo Dialog={SpikeC.Dialog} Select={SpikeC.Select} />
	</section>
</main>

<style>
	main {
		max-width: 48rem;
		margin: 0 auto;
		padding: var(--space-10) var(--space-4);
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	section {
		padding-block: var(--space-6);
		border-top: 1px solid var(--color-border);
	}

	h2 {
		margin: 0 0 var(--space-4);
		font-size: var(--text-base);
		font-weight: var(--font-weight-medium);
	}
</style>
