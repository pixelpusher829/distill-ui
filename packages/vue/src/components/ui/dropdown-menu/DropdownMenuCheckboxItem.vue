<script setup lang="ts">
import { DropdownMenuCheckboxItem } from 'reka-ui';

// Use `v-model` for checked. Stays open on select, so several options can be toggled in a row.
const { disabled = false } = defineProps<{ disabled?: boolean }>();
const checked = defineModel<boolean>({ default: false });
</script>

<template>
	<DropdownMenuCheckboxItem
		v-model="checked"
		:disabled="disabled"
		as-child
		@select="(event: Event) => event.preventDefault()"
	>
		<div class="item">
			<svg
				class="check"
				viewBox="0 0 24 24"
				aria-hidden="true"
				:data-checked="checked || undefined"
			>
				<path d="M20 6 9 17l-5-5" />
			</svg>
			<slot />
		</div>
	</DropdownMenuCheckboxItem>
</template>

<style scoped>
.item {
	position: relative;
	display: flex;
	align-items: center;
	gap: var(--dui-space-2);
	padding: var(--dui-space-1-5) var(--dui-space-2) var(--dui-space-1-5) var(--dui-space-8);
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
}

.check {
	position: absolute;
	left: var(--dui-space-2);
	width: 1rem;
	height: 1rem;
	fill: none;
	stroke: currentColor;
	stroke-width: 2;
	stroke-linecap: round;
	stroke-linejoin: round;
	visibility: hidden;

	&[data-checked] {
		visibility: visible;
	}
}
</style>
