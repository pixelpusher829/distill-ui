import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// The docs used to be at /docs/..., with a switch for the framework. Those links now go to the
// Svelte pages for good. vite.config.ts lists the old URLs to prerender, and on Vercel the
// prerendered redirects become real 301s.
export const load: PageServerLoad = ({ params }) => {
	redirect(301, `/svelte/docs${params.path ? `/${params.path}` : ''}`);
};
