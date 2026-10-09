<script lang="ts">
	import { Input, Label, Popover } from '@distill-ui/svelte';
</script>

<Popover.Root>
	<Popover.Trigger>Open popover</Popover.Trigger>
	<Popover.Content>
		<div class="stack">
			<strong>Dimensions</strong>
			<div class="field">
				<Label for="popover-width">Width</Label>
				<Input id="popover-width" value="100%" />
			</div>
		</div>
	</Popover.Content>
</Popover.Root>

<style>
	.stack {
		display: grid;
		gap: var(--dui-space-3);
	}

	.field {
		display: grid;
		gap: var(--dui-space-2);
	}
</style>
