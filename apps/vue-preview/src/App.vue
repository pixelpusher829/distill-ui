<script setup lang="ts">
// Every demo on one page, for development and the browser tests in tests/.
import ButtonCustomDemo from './demos/ButtonCustomDemo.vue';
import ButtonDemo from './demos/ButtonDemo.vue';
import DialogDemo from './demos/DialogDemo.vue';
import SelectDemo from './demos/SelectDemo.vue';
import TabsDemo from './demos/TabsDemo.vue';
import TabsLineDemo from './demos/TabsLineDemo.vue';
</script>

<template>
	<main>
		<h1>All components</h1>
		<section data-testid="button">
			<h2>Button</h2>
			<ButtonDemo /><ButtonCustomDemo />
		</section>
		<section data-testid="dialog">
			<h2>Dialog</h2>
			<DialogDemo />
		</section>
		<section data-testid="select">
			<h2>Select</h2>
			<SelectDemo />
		</section>
		<section data-testid="tabs">
			<h2>Tabs</h2>
			<TabsDemo /><TabsLineDemo />
		</section>
	</main>
</template>

<style>
/* The same reset as the docs site, which most projects already have. */
*,
*::before,
*::after {
	box-sizing: border-box;
}

body {
	margin: 0;
	background: var(--dui-color-background);
	color: var(--dui-color-foreground);
	font-family: var(--dui-font-sans);
}
</style>

<style scoped>
main {
	max-width: 48rem;
	margin: 0 auto;
	padding: var(--dui-space-10) var(--dui-space-4);
}

section {
	display: grid;
	gap: var(--dui-space-4);
	justify-items: start;
	padding-block: var(--dui-space-6);
	border-top: 1px solid var(--dui-color-border);
}

h2 {
	margin: 0;
	font-size: var(--dui-text-base);
	font-weight: var(--dui-font-weight-medium);
}
</style>
