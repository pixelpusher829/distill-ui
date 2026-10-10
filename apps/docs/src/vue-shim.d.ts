// svelte-check doesn't read .vue files. The Vue demos and components are checked with
// vue-tsc in packages/vue and apps/vue-preview; here they only need to be components.
declare module '*.vue' {
	import type { Component } from 'vue';
	const component: Component;
	export default component;
}
