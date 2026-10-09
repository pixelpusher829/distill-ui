<script lang="ts">
	import { Input, Label } from '@distill-ui/svelte';
</script>

<div class="field" style="--dui-input-radius: 9999px; --dui-input-height: 2.75rem">
	<Label for="pill">Pill input</Label>
	<Input id="pill" placeholder="Rounded from a parent" />
</div>

<style>
	.field {
		display: grid;
		gap: var(--dui-space-2);
		width: min(100%, 20rem);
	}
</style>
