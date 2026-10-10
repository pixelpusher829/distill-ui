<template>
	<div class="footer"><slot /></div>
</template>

<style scoped>
.footer {
	display: flex;
	flex-direction: column;
	gap: var(--dui-space-2);
	/* Sits at the bottom of the sheet. */
	margin-top: auto;
}
</style>
