import { getContext, setContext } from 'svelte';
import type { Popover } from 'melt/builders';

type PopoverContext = { popover: Popover };

const key = Symbol('distill-popover');
export const setPopoverContext = (ctx: PopoverContext) => setContext(key, ctx);
export const getPopoverContext = () => getContext<PopoverContext>(key);
