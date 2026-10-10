/**
 * Every component page in the docs. `demos` are file names in `demos/<framework>/`, shown in
 * order: the first is the main preview, the rest get their own heading.
 */
export type ComponentDoc = {
	slug: string;
	name: string;
	description: string;
	/** Where the behavior comes from, shown under the title. */
	builtOn: string;
	/** Where the Vue version's behavior comes from, when it isn't the Reka UI part of the same name. */
	builtOnVue?: string;
	demos: { file: string; title?: string }[];
};

export const components: ComponentDoc[] = [
	{
		slug: 'alert',
		name: 'Alert',
		description: 'A short message that draws attention, with an optional icon.',
		builtOn: 'Plain HTML',
		demos: [{ file: 'alert' }]
	},
	{
		slug: 'alert-dialog',
		name: 'Alert Dialog',
		description:
			'A dialog that interrupts to ask for a decision. Clicking outside does not close it.',
		builtOn: 'Melt UI Dialog',
		builtOnVue: 'Reka UI Alert Dialog',
		demos: [{ file: 'alert-dialog' }]
	},
	{
		slug: 'avatar',
		name: 'Avatar',
		description: "An image of a person, with a fallback while it loads or if it can't.",
		builtOn: 'Melt UI Avatar',
		demos: [{ file: 'avatar' }, { file: 'avatar-group', title: 'Group' }]
	},
	{
		slug: 'badge',
		name: 'Badge',
		description: 'A small label. Pass `href` to make it a link.',
		builtOn: 'Plain HTML',
		demos: [{ file: 'badge' }]
	},
	{
		slug: 'button',
		name: 'Button',
		description: 'A button, or a link styled as one when you pass `href`.',
		builtOn: 'Native <button>',
		demos: [{ file: 'button' }, { file: 'button-custom', title: 'Customizing from a parent' }]
	},
	{
		slug: 'card',
		name: 'Card',
		description: 'A container with a header, content and footer.',
		builtOn: 'Plain HTML',
		demos: [{ file: 'card' }]
	},
	{
		slug: 'checkbox',
		name: 'Checkbox',
		description: 'A box that is checked, unchecked or partly checked.',
		builtOn: 'Native <input type="checkbox">',
		demos: [{ file: 'checkbox' }]
	},
	{
		slug: 'dialog',
		name: 'Dialog',
		description: 'A window on top of the page. Focus stays inside until it closes.',
		builtOn: 'Melt UI Dialog',
		demos: [{ file: 'dialog' }]
	},
	{
		slug: 'dropdown-menu',
		name: 'Dropdown Menu',
		description: 'A list of actions that opens from a button.',
		builtOn: 'Our own menu builder on Melt UI Popover',
		builtOnVue: 'Reka UI Dropdown Menu',
		demos: [{ file: 'dropdown-menu' }]
	},
	{
		slug: 'input',
		name: 'Input',
		description: 'A text field.',
		builtOn: 'Native <input>',
		demos: [{ file: 'input' }, { file: 'input-custom', title: 'Customizing from a parent' }]
	},
	{
		slug: 'label',
		name: 'Label',
		description: 'A caption for a form control.',
		builtOn: 'Native <label>',
		demos: [{ file: 'label' }]
	},
	{
		slug: 'popover',
		name: 'Popover',
		description: 'Rich content in a floating panel, opened by a button.',
		builtOn: 'Melt UI Popover',
		demos: [{ file: 'popover' }]
	},
	{
		slug: 'radio-group',
		name: 'Radio Group',
		description: 'A set of options where only one can be picked.',
		builtOn: 'Native <input type="radio">',
		demos: [{ file: 'radio-group' }]
	},
	{
		slug: 'select',
		name: 'Select',
		description: 'Pick one value from a list.',
		builtOn: 'Melt UI Select',
		demos: [{ file: 'select' }]
	},
	{
		slug: 'separator',
		name: 'Separator',
		description: 'A line between pieces of content.',
		builtOn: 'Plain HTML',
		demos: [{ file: 'separator' }]
	},
	{
		slug: 'sheet',
		name: 'Sheet',
		description: 'A dialog that slides in from an edge of the screen.',
		builtOn: 'Melt UI Dialog',
		demos: [{ file: 'sheet' }]
	},
	{
		slug: 'skeleton',
		name: 'Skeleton',
		description: 'A placeholder shown while content loads.',
		builtOn: 'Plain HTML',
		demos: [{ file: 'skeleton' }]
	},
	{
		slug: 'switch',
		name: 'Switch',
		description: 'An on and off toggle.',
		builtOn: 'Native <input type="checkbox" role="switch">',
		demos: [{ file: 'switch' }, { file: 'switch-custom', title: 'Customizing from a parent' }]
	},
	{
		slug: 'tabs',
		name: 'Tabs',
		description: 'Panels of content where one shows at a time.',
		builtOn: 'Melt UI Tabs',
		demos: [{ file: 'tabs' }, { file: 'tabs-line', title: 'Line variant' }]
	},
	{
		slug: 'textarea',
		name: 'Textarea',
		description: 'A text field for several lines. It grows with its content.',
		builtOn: 'Native <textarea>',
		demos: [{ file: 'textarea' }]
	},
	{
		slug: 'toast',
		name: 'Toast',
		description: 'A short notification that appears in a corner and goes away on its own.',
		builtOn: 'Melt UI Toaster',
		builtOnVue: 'Our own toast store',
		demos: [{ file: 'toast' }]
	},
	{
		slug: 'tooltip',
		name: 'Tooltip',
		description: 'A short hint shown on hover or keyboard focus.',
		builtOn: 'Melt UI Tooltip',
		demos: [{ file: 'tooltip' }]
	}
];

export const guides = [
	{ href: '/docs', title: 'Introduction' },
	{ href: '/docs/installation', title: 'Installation' },
	{ href: '/docs/theming', title: 'Theming' },
	{ href: '/docs/theme-builder', title: 'Theme builder' },
	{ href: '/docs/customizing', title: 'Customizing' },
	{ href: '/docs/styling-from-scratch', title: 'Styling from scratch' }
];

/** Where a component's behavior comes from, for one framework. */
export function builtOn(doc: ComponentDoc, framework: 'svelte' | 'vue') {
	if (framework === 'svelte') return doc.builtOn;
	return doc.builtOnVue ?? doc.builtOn.replace('Melt UI', 'Reka UI');
}
