# distill-ui

Copy [distill-ui](https://github.com/pixelpusher829/distill-ui) components into your Svelte 5 project. They're styled with plain scoped CSS, with no Tailwind needed.

```sh
npx distill-ui init          # copy the tokens and import them in your root layout
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

`add` never replaces a file you've changed unless you pass `--overwrite`. It installs the npm packages the components need (`melt` and `@floating-ui/dom`) with the package manager your lockfile points to. Pass `--no-install` to just print the command.

## Options

| Option             | What it does                                         |
| ------------------ | ---------------------------------------------------- |
| `--cwd <path>`     | Run in another folder                                |
| `--overwrite`      | Replace files that already exist                     |
| `--no-install`     | Print the install command instead of running it      |
| `--registry <url>` | Download components from another URL or local folder |

## Working on the CLI

The CLI reads the JSON in the repo's `registry/` folder, which `bun run registry` builds from `packages/svelte` and `packages/tokens`. To try a change without publishing, point it at your checkout:

```sh
node path/to/distill-ui/packages/cli/src/index.js init --registry path/to/distill-ui/registry
```

Run the tests with `bun test` in this folder.
