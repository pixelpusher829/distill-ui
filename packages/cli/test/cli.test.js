// @ts-check
import { describe, expect, test, beforeEach, afterEach } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const cli = join(import.meta.dirname, '../src/index.js');
const registry = join(import.meta.dirname, '../../../registry');

/** @type {string} */
let dir;

/** @param {string[]} args */
function run(...args) {
	const result = spawnSync('node', [cli, ...args, '--cwd', dir, '--registry', registry], {
		encoding: 'utf8'
	});
	return { code: result.status, out: result.stdout + result.stderr };
}

/** @param {object} pkg */
function project(pkg) {
	writeFileSync(join(dir, 'package.json'), JSON.stringify(pkg));
}

const kitProject = {
	devDependencies: { svelte: '^5.57.1', '@sveltejs/kit': '^3.0.0' },
	imports: { '#lib/*': './src/lib/*' }
};

beforeEach(() => {
	dir = mkdtempSync(join(tmpdir(), 'distill-ui-cli-'));
});

afterEach(() => {
	rmSync(dir, { recursive: true, force: true });
});

describe('init', () => {
	test('copies the tokens and creates a layout that imports them', () => {
		project(kitProject);
		writeFileSync(join(dir, 'tsconfig.json'), '{}');
		const { code } = run('init');
		expect(code).toBe(0);
		expect(existsSync(join(dir, 'src/lib/styles/distill-ui/tokens.css'))).toBe(true);
		expect(existsSync(join(dir, 'src/lib/styles/distill-ui/themes/dark.css'))).toBe(true);
		const layout = readFileSync(join(dir, 'src/routes/+layout.svelte'), 'utf8');
		expect(layout).toContain('<script lang="ts">');
		expect(layout).toContain("import '#lib/styles/distill-ui/tokens.css';");
		const config = JSON.parse(readFileSync(join(dir, 'distill-ui.json'), 'utf8'));
		expect(config.components).toBe('src/lib/components/ui');
	});

	test('adds the import to an existing layout once', () => {
		project({ devDependencies: { svelte: '^5.0.0', '@sveltejs/kit': '^2.0.0' } });
		mkdirSync(join(dir, 'src/routes'), { recursive: true });
		writeFileSync(
			join(dir, 'src/routes/+layout.svelte'),
			'<script module>\n\texport const x = 1;\n</script>\n\n<script>\n\tlet { children } = $props();\n</script>\n\n{@render children()}\n'
		);
		run('init');
		run('init');
		const layout = readFileSync(join(dir, 'src/routes/+layout.svelte'), 'utf8');
		expect(layout).toBe(
			"<script module>\n\texport const x = 1;\n</script>\n\n<script>\n\timport '$lib/styles/distill-ui/tokens.css';\n\tlet { children } = $props();\n</script>\n\n{@render children()}\n"
		);
	});

	test('refuses projects without Svelte 5 or Vue 3', () => {
		project({ dependencies: { svelte: '^4.2.0' } });
		expect(run('init').out).toContain('needs Svelte 5');
		project({ dependencies: { vue: '^2.7.0' } });
		expect(run('init').out).toContain('needs Vue 3');
		project({ dependencies: { react: '^19.0.0' } });
		expect(run('init').out).toContain("Couldn't find Svelte or Vue");
	});
});

describe('add', () => {
	beforeEach(() => {
		project(kitProject);
		run('init');
	});

	test('copies a component with the components it uses and lists missing packages', () => {
		const { code, out } = run('add', 'dialog', '--no-install');
		expect(code).toBe(0);
		expect(existsSync(join(dir, 'src/lib/components/ui/dialog/dialog-content.svelte'))).toBe(true);
		expect(existsSync(join(dir, 'src/lib/components/ui/button/button.svelte'))).toBe(true);
		expect(out).toContain('npm install @floating-ui/dom@^1.6.0 melt@0.44.0');
		expect(out).toContain("from '#lib/components/ui/dialog/index.js'");
	});

	test("keeps files you've changed unless --overwrite is passed", () => {
		run('add', 'button', '--no-install');
		const file = join(dir, 'src/lib/components/ui/button/button.svelte');
		writeFileSync(file, 'mine');
		expect(run('add', 'button', '--no-install').out).toContain('Kept 1 files');
		expect(readFileSync(file, 'utf8')).toBe('mine');
		run('add', 'button', '--no-install', '--overwrite');
		expect(readFileSync(file, 'utf8')).not.toBe('mine');
	});

	test("names components that don't exist", () => {
		const { code, out } = run('add', 'buton');
		expect(code).toBe(1);
		expect(out).toContain('No component named "buton"');
	});

	test('asks for init first', () => {
		rmSync(join(dir, 'distill-ui.json'));
		expect(run('add', 'button').out).toContain('Run `npx distill-ui init` first.');
	});
});

describe('vue', () => {
	test('init adds the tokens import to src/main.ts once', () => {
		project({ dependencies: { vue: '^3.5.0' } });
		mkdirSync(join(dir, 'src'));
		writeFileSync(join(dir, 'src/main.ts'), "import { createApp } from 'vue';\n");
		expect(run('init').code).toBe(0);
		run('init');
		expect(existsSync(join(dir, 'src/styles/distill-ui/tokens.css'))).toBe(true);
		expect(readFileSync(join(dir, 'src/main.ts'), 'utf8')).toBe(
			"import './styles/distill-ui/tokens.css';\nimport { createApp } from 'vue';\n"
		);
		const config = JSON.parse(readFileSync(join(dir, 'distill-ui.json'), 'utf8'));
		expect(config).toEqual({
			framework: 'vue',
			components: 'src/components/ui',
			styles: 'src/styles/distill-ui',
			registry
		});
	});

	test('add copies Vue files and installs reka-ui', () => {
		project({ dependencies: { vue: '^3.5.0' } });
		writeFileSync(
			join(dir, 'tsconfig.app.json'),
			'{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }'
		);
		run('init');
		const { code, out } = run('add', 'dialog', '--no-install');
		expect(code).toBe(0);
		expect(existsSync(join(dir, 'src/components/ui/dialog/DialogContent.vue'))).toBe(true);
		expect(existsSync(join(dir, 'src/components/ui/button/Button.vue'))).toBe(true);
		expect(out).toContain('npm install reka-ui@');
		expect(out).toContain("import * as Dialog from '@/components/ui/dialog'");
	});

	test('nuxt uses the app folder and prints the nuxt.config line', () => {
		project({ dependencies: { nuxt: '^4.0.0', vue: '^3.5.0' } });
		mkdirSync(join(dir, 'app'));
		const { out } = run('init');
		expect(out).toContain("css: ['~/assets/styles/distill-ui/tokens.css'],");
		expect(out).toContain("components: [{ path: '~/components', extensions: ['.vue'] }],");
		expect(existsSync(join(dir, 'app/assets/styles/distill-ui/tokens.css'))).toBe(true);
		expect(run('add', 'button', '--no-install').out).toContain(
			"import { ... } from '~/components/ui/button'"
		);
		expect(existsSync(join(dir, 'app/components/ui/button/Button.vue'))).toBe(true);
	});

	test('list shows the Vue components before init', () => {
		project({ dependencies: { vue: '^3.5.0' } });
		expect(run('list').out).toContain('dropdown-menu');
	});
});
