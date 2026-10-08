import { getContext, setContext } from 'svelte';
import type { Tooltip } from 'melt/builders';

type TooltipContext = { tooltip: Tooltip };

const key = Symbol('distill-tooltip');
export const setTooltipContext = (ctx: TooltipContext) => setContext(key, ctx);
export const getTooltipContext = () => getContext<TooltipContext>(key);
