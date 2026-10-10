<template>
	<div class="footer"><slot /></div>
</template>

<style scoped>
.footer {
	display: flex;
	align-items: center;
	gap: var(--dui-space-2);
	padding-inline: var(--card-spacing);
}
</style>
