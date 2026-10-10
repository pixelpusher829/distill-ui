<script setup lang="ts">
const { variant = 'default' } = defineProps<{ variant?: 'default' | 'destructive' }>();
</script>

<template>
	<div role="alert" class="alert" :data-variant="variant"><slot /></div>
</template>

<!--
	Options you can set from a parent or on the alert itself:
	--dui-alert-border, --dui-alert-radius, --dui-alert-bg, --dui-alert-fg
-->

<style scoped>
.alert {
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	row-gap: var(--dui-space-0-5);
	width: 100%;
	padding: var(--dui-space-3) var(--dui-space-4);
	border: 1px solid var(--dui-alert-border, var(--dui-color-border));
	border-radius: var(--dui-alert-radius, var(--dui-radius-lg));
	background: var(--dui-alert-bg, var(--dui-color-card));
	color: var(--dui-alert-fg, var(--dui-color-card-foreground));
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);

	/* An optional icon passed as the first child gets its own column. */
	&:has(> :deep(svg)) {
		grid-template-columns: auto 1fr;
		column-gap: var(--dui-space-2-5);
	}

	& > :deep(svg) {
		grid-row: span 2;
		width: 1rem;
		height: 1rem;
		translate: 0 0.125rem;
		color: currentColor;
	}
}

.alert[data-variant='destructive'] {
	/* Pulled toward the foreground so the text passes AA contrast, as in Button. */
	color: var(
		--dui-alert-fg,
		color-mix(in oklch, var(--dui-color-destructive) 80%, var(--dui-color-foreground))
	);
}
</style>
