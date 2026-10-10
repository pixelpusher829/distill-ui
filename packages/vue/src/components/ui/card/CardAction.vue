<template>
	<div class="action"><slot /></div>
</template>

<style scoped>
.action {
	grid-column: 2;
	grid-row: 1 / span 2;
	align-self: start;
	justify-self: end;
	margin-inline-start: var(--dui-space-4);
}
</style>
