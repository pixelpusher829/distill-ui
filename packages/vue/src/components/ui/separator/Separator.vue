<script setup lang="ts">
const { orientation = 'horizontal', decorative = true } = defineProps<{
	orientation?: 'horizontal' | 'vertical';
	/** Purely visual by default. Set to false when the line separates meaningful sections. */
	decorative?: boolean;
}>();
</script>

<template>
	<div
		class="separator"
		:role="decorative ? 'none' : 'separator'"
		:aria-orientation="decorative ? undefined : orientation"
		:data-orientation="orientation"
	></div>
</template>

<!--
	Options you can set from a parent or on the separator itself:
	--dui-separator-color
-->

<style scoped>
.separator {
	flex-shrink: 0;
	background: var(--dui-separator-color, var(--dui-color-border));

	&[data-orientation='horizontal'] {
		width: 100%;
		height: 1px;
	}

	&[data-orientation='vertical'] {
		width: 1px;
		align-self: stretch;
	}
}
</style>
