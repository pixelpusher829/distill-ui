<script lang="ts">
	import { Checkbox, Label } from '@distill-ui/svelte';

	let terms = $state(false);
</script>

<div class="stack">
	<Label><Checkbox bind:checked={terms} /> Accept terms and conditions</Label>
	<Label><Checkbox indeterminate /> Some items selected</Label>
	<Label><Checkbox disabled /> Disabled</Label>
</div>

<style>
	.stack {
		display: grid;
		gap: var(--dui-space-3);
	}
</style>
