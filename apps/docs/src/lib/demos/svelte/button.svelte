<script lang="ts">
	import { Button } from '@distill-ui/svelte';

	const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;
</script>

<div class="row">
	{#each variants as variant (variant)}
		<Button {variant}>{variant}</Button>
	{/each}
</div>
<div class="row">
	<Button size="sm">Small</Button>
	<Button>Medium</Button>
	<Button size="lg">Large</Button>
	<Button size="icon" aria-label="Add">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M12 5v14M5 12h14" />
		</svg>
	</Button>
	<Button disabled>Disabled</Button>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--dui-space-2);
	}

	.row + .row {
		margin-top: var(--dui-space-3);
	}
</style>
