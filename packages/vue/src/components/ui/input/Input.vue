<script setup lang="ts">
// Use `v-model` for the value. A file input has no v-model; read its files from `@change`.
const { type } = defineProps<{ type?: string }>();
const model = defineModel<string | number>();
</script>

<template>
	<input v-if="type === 'file'" type="file" class="input" />
	<input v-else v-model="model" :type="type" class="input" />
</template>

<!--
	Options you can set from a parent or on the input itself:
	--dui-input-height, --dui-input-padding-x, --dui-input-border, --dui-input-radius, --dui-input-bg
-->

<style scoped>
.input {
	width: 100%;
	min-width: 0;
	height: var(--dui-input-height, 2.25rem);
	padding: var(--dui-space-1) var(--dui-input-padding-x, var(--dui-space-2-5));
	border: 1px solid var(--dui-input-border, var(--dui-color-input));
	border-radius: var(--dui-input-radius, var(--dui-radius-md));
	background: var(--dui-input-bg, var(--dui-color-control));
	color: var(--dui-color-foreground);
	font: inherit;
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);
	box-shadow: var(--dui-shadow-xs);
	outline: none;
	transition:
		border-color var(--dui-duration-fast) var(--dui-ease-out),
		box-shadow var(--dui-duration-fast) var(--dui-ease-out);

	&::placeholder {
		color: var(--dui-color-muted-foreground);
	}

	&::file-selector-button {
		height: 1.75rem;
		margin-inline-end: var(--dui-space-2);
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--dui-color-foreground);
		font: inherit;
		font-size: var(--dui-text-sm);
		font-weight: var(--dui-font-weight-medium);
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
