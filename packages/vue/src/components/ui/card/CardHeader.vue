<template>
	<div class="header"><slot /></div>
</template>

<style scoped>
.header {
	/* Two columns so Card.Action can sit top-right beside the title and description. */
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: start;
	row-gap: var(--dui-space-1);
	padding-inline: var(--card-spacing);
}
</style>
