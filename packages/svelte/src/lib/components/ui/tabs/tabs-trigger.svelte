<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { getTabsContext } from './context.js';

	let {
		class: className,
		value,
		disabled = false,
		children,
		...restProps
	}: HTMLButtonAttributes & { value: string } = $props();

	const ctx = getTabsContext();

	// Melt has no disabled tabs. It finds tabs by their data-melt-tabs-trigger marker, so
	// leaving the marker off a disabled tab takes it out of arrow-key navigation.
	const trigger = $derived.by(() => {
		const props: Record<string, unknown> = { ...ctx.tabs.getTrigger(value) };
		if (disabled) delete props['data-melt-tabs-trigger'];
		return props;
	});
</script>

<button
	type="button"
	{...restProps}
	{...trigger}
	{disabled}
	class={['trigger', className]}
	data-list-variant={ctx.listVariant}
>
	{@render children?.()}
</button>

<style>
	.trigger {
		position: relative;
		display: inline-flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		gap: var(--dui-space-1-5);
		height: calc(100% - 1px);
		padding: var(--dui-space-1) var(--dui-space-2);
		border: 1px solid transparent;
		border-radius: var(--dui-radius-md);
		background: transparent;
		color: color-mix(in oklch, var(--dui-color-foreground) 60%, transparent);
		font: inherit;
		font-size: var(--dui-text-sm);
		line-height: var(--dui-text-sm-line-height);
		font-weight: var(--dui-font-weight-medium);
		white-space: nowrap;
		cursor: pointer;
		transition:
			color var(--dui-duration-fast) var(--dui-ease-out),
			background-color var(--dui-duration-fast) var(--dui-ease-out),
			box-shadow var(--dui-duration-fast) var(--dui-ease-out);

		&:hover {
			color: var(--dui-color-foreground);
		}

		&:focus-visible {
			outline: 1px solid var(--dui-color-ring);
			border-color: var(--dui-color-ring);
			box-shadow: 0 0 0 var(--dui-ring-width)
				color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
		}

		&:disabled {
			pointer-events: none;
			opacity: 0.5;
		}

		&[data-orientation='vertical'] {
			width: 100%;
			justify-content: flex-start;
		}

		/* Underline for the "line" variant, hidden until active. */
		&::after {
			content: '';
			position: absolute;
			background: var(--dui-color-foreground);
			opacity: 0;
			transition: opacity var(--dui-duration-fast) var(--dui-ease-out);
		}

		&[data-orientation='horizontal']::after {
			inset-inline: 0;
			bottom: -5px;
			height: 2px;
		}

		&[data-orientation='vertical']::after {
			inset-block: 0;
			right: -4px;
			width: 2px;
		}
	}

	.trigger[data-active][data-list-variant='default'] {
		border-color: var(--dui-color-tab-active-border);
		background: var(--dui-tabs-trigger-active-bg, var(--dui-color-tab-active));
		color: var(--dui-color-foreground);
		box-shadow: var(--dui-shadow-sm);
	}

	.trigger[data-active][data-list-variant='line'] {
		color: var(--dui-color-foreground);

		&::after {
			opacity: 1;
		}
	}
</style>
