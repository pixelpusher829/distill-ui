<script lang="ts">
	import { Label, RadioGroup } from '@distill-ui/svelte';

	let plan = $state('comfortable');
</script>

<RadioGroup.Root bind:value={plan} aria-label="Spacing">
	<Label><RadioGroup.Item value="default" /> Default</Label>
	<Label><RadioGroup.Item value="comfortable" /> Comfortable</Label>
	<Label><RadioGroup.Item value="compact" /> Compact</Label>
</RadioGroup.Root>
<p>Selected: {plan}</p>

<style>
	p {
		margin: var(--dui-space-3) 0 0;
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-sm);
	}
</style>
