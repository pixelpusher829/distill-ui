<script lang="ts">
	import { Separator } from '@distill-ui/svelte';
</script>

<p>An open-source UI library.</p>
<Separator style="margin-block: var(--dui-space-4)" />
<div class="row">
	<span>Blog</span>
	<Separator orientation="vertical" />
	<span>Docs</span>
	<Separator orientation="vertical" />
	<span>Source</span>
</div>

<style>
	p {
		margin: 0;
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-sm);
	}

	.row {
		display: flex;
		align-items: center;
		gap: var(--dui-space-2);
		height: 1.25rem;
		font-size: var(--dui-text-sm);
	}
</style>
