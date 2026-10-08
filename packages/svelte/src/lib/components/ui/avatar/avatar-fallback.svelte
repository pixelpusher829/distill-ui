<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getAvatarContext } from './context.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { ref?: HTMLSpanElement | null } = $props();

	const ctx = getAvatarContext();
</script>

<span {...restProps} {...ctx.avatar.fallback} bind:this={ref} class={['fallback', className]}>
	{@render children?.()}
</span>

<!--
	Options you can set from a parent or on the avatar fallback itself:
	--dui-avatar-fallback-bg
-->

<style>
	.fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		background: var(--dui-avatar-fallback-bg, var(--dui-color-muted));
		/* Pulled toward the foreground so initials pass AA contrast on the muted fill. */
		color: var(
			--dui-avatar-fallback-fg,
			color-mix(in oklch, var(--dui-color-muted-foreground) 70%, var(--dui-color-foreground))
		);
	}
</style>
