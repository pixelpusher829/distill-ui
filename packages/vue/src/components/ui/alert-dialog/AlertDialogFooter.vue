<template>
	<div class="footer"><slot /></div>
</template>

<style scoped>
.footer {
	display: flex;
	flex-direction: column-reverse;
	gap: var(--dui-space-2);

	@media (width >= 40rem) {
		flex-direction: row;
		justify-content: flex-end;
	}
}
</style>
