import { getContext, setContext } from 'svelte';
import type { Menu } from './menu.svelte.js';

type DropdownMenuContext = { menu: Menu };

const key = Symbol('distill-dropdown-menu');
export const setDropdownMenuContext = (ctx: DropdownMenuContext) => setContext(key, ctx);
export const getDropdownMenuContext = () => getContext<DropdownMenuContext>(key);
