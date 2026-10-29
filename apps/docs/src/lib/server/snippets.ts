import type { Code } from '#lib/docs/code.js';
import type { Framework, PerFramework } from '#lib/docs/framework.svelte.js';
import { highlight } from './highlight.js';

/**
 * The docs' hand-written code samples, kept as real files in src/lib/snippets so editors and
 * Prettier treat them as code. A page's samples are in a folder named after it; ones that differ
 * per framework are in its svelte/ and vue/ folders under the same name.
 */
const root = '/src/lib/snippets/';
const files = import.meta.glob<string>('/src/lib/snippets/**/*', {
	query: '?raw',
	import: 'default',
	eager: true
});

/** Highlights one sample, like snippet('theming/edit.css', 'tokens.css'). */
export function snippet(path: string, title?: string): Promise<Code> {
	const code = files[root + path];
	if (code === undefined) throw new Error(`No snippet at src/lib/snippets/${path}`);
	const lang = path.slice(path.lastIndexOf('.') + 1);
	return highlight(code.trim() + '\n', lang, title);
}

/**
 * Both versions of a sample: perFramework('home/after') highlights home/svelte/after.svelte and
 * home/vue/after.vue. Titles, when given, are per framework.
 */
export async function perFramework(
	path: string,
	titles: Partial<PerFramework<string>> = {}
): Promise<PerFramework<Code>> {
	const find = (framework: Framework) => {
		const name = path.replace(/[^/]+$/, (file) => `${framework}/${file}.`);
		const file = Object.keys(files).find((f) => f.startsWith(root + name));
		if (!file) throw new Error(`No ${framework} snippet for src/lib/snippets/${path}`);
		return file.slice(root.length);
	};
	return {
		svelte: await snippet(find('svelte'), titles.svelte),
		vue: await snippet(find('vue'), titles.vue)
	};
}
