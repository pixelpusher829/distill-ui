/**
 * Builds the seed colors for the theme builder. tokens.css works out every other color from
 * them, so the defaults here give back the shipped theme.
 */

export type ThemeSettings = {
	/** Hue of the primary color, 0 to 360. */
	hue: number;
	/** How colorful the primary is. 0 makes it gray. */
	chroma: number;
	/** The grays, tinted towards a hue or left neutral. */
	gray: keyof typeof grays;
	/** --dui-radius in rem. */
	radius: number;
};

/** The primary presets in tokens.css. */
export const primaries = [
	{ name: 'Blue', token: '--dui-blue', hue: 260, chroma: 0.2 },
	{ name: 'Cyan', token: '--dui-cyan', hue: 225, chroma: 0.12 },
	{ name: 'Violet', token: '--dui-violet', hue: 285, chroma: 0.2 },
	{ name: 'Forest', token: '--dui-forest', hue: 150, chroma: 0.15 },
	{ name: 'Ember', token: '--dui-ember', hue: 35, chroma: 0.19 }
];

/** The gray presets in tokens.css. */
export const grays = {
	neutral: { token: '--dui-gray-neutral', hue: 0, chroma: 0, label: 'Neutral' },
	slate: { token: '--dui-gray-slate', hue: 260, chroma: 0.02, label: 'Slate' },
	stone: { token: '--dui-gray-stone', hue: 58, chroma: 0.013, label: 'Stone' }
};

export const defaults: ThemeSettings = { hue: 260, chroma: 0.2, gray: 'slate', radius: 0.625 };

function oklch(l: number, c: number, h: number) {
	return c === 0 ? `oklch(${l} 0 0)` : `oklch(${l} ${+c.toFixed(3)} ${Math.round(h)})`;
}

/** The primary seed: a preset token when the color is one, otherwise the color itself. */
export function primaryValue(hue: number, chroma: number) {
	const preset = primaries.find((p) => p.hue === hue && p.chroma === chroma);
	return preset ? `var(${preset.token})` : oklch(0.556, chroma, hue);
}

/** The seeds the builder changes, as { name: value }. */
export function themeSeeds({ hue, chroma, gray }: ThemeSettings) {
	return {
		'--dui-primary': primaryValue(hue, chroma),
		'--dui-neutral': `var(${grays[gray].token})`
	};
}

/** The seeds as an inline style, for previewing them on one element. */
export function toStyle(colors: Record<string, string>) {
	return Object.entries(colors)
		.map(([name, value]) => `${name}: ${value}`)
		.join('; ');
}
