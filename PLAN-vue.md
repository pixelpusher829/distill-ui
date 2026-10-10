# Plan: distill-ui — Vue port

Prerequisite: **`PLAN-svelte.md` is complete through at least Phase 5 (launched), and `CONVENTIONS.md` is stable.** This plan reuses the Svelte library as the primary reference, so most design decisions are already made. The job here is porting, not designing.

## Goal

Bring the same library to Vue 3 (and Nuxt): copy-into-your-project components, styled with **scoped `<style>` blocks and CSS custom properties instead of Tailwind**, visually identical to the Svelte version and sharing the same tokens.

The core goal carries over from Svelte: **a user opens a component file, sees readable scoped CSS, and edits it** — no `:deep()` or global stylesheet workarounds needed on their side.

Behavior and accessibility come from **Reka UI**. Component structure and props are referenced from **shadcn-vue** (MIT). Styling comes from **our own Svelte components**, which are already vanilla CSS.

## What is reused vs. new

| Reused from the Svelte work | New for Vue |
|---|---|
| `packages/tokens` (tokens, themes, keyframes) — unchanged | `packages/vue` component files |
| Shared section of `CONVENTIONS.md` | Vue section of `CONVENTIONS.md` (scoping strategy) |
| Variant vocabulary, custom-property names, data-attribute selectors | Props/emit patterns, `v-model` wiring |
| Nearly all component CSS (copy from the `.svelte` `<style>` blocks) | Adjustments where Reka UI's DOM or attributes differ from Melt UI |
| Docs content, theming guide, CLI/registry infrastructure | Vue code samples, Vue preview rendering, `registry/vue/` |
| Quality bar | Vue-specific checks (vue-tsc, Nuxt SSR) |

## Principles

All principles from `PLAN-svelte.md` still apply. In addition:

1. **Visual parity with Svelte.** The same component with the same props should look the same in both frameworks. Differences are bugs unless documented.
2. **Copy CSS, don't re-derive it.** Start every component's styles from our Svelte version, not from shadcn-vue's Tailwind classes. Use shadcn-vue only for markup structure and props.
3. **Shared tokens stay shared.** If Vue needs a token that doesn't exist, add it to `packages/tokens` (so Svelte gets it too), never to a Vue-only file.
4. **Idiomatic Vue API.** Use `v-model` where shadcn-vue does, `defineProps`/`defineEmits` with TypeScript, and Reka UI's `as-child` pattern where it helps.

## Licensing and attribution

- Add shadcn-vue's copyright notice to `LICENSE`, and credit shadcn-vue and Reka UI in the README.
- Clone shadcn-vue into a gitignored `reference/shadcn-vue/` folder for comparison.

## Repo additions

```
packages/
├── tokens/          # existing, unchanged
├── svelte/          # existing
└── vue/
    └── src/components/ui/
        ├── button/
        │   ├── Button.vue
        │   └── index.ts
        └── ...
apps/
├── docs/            # existing SvelteKit docs (gains a framework switcher)
└── vue-preview/     # small Vite + Vue app that renders Vue examples (see Phase 4)
registry/
├── svelte/
└── vue/
```

---

## Phase 0 — Setup

- [ ] Create `packages/vue` (Vue 3, Vite library mode, TypeScript, vue-tsc) with `reka-ui` as a dependency and `packages/tokens` as a workspace dependency.
- [ ] Clone shadcn-vue into `reference/shadcn-vue/`.
- [ ] Add a minimal Vite + Vue playground (it becomes `apps/vue-preview` in Phase 4) to view components during development.
- [ ] Update LICENSE and README credits.

**Done when:** the playground renders a placeholder component using `tokens.css` and the dark theme toggle works.

## Phase 1 — Vue conventions spike

Port the same four spike components as Svelte: **Button, Dialog, Select, Tabs**. Compare them side by side with the Svelte versions.

### 1a. Scoping strategy

Vue's scoping differs from Svelte's:

- Vue adds a `data-v-xxxx` attribute to elements in a component's template, **and to the root element of any child component** used in that template.
- Reka UI parts (e.g. `<DialogContent>`, `<SelectTrigger>`) usually render a single root element, so a class on them should receive our scoped styles directly. This may make Vue simpler than Svelte.
- Anything deeper than a child component's root needs `:deep()`.
- Teleported content (`DialogPortal`, `SelectPortal`) keeps its scope attribute, but verify this.

Verify on Dialog and Select (including portalled content and nested parts), then pick between:
- **Option A — classes on Reka parts + scoped styles**, using `:deep()` only where unavoidable.
- **Option B — `as-child`**, rendering our own element so it's in our template.

Criteria are the same as Svelte: styles reliably apply, readable files, consumer overrides work.

### 1b. Mapping Melt UI → Reka UI attributes

- [ ] For each spike component, list the data attributes and DOM structure Reka UI produces and compare with the Melt-based Svelte version. Note differences (attribute names, state values, extra wrapper elements) in the Vue section of `CONVENTIONS.md`.
- [ ] Where Reka UI exposes CSS variables (e.g. popper/content sizing like available height or transform origin), map them to what our Svelte CSS expects.

