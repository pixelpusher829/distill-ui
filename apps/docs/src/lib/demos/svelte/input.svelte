<script lang="ts">
	import { Input, Label } from '@distill-ui/svelte';
</script>

<div class="field">
	<Label for="email">Email</Label>
	<Input id="email" type="email" placeholder="you@example.com" />
</div>
<div class="field">
	<Label for="invalid">Username</Label>
	<Input id="invalid" value="taken" aria-invalid="true" aria-describedby="invalid-hint" />
	<p id="invalid-hint" class="hint">That username is taken.</p>
</div>
<div class="field">
	<Label for="picture">Picture</Label>
	<Input id="picture" type="file" />
</div>
<div class="field">
	<Label for="disabled-input">Disabled</Label>
	<Input id="disabled-input" disabled placeholder="Can't type here" />
</div>

<style>
	.field {
		display: grid;
		gap: var(--dui-space-2);
		width: min(100%, 20rem);
	}

	.field + .field {
		margin-top: var(--dui-space-4);
	}

	.hint {
		margin: 0;
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-sm);
	}
</style>
