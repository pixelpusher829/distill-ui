import { getContext, setContext } from 'svelte';
import type { Tabs } from 'melt/builders';

export type TabsListVariant = 'default' | 'line';

// One Melt builder per tab set, shared by its parts. The list's variant changes how its
// triggers look, so it travels through context too, letting each trigger style itself in
// its own file.
type TabsContext = { tabs: Tabs<string>; listVariant: TabsListVariant };

const key = Symbol('distill-tabs');
export const setTabsContext = (ctx: TabsContext) => setContext(key, ctx);
export const getTabsContext = () => getContext<TabsContext>(key);
