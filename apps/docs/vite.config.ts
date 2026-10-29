import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { docsPaths } from './src/lib/docs/components.js';

// The frameworks the docs are written for. src/params.ts accepts the same two in URLs.
const frameworks = ['svelte', 'vue'];

export default defineConfig({
	plugins: [
		// Compiles the Vue demos, which the component pages mount in the browser.
		vue(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Every page is prerendered, so the site is built as plain static files (SSG), with no
			// server. On Vercel the static adapter needs no extra setup.
			adapter: adapter(),

			prerender: {
				// Every page the site has, listed rather than found by following links: the pages
				// without a param ('*'), each docs page once per framework, and the old /docs/... URLs,
				// which redirect to the Svelte pages. Links are still followed, so a link to a page
				// that doesn't exist fails the build.
				entries: [
					'*',
					...frameworks.flatMap((framework) =>
						docsPaths.map((path) => `/${framework}${path}` as const)
					),
					...docsPaths
				],

				// The Avatar demo points at a missing image on purpose, to show the fallback.
				handleHttpError: ({ path, message }) => {
					if (path === '/missing.png') return;
					throw new Error(message);
				}
			}
		})
	]
});
