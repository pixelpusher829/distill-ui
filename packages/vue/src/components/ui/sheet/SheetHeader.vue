<template>
	<div class="header"><slot /></div>
</template>

<style scoped>
.header {
	display: flex;
	flex-direction: column;
	gap: var(--dui-space-1-5);
}
</style>
