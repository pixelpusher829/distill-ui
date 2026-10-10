import { inject, provide, type Ref } from 'vue';

export type TabsListVariant = 'default' | 'line';

// The list's variant changes how its triggers look, so the list shares it with them, letting
// each trigger style itself in its own file.
const key = Symbol('distill-tabs-list');
export const provideTabsList = (variant: Ref<TabsListVariant>) => provide(key, variant);
export const injectTabsList = () => inject<Ref<TabsListVariant> | undefined>(key, undefined);
