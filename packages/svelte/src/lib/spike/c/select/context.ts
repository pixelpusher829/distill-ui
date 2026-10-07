import { getContext, setContext } from 'svelte';
import type { Select } from 'melt/builders';

type SelectContext = { select: Select<string>; placeholder: { current: string } };

const key = Symbol('distill-select');
export const setSelectContext = (ctx: SelectContext) => setContext(key, ctx);
export const getSelectContext = () => getContext<SelectContext>(key);
