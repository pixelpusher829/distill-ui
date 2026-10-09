export type CssOption = { name: string; default: string };

/**
 * Finds the public custom properties a component reads (`var(--dui-<component>-…, default)`)
 * and the default each one falls back to. Global tokens are left out.
 */
export function cssOptions(files: { content: string }[], component: string): CssOption[] {
	const found = new Map<string, string>();
	const prefixes = [`--dui-${component}-`, ...prefixAliases(component)];
	for (const { content } of files) {
		for (const match of content.matchAll(/var\((--dui-[a-z0-9-]+),\s*/g)) {
			const name = match[1];
			if (!prefixes.some((p) => name.startsWith(p)) || found.has(name)) continue;
			found.set(name, readUntilClose(content, match.index + match[0].length));
		}
	}
	return [...found].map(([name, value]) => ({ name, default: value }));
}

/** A few components read options under a shorter name. */
function prefixAliases(component: string) {
	return component === 'radio-group' ? ['--dui-radio-'] : [];
}

/** Reads a value up to the parenthesis that closes the `var(` it sits in. */
function readUntilClose(text: string, start: number) {
	let depth = 0;
	for (let i = start; i < text.length; i++) {
		if (text[i] === '(') depth++;
		else if (text[i] === ')') {
			if (depth === 0) return text.slice(start, i).replace(/\s+/g, ' ').trim();
			depth--;
		}
	}
	return '';
}
