import { createHighlighter, type Highlighter } from 'shiki';
import type { Code } from './code.js';

let highlighter: Promise<Highlighter> | undefined;

/**
 * Highlights code at build time. Both themes are written into the HTML as CSS variables, and
 * app.css picks one, so the client never loads Shiki.
 */
export async function highlight(code: string, lang: string, title?: string): Promise<Code> {
	highlighter ??= createHighlighter({
		themes: ['github-light-default', 'github-dark-default'],
		langs: ['svelte', 'vue', 'css', 'ts', 'sh', 'json', 'html']
	});
	const html = (await highlighter).codeToHtml(code, {
		lang,
		themes: { light: 'github-light-default', dark: 'github-dark-default' },
		defaultColor: false
	});
	return { code, html, lang, title };
}

/** Highlights every snippet in an object, keeping the keys. */
export async function highlightAll<K extends string>(
	snippets: Record<K, { code: string; lang: string; title?: string }>
): Promise<Record<K, Code>> {
	const entries = await Promise.all(
		Object.entries<{ code: string; lang: string; title?: string }>(snippets).map(
			async ([key, s]) => [key, await highlight(s.code.trim() + '\n', s.lang, s.title)] as const
		)
	);
	return Object.fromEntries(entries) as Record<K, Code>;
}
