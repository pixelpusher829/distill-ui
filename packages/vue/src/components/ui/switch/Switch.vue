<script setup lang="ts">
const { size = 'md' } = defineProps<{ size?: 'sm' | 'md' }>();
const checked = defineModel<boolean>({ default: false });
</script>

<template>
	<!-- A native checkbox with role="switch": screen readers announce it as on/off. -->
	<input v-model="checked" type="checkbox" role="switch" class="switch" :data-size="size" />
</template>

<!--
	Options you can set from a parent or on the switch itself:
	--dui-switch-width, --dui-switch-height, --dui-switch-thumb, --dui-switch-thumb-size, --dui-switch-track, --dui-switch-checked-track, --dui-switch-checked-thumb
-->

<style scoped>
.switch {
	/* Reused below to work out how far the thumb slides, so they are set once here. */
	--width: var(--dui-switch-width, 2rem);
	--height: var(--dui-switch-height, 1.15rem);
	--thumb-size: var(--dui-switch-thumb-size, 1rem);

	appearance: none;
	display: inline-flex;
	align-items: center;
	flex-shrink: 0;
	width: var(--width);
	height: var(--height);
	margin: 0;
	border: 1px solid transparent;
	border-radius: var(--dui-radius-full);
	background: var(--dui-switch-track, var(--dui-color-switch-track));
	box-shadow: var(--dui-shadow-xs);
	cursor: pointer;
	outline: none;
	transition:
		background-color var(--dui-duration-fast) var(--dui-ease-out),
		box-shadow var(--dui-duration-fast) var(--dui-ease-out);

	/* The thumb. */
	&::before {
		content: '';
		width: var(--thumb-size);
		height: var(--thumb-size);
		border-radius: var(--dui-radius-full);
		background: var(--dui-switch-thumb, var(--dui-color-switch-thumb));
		pointer-events: none;
		transition: translate var(--dui-duration-fast) var(--dui-ease-out);
	}

	&:checked {
		background: var(--dui-switch-checked-track, var(--dui-color-primary));

		&::before {
			background: var(--dui-switch-checked-thumb, var(--dui-color-switch-thumb-checked));
			translate: calc(var(--width) - var(--thumb-size) - 2px) 0;
		}
	}

	&:dir(rtl):checked::before {
		translate: calc((var(--width) - var(--thumb-size) - 2px) * -1) 0;
	}

	&:focus-visible {
		border-color: var(--dui-color-ring);
		box-shadow: 0 0 0 var(--dui-ring-width)
			color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
}

.switch[data-size='sm'] {
	--width: var(--dui-switch-width, 1.5rem);
	--height: var(--dui-switch-height, 0.875rem);
	--thumb-size: var(--dui-switch-thumb-size, 0.75rem);
}
</style>
