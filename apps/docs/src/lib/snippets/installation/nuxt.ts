export default defineNuxtConfig({
	css: ['~/assets/styles/distill-ui/tokens.css'],
	// Each component folder has an index.ts; auto-import only the .vue files so they don't clash.
	components: [{ path: '~/components', extensions: ['.vue'] }]
});
