<script lang="ts">
	import { Avatar } from 'melt/builders';
	import type { HTMLAttributes } from 'svelte/elements';
	import { setAvatarContext } from './context.js';

	let {
		ref = $bindable(null),
		size = 'md',
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & {
		ref?: HTMLSpanElement | null;
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	const ctx: { avatar: Avatar; src: string | undefined } = $state({
		avatar: undefined as unknown as Avatar,
		src: undefined
	});
	ctx.avatar = new Avatar({ src: () => ctx.src });
	setAvatarContext(ctx);
</script>

<span {...restProps} bind:this={ref} class={['avatar', className]} data-size={size}>
	{@render children?.()}
</span>

<style>
	.avatar {
		--size: var(--dui-avatar-size, 2rem);

		position: relative;
		display: flex;
		flex-shrink: 0;
		width: var(--size);
		height: var(--size);
		/* Set by Avatar.Group so stacked avatars overlap with a gap ring. */
		margin-inline-start: var(--avatar-overlap, 0);
		border-radius: var(--dui-avatar-radius, var(--dui-radius-full));
		box-shadow: 0 0 0 var(--avatar-ring-width, 0) var(--dui-color-background);
		font-size: var(--dui-text-sm);
		user-select: none;

		&:first-child {
			margin-inline-start: 0;
		}

		/* A faint edge so light images don't blend into the page. */
		&::after {
			content: '';
			position: absolute;
			inset: 0;
			border: 1px solid color-mix(in oklch, var(--dui-color-foreground) 10%, transparent);
			border-radius: inherit;
			pointer-events: none;
		}
	}

	.avatar[data-size='sm'] {
		--size: var(--dui-avatar-size, 1.5rem);
		font-size: var(--dui-text-xs);
	}

	.avatar[data-size='lg'] {
		--size: var(--dui-avatar-size, 2.5rem);
	}
</style>
