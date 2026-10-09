<script lang="ts">
	import { Badge } from '@distill-ui/svelte';

	const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;
</script>

<div class="row">
	{#each variants as variant (variant)}
		<Badge {variant}>{variant}</Badge>
	{/each}
	<Badge href="/docs/components/badge" variant="outline">A link</Badge>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--dui-space-2);
	}
</style>
