import { getContext, setContext } from 'svelte';
import type { Avatar } from 'melt/builders';

// The Melt builder tracks whether the image loaded, so Fallback knows when to show.
// Image passes its `src` up through `src` so the builder can watch it.
type AvatarContext = { avatar: Avatar; src: string | undefined };

const key = Symbol('distill-avatar');
export const setAvatarContext = (ctx: AvatarContext) => setContext(key, ctx);
export const getAvatarContext = () => getContext<AvatarContext>(key);
