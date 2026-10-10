<template>
	<label class="label"><slot /></label>
</template>

<!--
	Options you can set from a parent or on the label itself:
	--dui-label-fg
-->

<style scoped>
.label {
	display: flex;
	align-items: center;
	gap: var(--dui-space-2);
	color: var(--dui-label-fg, var(--dui-color-foreground));
	font-size: var(--dui-text-sm);
	line-height: 1;
	font-weight: var(--dui-font-weight-medium);
	user-select: none;
}
</style>
