<template>
	<div class="title"><slot /></div>
</template>

<style scoped>
.title {
	/* The last column, whether or not the alert has an icon. */
	grid-column: -2;
	font-weight: var(--dui-font-weight-medium);
}
</style>
