<template>
	<button class="button">Save</button>
</template>

<style scoped>
.button {
	height: 2.25rem;
	padding-inline: var(--dui-space-2-5);
	border-radius: var(--dui-radius-md);
	background: var(--dui-color-primary);
	color: var(--dui-color-primary-foreground);

	&:hover {
		background: var(--dui-color-primary-hover);
	}

	&:disabled {
		opacity: 0.5;
	}
}
</style>
