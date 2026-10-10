<template>
	<div class="header"><slot /></div>
</template>

<style scoped>
.header {
	display: flex;
	flex-direction: column;
	gap: var(--dui-space-2);
}
</style>
