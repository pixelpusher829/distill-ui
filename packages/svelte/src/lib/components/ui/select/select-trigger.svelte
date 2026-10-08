<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { getSelectContext } from './context.js';

	let {
		class: className,
		style,
		children,
		size = 'md',
		...restProps
	}: HTMLButtonAttributes & { size?: 'sm' | 'md' } = $props();

	const ctx = getSelectContext();
	const select = $derived(ctx.select);
</script>

<!-- Melt sets its own inline style on the trigger (position variables), so a style you pass
     is appended to it rather than replacing it. -->

<button
	type="button"
	{...restProps}
	{...select.trigger}
	style="{select.trigger.style}; {style ?? ''}"
	class={['trigger', className]}
	data-size={size}
	data-placeholder={select.value ? undefined : ''}
>
	{@render children?.()}
	<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
</button>

<!--
	Options you can set from a parent or on the select trigger itself:
	--dui-select-trigger-width, --dui-select-trigger-height, --dui-select-trigger-border, --dui-select-trigger-radius, --dui-select-trigger-bg
-->

<style>
	.trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--dui-space-1-5);
		width: var(--dui-select-trigger-width, fit-content);
		height: var(--dui-select-trigger-height, 2.25rem);
		padding-block: var(--dui-space-2);
		padding-inline: var(--dui-space-2-5) var(--dui-space-2);
		border: 1px solid var(--dui-select-trigger-border, var(--dui-color-input));
		border-radius: var(--dui-select-trigger-radius, var(--dui-radius-md));
		background: var(--dui-select-trigger-bg, transparent);
		color: var(--dui-color-foreground);
		box-shadow: var(--dui-shadow-xs);
		font: inherit;
		font-size: var(--dui-text-sm);
		line-height: var(--dui-text-sm-line-height);
		white-space: nowrap;
		cursor: pointer;
		outline: none;
		transition:
			color var(--dui-duration-fast) var(--dui-ease-out),
			box-shadow var(--dui-duration-fast) var(--dui-ease-out);

		&[data-size='sm'] {
			height: var(--dui-select-trigger-height, 2rem);
		}

		&:focus-visible {
			border-color: var(--dui-color-ring);
			box-shadow: 0 0 0 var(--dui-ring-width)
				color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
		}

		&[data-placeholder] {
			color: var(--dui-color-muted-foreground);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		&[aria-invalid='true'] {
			border-color: var(--dui-color-destructive);
		}
	}

	.icon {
		flex-shrink: 0;
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: var(--dui-color-muted-foreground);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		pointer-events: none;
	}
</style>
