<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { getAvatarContext } from './context.js';

	let {
		ref = $bindable(null),
		src,
		alt,
		style,
		class: className,
		...restProps
	}: HTMLImgAttributes & { ref?: HTMLImageElement | null; src: string; alt: string } = $props();

	const ctx = getAvatarContext();
	// Set right away too, not only in the effect: effects don't run during server rendering,
	// and the browser keeps whatever `src` the server sent.
	// svelte-ignore state_referenced_locally
	ctx.src = src;
	$effect.pre(() => {
		ctx.src = src;
	});

	// Melt listens for the image's load and error events. When the page is server-rendered,
	// the image can finish before those listeners attach, so check its state once mounted.
	$effect(() => {
		if (!ref?.complete || !src) return;
		if (ref.naturalWidth > 0) return ctx.avatar.image.onload();
		ctx.avatar.image.onerror();
	});
</script>

<img
	{...restProps}
	{...ctx.avatar.image}
	bind:this={ref}
	{alt}
	style="{ctx.avatar.image.style}; {style ?? ''}"
	class={['image', className]}
/>

<style>
	.image {
		width: 100%;
		height: 100%;
		aspect-ratio: 1;
		border-radius: inherit;
		object-fit: cover;
	}
</style>
