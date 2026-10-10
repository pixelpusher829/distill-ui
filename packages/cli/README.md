# distill-ui

Copy [distill-ui](https://github.com/pixelpusher829/distill-ui) components into your Svelte 5, Vue 3 or Nuxt project. They're styled with plain scoped CSS, with no Tailwind needed.

```sh
npx distill-ui init          # copy the tokens and import them
npx distill-ui add button    # copy a component (and any it uses)
npx distill-ui add --all     # copy every component
npx distill-ui list          # show what you can add
```

`init` saves its choices in `distill-ui.json`:

```json
{
	"framework": "svelte",
	"components": "src/lib/components/ui",
	"styles": "src/lib/styles/distill-ui"
}
```

Edit the folders before running `add` if you want the files somewhere else.

`init` finds your framework in `package.json`:

- **SvelteKit**: files go in `src/lib`, and the tokens are imported in `src/routes/+layout.svelte`.
- **Vite + Vue**: files go in `src/components/ui` and `src/styles/distill-ui`, and the tokens are imported at the top of `src/main.ts`.
- **Nuxt**: files go in `app/components/ui` and `app/assets/styles/distill-ui` (without the `app/` in projects that don't have that folder). It prints the lines to add to `nuxt.config.ts`.

`add` never replaces a file you've changed unless you pass `--overwrite`. It installs the npm packages the components need (`melt` and `@floating-ui/dom` for Svelte, `reka-ui` for Vue) with the package manager your lockfile points to. Pass `--no-install` to just print the command.

## Options

| Option             | What it does                                         |
| ------------------ | ---------------------------------------------------- |
| `--cwd <path>`     | Run in another folder                                |
| `--overwrite`      | Replace files that already exist                     |
| `--no-install`     | Print the install command instead of running it      |
| `--registry <url>` | Download components from another URL or local folder |

## Working on the CLI

The CLI reads the JSON in the repo's `registry/` folder, which `bun run registry` builds from `packages/svelte`, `packages/vue` and `packages/tokens`. To try a change without publishing, point it at your checkout:

```sh
node path/to/distill-ui/packages/cli/src/index.js init --registry path/to/distill-ui/registry
```

Run the tests with `bun test` in this folder.
