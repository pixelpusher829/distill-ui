<template>
	<div class="skeleton" aria-hidden="true"></div>
</template>

<!--
	Options you can set from a parent or on the skeleton itself:
	--dui-skeleton-radius, --dui-skeleton-bg
-->

<style scoped>
.skeleton {
	border-radius: var(--dui-skeleton-radius, var(--dui-radius-md));
	background: var(--dui-skeleton-bg, var(--dui-color-muted));
	animation: distill-pulse var(--dui-duration-pulse) var(--dui-ease-in-out) infinite;
}
</style>
