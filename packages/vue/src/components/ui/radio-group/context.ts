import { inject, provide, type Ref } from 'vue';

// The group's shared state. Items are native radio inputs that share one `name`, so the
// browser handles arrow keys and tab order; the context only keeps `value` in sync.
type RadioGroupContext = {
	name: Readonly<Ref<string>>;
	value: Ref<string>;
	disabled: Readonly<Ref<boolean>>;
};

const key = Symbol('distill-radio-group');
export const provideRadioGroup = (ctx: RadioGroupContext) => provide(key, ctx);
export const injectRadioGroup = () => inject<RadioGroupContext>(key)!;