### 1c. Props, variants and v-model

- [ ] `variant` and `size` props render as `data-variant` / `data-size`, same vocabulary as Svelte.
- [ ] Match shadcn-vue's prop and `v-model` API so people coming from shadcn-vue feel at home.
- [ ] Decide how consumer classes and attributes pass through (Vue's automatic `class`/attribute fallthrough vs. `inheritAttrs: false`). Document it.

### 1d. CONVENTIONS.md

- [ ] Add a **Vue section** to `CONVENTIONS.md` covering 1a–1c, with code examples. Do not change the shared section without checking the impact on Svelte.

**Done when:** the four components are visually identical to the Svelte versions in light and dark, pass the quality bar, and the Vue section of `CONVENTIONS.md` is written.

## Phase 2 — Port the launch set

Port the same ~20-component launch set as the Svelte plan, in the same batch order:

1. Input, Textarea, Label, Checkbox, Radio Group, Switch
2. Card, Badge, Separator, Skeleton, Avatar
3. Dropdown Menu, Popover, Tooltip, Sheet, Alert Dialog
4. Alert, Toast/Sonner equivalent

For each component:
- [ ] Read our Svelte component and the shadcn-vue reference.
- [ ] Build the template from shadcn-vue's structure on Reka UI; wire props, emits and `v-model`.
- [ ] Copy the CSS from our Svelte component; adjust only for scoping (`:deep()`) and any Reka UI attribute/DOM differences.
- [ ] Add Vue examples to the docs page (see Phase 4).
- [ ] Compare visually with the Svelte version side by side, light and dark.

**Done when:** each batch passes the quality bar and matches Svelte visually.

## Phase 3 — Distribution / CLI

- [x] Generate `registry/vue/` JSON from `packages/vue` with the same build script approach as Svelte.
- [x] ~~If using shadcn-vue's CLI registry support (or the shadcn registry format), confirm our Vue registry works with it.~~ We use our own CLI.
- [x] If we built our own CLI for Svelte, add Vue support: detect Vue/Nuxt from `package.json`, copy into `components/ui`, install `reka-ui` if missing, share the same `init` for tokens and themes.
- [x] Test install in a fresh **Vite + Vue** app and a fresh **Nuxt** app, both without Tailwind.

**Done when:** both fresh apps can `init` and `add` components and they render correctly, including SSR in Nuxt with no hydration warnings.

## Phase 4 — Docs

- [x] Add a Svelte / Vue framework switcher to the existing docs site; the choice persists across pages.
- [x] ~~Render Vue examples via `apps/vue-preview` (a small Vite + Vue app) embedded in iframes, keyed by component and example. (Alternative: a separate VitePress site sharing the same content. Decide in this phase; iframes keep one docs site.)~~ The docs mount the Vue demos straight into the page with `createApp`, so no iframes are needed.
- [x] Vue code samples and copy buttons on every component page that has a Vue version; clearly mark components that are Svelte-only so far.
- [x] Installation pages for Vue (Vite) and Nuxt.

## Phase 5 — Launch

- [ ] README: add Vue to the pitch and quick start.
- [ ] Post to r/vuejs, Vue Land Discord, Nuxt community, Bluesky/X.
- [ ] Track Vue-specific feedback with a `vue` label.

## Phase 6 — Remaining components

Port the rest of the Svelte library in the same order the Svelte plan used (or by Vue user requests). From here on, **new components should be built for both frameworks together** so they don't drift.

### Unstyled option

- [ ] Support the same `--unstyled` option as Svelte: same component, empty `<style scoped>` block, plus a comment listing the classes and data attributes available to style. Generate it from the styled version in the registry build.
- [ ] Add Vue examples to the docs "Styling from scratch" page.

---

## Quality bar (every Vue component)

- vue-tsc and lint pass with no warnings.
- Keyboard navigation works and matches Reka UI's behavior; visible focus ring on every interactive element.
- Automated a11y check (axe via Playwright) on the preview page passes.
- Visually identical to the Svelte version in light, dark and `prefers-reduced-motion`.
- Overriding `--<component>-*` custom properties from a parent works.
- No Tailwind, `cn`, `clsx`, `class-variance-authority` or `tailwind-variants` imports anywhere.
- Works in fresh Vite + Vue and Nuxt apps with no Tailwind installed; no SSR hydration warnings in Nuxt.

## Ongoing maintenance

- When a Svelte component's CSS changes, port the change to Vue in the same PR (or open a linked issue). Consider a CI check that flags changes to one framework's component without a matching change in the other.
- Periodically diff `reference/shadcn-vue` and Reka UI release notes; port relevant fixes manually.
- Pin Reka UI to a major version; test before bumping.

## Notes for Claude Code

- Read `CONVENTIONS.md` (shared and Svelte sections) before starting, and treat the Svelte components as the source of truth for styling.
- Do not start Phase 2 until the Vue section of `CONVENTIONS.md` exists and the four spike components match Svelte.
- Before porting a component, read: our Svelte version, the shadcn-vue reference in `reference/`, and the relevant Reka UI docs.
- Never change shared tokens or the shared conventions without asking; they affect the Svelte library too.
