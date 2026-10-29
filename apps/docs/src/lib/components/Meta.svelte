<!--
	A page's title and description, for search results and link previews. The tags every page
	shares (canonical URL, preview image) are in the root layout.
-->
<script lang="ts">
	let { title, description }: { title: string; description: string } = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>
