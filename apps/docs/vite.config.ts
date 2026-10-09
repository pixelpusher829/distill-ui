import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// The docs are hosted on Vercel. Every page is prerendered, so they're served as static files.
			adapter: adapter(),

			prerender: {
				// The Avatar demo points at a missing image on purpose, to show the fallback.
				handleHttpError: ({ path, message }) => {
					if (path === '/missing.png') return;
					throw new Error(message);
				}
			}
		})
	]
});
