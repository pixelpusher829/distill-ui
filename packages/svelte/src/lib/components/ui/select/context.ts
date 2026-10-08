import { getContext, setContext } from 'svelte';
import type { Select } from 'melt/builders';

// One Melt builder per select, shared by its parts. Melt doesn't link the list to a label,
// so Label records its id here for the content to point aria-labelledby at.
export type SelectContext = { select: Select<string>; labelId: string; hasLabel: boolean };

const key = Symbol('distill-select');
export const setSelectContext = (ctx: SelectContext) => setContext(key, ctx);
export const getSelectContext = () => getContext<SelectContext>(key);
