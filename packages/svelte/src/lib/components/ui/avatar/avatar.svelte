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
		--_size: var(--avatar-size, 2rem);

		position: relative;
		display: flex;
		flex-shrink: 0;
		width: var(--_size);
		height: var(--_size);
		/* Set by Avatar.Group so stacked avatars overlap with a gap ring. */
		margin-inline-start: var(--_avatar-overlap, 0);
		border-radius: var(--avatar-radius, var(--radius-full));
		box-shadow: 0 0 0 var(--_avatar-ring-width, 0) var(--color-background);
		font-size: var(--text-sm);
		user-select: none;

		&:first-child {
			margin-inline-start: 0;
		}

		/* A faint edge so light images don't blend into the page. */
		&::after {
			content: '';
			position: absolute;
			inset: 0;
			border: 1px solid color-mix(in oklch, var(--color-foreground) 10%, transparent);
			border-radius: inherit;
			pointer-events: none;
		}
	}

	.avatar[data-size='sm'] {
		--_size: var(--avatar-size, 1.5rem);
		font-size: var(--text-xs);
	}

	.avatar[data-size='lg'] {
		--_size: var(--avatar-size, 2.5rem);
	}
</style>
