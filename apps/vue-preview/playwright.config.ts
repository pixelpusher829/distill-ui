import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: 'tests',
	webServer: {
		command: 'bun run build && bun run preview --port 4174',
		port: 4174,
		reuseExistingServer: !process.env.CI
	},
	use: {
		baseURL: 'http://localhost:4174',
		// Lets CI or a sandbox point at a preinstalled Chromium; locally run `bunx playwright install chromium` once.
		launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined }
	}
});
