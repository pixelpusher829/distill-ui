<template>
	<p class="description"><slot /></p>
</template>

<style scoped>
.description {
	grid-column: 1;
	margin: 0;
	color: var(--dui-color-muted-foreground);
	font-size: var(--dui-text-sm);
}
</style>
