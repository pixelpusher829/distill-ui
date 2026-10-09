<script lang="ts">
	import { Label, Switch } from '@distill-ui/svelte';

	let airplane = $state(false);
</script>

<div class="stack">
	<Label><Switch bind:checked={airplane} /> Airplane mode</Label>
	<Label><Switch size="sm" /> Small</Label>
	<Label><Switch disabled /> Disabled</Label>
</div>

<style>
	.stack {
		display: grid;
		gap: var(--dui-space-3);
	}
</style>
