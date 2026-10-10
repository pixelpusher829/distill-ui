<template>
	<div class="description"><slot /></div>
</template>

<style scoped>
.description {
	grid-column: -2;
	/* Slightly softer than the title; inherits the destructive color in that variant. */
	color: color-mix(in oklch, currentColor 85%, transparent);
	text-wrap: pretty;
}
</style>
