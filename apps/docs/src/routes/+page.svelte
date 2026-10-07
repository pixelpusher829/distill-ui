<script lang="ts">
	import { libraryName } from '@distill-ui/svelte';
</script>

<svelte:head>
	<title>{libraryName}</title>
</svelte:head>

<main>
	<h1>{libraryName}</h1>
	<p>Docs and playground coming soon. Components will be previewed here as they are built.</p>
</main>

<style>
	main {
		font-family: var(--font-sans);
		max-width: 40rem;
		margin: 4rem auto;
		padding: 0 1rem;
	}
</style>
