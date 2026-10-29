import { createHighlighter, type Highlighter } from 'shiki';
import type { Code } from '#lib/docs/code.js';

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
		defaultColor: false,
		// The light theme's comment gray is 4.35:1 on the code background, under WCAG AA's 4.5:1.
		colorReplacements: { 'github-light-default': { '#6e7781': '#59636e' } }
	});
	return { code, html, lang, title };
}
