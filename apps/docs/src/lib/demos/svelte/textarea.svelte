<script lang="ts">
	import { Label, Textarea } from '@distill-ui/svelte';
</script>

<div class="field">
	<Label for="message">Message</Label>
	<Textarea id="message" placeholder="Type your message here." />
</div>

<style>
	.field {
		display: grid;
		gap: var(--dui-space-2);
		width: min(100%, 20rem);
	}
</style>
