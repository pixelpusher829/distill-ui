import { inject, provide, type Ref } from 'vue';

// Reka's trigger has no id of its own, so the root makes ids for the label to point at
// the trigger, and Label records that it exists for the list to point aria-labelledby back.
export type SelectContext = { labelId: string; triggerId: string; hasLabel: Ref<boolean> };

const key = Symbol('distill-select');
export const provideSelect = (ctx: SelectContext) => provide(key, ctx);
export const injectSelect = () => inject<SelectContext>(key)!;
