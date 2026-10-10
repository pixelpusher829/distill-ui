<template>
	<div class="title"><slot /></div>
</template>

<style scoped>
.title {
	grid-column: 1;
	font-size: var(--card-title-size);
	line-height: 1.5;
	font-weight: var(--dui-font-weight-medium);
}
</style>
