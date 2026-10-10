<template>
	<div class="group"><slot /></div>
</template>

<style scoped>
.group {
	/* Read by each Avatar inside: overlap them and ring each one in the page color. */
	--avatar-overlap: calc(var(--dui-space-2) * -1);
	--avatar-ring-width: 2px;

	display: flex;
}
</style>
