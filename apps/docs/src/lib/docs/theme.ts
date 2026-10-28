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

export const grays = {
	neutral: { hue: 0, chroma: 0, label: 'Neutral' },
	slate: { hue: 260, chroma: 0.02, label: 'Slate' },
	stone: { hue: 58, chroma: 0.013, label: 'Stone' }
};

export const defaults: ThemeSettings = { hue: 260, chroma: 0.2, gray: 'slate', radius: 0.625 };

function oklch(l: number, c: number, h: number) {
	return c === 0 ? `oklch(${l} 0 0)` : `oklch(${l} ${+c.toFixed(3)} ${Math.round(h)})`;
}

/** The seeds the builder changes, as { name: value }. */
export function themeSeeds({ hue, chroma, gray }: ThemeSettings) {
	const g = grays[gray];
	return {
		'--dui-neutral': oklch(0.556, g.chroma, g.hue),
		'--dui-primary': oklch(0.556, chroma, hue)
	};
}

/** The seeds as an inline style, for previewing them on one element. */
export function toStyle(colors: Record<string, string>) {
	return Object.entries(colors)
		.map(([name, value]) => `${name}: ${value}`)
		.join('; ');
}
