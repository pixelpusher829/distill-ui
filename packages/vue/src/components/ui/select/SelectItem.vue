<script setup lang="ts">
import { SelectItem, SelectItemIndicator, SelectItemText } from 'reka-ui';

// Pass `label` for the text, or put your own content in the slot.
const {
	value,
	label,
	disabled = false
} = defineProps<{ value: string; label?: string; disabled?: boolean }>();
</script>

<template>
	<SelectItem :value="value" :text-value="label ?? value" :disabled="disabled" as-child>
		<div class="item">
			<SelectItemText as-child>
				<span class="text"
					><slot>{{ label ?? value }}</slot></span
				>
			</SelectItemText>
			<SelectItemIndicator as-child>
				<svg class="indicator" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M20 6 9 17l-5-5" />
				</svg>
			</SelectItemIndicator>
		</div>
	</SelectItem>
</template>

<!--
	Options you can set from a parent or on the select item itself:
	--dui-select-item-highlight-bg, --dui-select-item-highlight-fg
-->

<style scoped>
.item {
	position: relative;
	display: flex;
	align-items: center;
	gap: var(--dui-space-2);
	width: 100%;
	padding-block: var(--dui-space-1-5);
	padding-inline: var(--dui-space-2) var(--dui-space-8);
	border-radius: var(--dui-radius-sm);
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);
	cursor: default;
	user-select: none;
	outline: none;

	&[data-highlighted] {
		background: var(--dui-select-item-highlight-bg, var(--dui-color-accent));
		color: var(--dui-select-item-highlight-fg, var(--dui-color-accent-foreground));
	}

	&[data-disabled] {
		pointer-events: none;
		opacity: 0.5;
	}
}

.text {
	display: flex;
	flex: 1;
	align-items: center;
	gap: var(--dui-space-2);
	white-space: nowrap;
}

.indicator {
	position: absolute;
	right: var(--dui-space-2);
	width: 1rem;
	height: 1rem;
	fill: none;
	stroke: currentColor;
	stroke-width: 2;
	stroke-linecap: round;
	stroke-linejoin: round;
	pointer-events: none;
}
</style>
