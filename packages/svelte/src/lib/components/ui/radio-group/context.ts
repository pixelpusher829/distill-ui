import { getContext, setContext } from 'svelte';

// The group's shared state. Items are native radio inputs that share one `name`, so the
// browser handles arrow keys and tab order; the context only keeps `value` in sync.
type RadioGroupContext = { name: string; value: string; disabled: boolean };

const key = Symbol('distill-radio-group');
export const setRadioGroupContext = (ctx: RadioGroupContext) => setContext(key, ctx);
export const getRadioGroupContext = () => getContext<RadioGroupContext>(key);
