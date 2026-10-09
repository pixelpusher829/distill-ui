/**
 * Builds theme colors for the theme builder. The lightness values are the ones in
 * tokens/themes/light.css and dark.css, so the defaults here give back the shipped theme.
 */

export type ThemeSettings = {
	/** Hue of the primary color, 0 to 360. */
	hue: number;
	/** How colorful the primary is. 0 keeps the default black and white primary. */
	chroma: number;
	/** The grays, tinted towards a hue or left neutral. */
	gray: keyof typeof grays;
	/** --dui-radius in rem. */
	radius: number;
};

export const grays = {
	neutral: { hue: 0, chroma: 0, label: 'Neutral' },
	slate: { hue: 255, chroma: 0.02, label: 'Slate' },
	stone: { hue: 60, chroma: 0.012, label: 'Stone' }
};

export const defaults: ThemeSettings = { hue: 225, chroma: 0, gray: 'neutral', radius: 0.625 };

/** Lightness of every gray, per theme. */
const grayLightness = {
	light: {
		background: 1,
		foreground: 0.145,
		card: 1,
		'card-foreground': 0.145,
		popover: 1,
		'popover-foreground': 0.145,
		secondary: 0.97,
		'secondary-foreground': 0.205,
		muted: 0.97,
		'muted-foreground': 0.556,
		accent: 0.97,
		'accent-foreground': 0.205,
		border: 0.922,
		input: 0.922
	},
	dark: {
		background: 0.145,
		foreground: 0.985,
		card: 0.205,
		'card-foreground': 0.985,
		popover: 0.205,
		'popover-foreground': 0.985,
		secondary: 0.269,
		'secondary-foreground': 0.985,
		muted: 0.269,
		'muted-foreground': 0.708,
		accent: 0.371,
		'accent-foreground': 0.985
	}
};

function oklch(l: number, c: number, h: number) {
	return c === 0 ? `oklch(${l} 0 0)` : `oklch(${l} ${+c.toFixed(3)} ${Math.round(h)})`;
}

/** Every --dui-color-* the builder changes, for one theme, as { name: value }. */
export function themeColors(settings: ThemeSettings, mode: 'light' | 'dark') {
	const gray = grays[settings.gray];
	const tint = (l: number) => {
		// Keep white pure white, and the near-whites only lightly tinted.
		const c = l === 1 ? 0 : l >= 0.97 ? gray.chroma / 2 : gray.chroma;
		return oklch(l, c, gray.hue);
	};

	const colors: Record<string, string> = {};
	for (const [name, l] of Object.entries(grayLightness[mode])) {
		colors[`--dui-color-${name}`] = tint(l);
	}

	const { hue, chroma } = settings;
	if (chroma === 0) {
		colors['--dui-color-primary'] = tint(mode === 'light' ? 0.205 : 0.922);
		colors['--dui-color-primary-foreground'] = tint(mode === 'light' ? 0.985 : 0.205);
		colors['--dui-color-ring'] = tint(mode === 'light' ? 0.708 : 0.556);
	} else if (mode === 'light') {
		colors['--dui-color-primary'] = oklch(0.55, chroma, hue);
		colors['--dui-color-primary-foreground'] = oklch(0.985, 0, 0);
		colors['--dui-color-ring'] = oklch(0.7, chroma, hue);
	} else {
		colors['--dui-color-primary'] = oklch(0.75, chroma, hue);
		colors['--dui-color-primary-foreground'] = tint(0.205);
		colors['--dui-color-ring'] = oklch(0.55, chroma, hue);
	}
	return colors;
}

/** The colors as an inline style, for previewing them on one element. */
export function toStyle(colors: Record<string, string>) {
	return Object.entries(colors)
		.map(([name, value]) => `${name}: ${value}`)
		.join('; ');
}

/** A theme file with the builder's colors swapped in, keeping its comments and layout. */
export function applyColors(file: string, colors: Record<string, string>) {
	return file.replace(/(--dui-color-[a-z-]+): [^;]+;/g, (line, name: string) =>
		name in colors ? `${name}: ${colors[name]};` : line
	);
}
