<script setup lang="ts">
import { DropdownMenuItem } from 'reka-ui';

// Listen with `@select`. It closes the menu after, unless you call event.preventDefault().
const {
	disabled = false,
	variant = 'default',
	inset = false
} = defineProps<{
	disabled?: boolean;
	variant?: 'default' | 'destructive';
	/** Indent to line up with items that have a check mark or icon. */
	inset?: boolean;
}>();
</script>

<template>
	<DropdownMenuItem :disabled="disabled" as-child>
		<div class="item" :data-variant="variant" :data-inset="inset || undefined"><slot /></div>
	</DropdownMenuItem>
</template>

<style scoped>
.item {
	position: relative;
	display: flex;
	align-items: center;
	gap: var(--dui-space-2);
	padding: var(--dui-space-1-5) var(--dui-space-2);
	border-radius: var(--dui-radius-sm);
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);
	cursor: default;
	outline: none;
	user-select: none;

	&:focus {
		background: var(--dui-color-accent);
		color: var(--dui-color-accent-foreground);
	}

	&[data-disabled] {
		pointer-events: none;
		opacity: 0.5;
	}

	&[data-inset] {
		padding-inline-start: var(--dui-space-8);
	}

	& :deep(svg) {
		flex-shrink: 0;
		width: 1rem;
		height: 1rem;
		pointer-events: none;
	}
}

.item[data-variant='destructive'] {
	color: color-mix(in oklch, var(--dui-color-destructive) 80%, var(--dui-color-foreground));

	&:focus {
		background: color-mix(in oklch, var(--dui-color-destructive) 10%, transparent);
		color: color-mix(in oklch, var(--dui-color-destructive) 80%, var(--dui-color-foreground));
	}
}
</style>
