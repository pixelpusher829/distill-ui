<script setup lang="ts">
// Use `v-model` for checked and `v-model:indeterminate` for the mixed state.
const checked = defineModel<boolean>({ default: false });
const indeterminate = defineModel<boolean>('indeterminate', { default: false });
</script>

<template>
	<!-- A native checkbox: keyboard, forms and screen readers work without extra code. -->
	<input
		v-model="checked"
		type="checkbox"
		class="checkbox"
		:indeterminate="indeterminate"
		@change="indeterminate = false"
	/>
</template>

<!--
	Options you can set from a parent or on the checkbox itself:
	--dui-checkbox-size, --dui-checkbox-border, --dui-checkbox-radius, --dui-checkbox-bg, --dui-checkbox-checked-fg, --dui-checkbox-checked-bg
-->

<style scoped>
.checkbox {
	/* The size is reused below for the mark, so it is set once here. */
	--size: var(--dui-checkbox-size, 1rem);

	appearance: none;
	display: inline-grid;
	place-content: center;
	flex-shrink: 0;
	width: var(--size);
	height: var(--size);
	margin: 0;
	border: 1px solid var(--dui-checkbox-border, var(--dui-color-input));
	border-radius: var(--dui-checkbox-radius, 4px);
	background: var(--dui-checkbox-bg, var(--dui-color-control));
	color: var(--dui-checkbox-checked-fg, var(--dui-color-primary-foreground));
	box-shadow: var(--dui-shadow-xs);
	cursor: pointer;
	outline: none;
	transition: box-shadow var(--dui-duration-fast) var(--dui-ease-out);

	/* The check mark: an SVG used as a mask, so it takes the text color. */
	&::before {
		content: '';
		width: calc(var(--size) * 0.875);
		height: calc(var(--size) * 0.875);
		background: currentColor;
		mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")
			center / contain no-repeat;
		scale: 0;
	}

	&:checked,
	&:indeterminate {
		border-color: var(--dui-checkbox-checked-bg, var(--dui-color-primary));
		background: var(--dui-checkbox-checked-bg, var(--dui-color-primary));

		&::before {
			scale: 1;
		}
	}

	&:indeterminate::before {
		mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round'%3E%3Cpath d='M5 12h14'/%3E%3C/svg%3E");
	}

	&:focus-visible {
		border-color: var(--dui-color-ring);
		box-shadow: 0 0 0 var(--dui-ring-width)
			color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
	}

	&[aria-invalid='true'] {
		border-color: var(--dui-color-destructive);
		box-shadow: 0 0 0 var(--dui-ring-width)
			color-mix(in oklch, var(--dui-color-destructive) 20%, transparent);
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
}
</style>
