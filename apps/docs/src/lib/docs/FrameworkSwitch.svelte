<script lang="ts">
	import { framework, frameworks } from './framework.svelte.js';
</script>

<div class="switch" role="group" aria-label="Framework">
	{#each frameworks as option (option.id)}
		<button
			type="button"
			aria-pressed={framework.current === option.id}
			onclick={() => framework.set(option.id)}
		>
			{option.name}
		</button>
	{/each}
</div>

<style>
	.switch {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--dui-space-1);
		padding: var(--dui-space-1);
		border: 1px solid var(--dui-color-border);
		border-radius: var(--dui-radius-md);
	}

	button {
		padding: var(--dui-space-1) var(--dui-space-2);
		border: 0;
		border-radius: calc(var(--dui-radius-md) - 2px);
		background: transparent;
		color: var(--dui-color-muted-foreground);
		font: inherit;
		font-weight: var(--dui-font-weight-medium);
		cursor: pointer;
		transition:
			color 120ms,
			background-color 120ms;

		&:hover {
			color: var(--dui-color-foreground);
		}

		&:focus-visible {
			outline: 2px solid var(--dui-color-ring);
			outline-offset: 1px;
		}

		&[aria-pressed='true'] {
			background: var(--dui-color-muted);
			color: var(--dui-color-foreground);
		}
	}
</style>
