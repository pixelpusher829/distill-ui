<script lang="ts">
	import { onMount } from 'svelte';
	import type { Component } from 'vue';

	/**
	 * Mounts a Vue demo inside the Svelte page. It only runs in the browser, so prerendered pages
	 * show the Svelte demo until someone picks Vue.
	 */
	let {
		load,
		withToaster = false
	}: { load: () => Promise<{ default: Component }>; withToaster?: boolean } = $props();

	let target: HTMLDivElement;

	onMount(() => {
		let unmount: (() => void) | undefined;
		let cancelled = false;
		Promise.all([
			import('vue'),
			load(),
			withToaster ? import('./WithToaster.vue') : undefined
		]).then(([{ createApp, h }, demo, wrapper]) => {
			if (cancelled) return;
			const app = createApp({
				render: () => (wrapper ? h(wrapper.default, null, () => h(demo.default)) : h(demo.default))
			});
			app.mount(target);
			unmount = () => app.unmount();
		});
		return () => {
			cancelled = true;
			unmount?.();
		};
	});
</script>

<div class="vue-demo" bind:this={target}></div>

<style>
	/* Let the demo's own blocks be the grid items, like the Svelte demos. */
	.vue-demo {
		display: contents;
	}
</style>
