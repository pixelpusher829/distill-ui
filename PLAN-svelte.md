# Plan: distill-ui — vanilla-CSS component library for Svelte

Name: **distill-ui** (npm package `distill-ui`; CLI usage `npx distill-ui add select`). Check npm, the GitHub org and a domain before publishing.

This is the first of two plans. The Vue version (`PLAN-vue.md`) comes after this one and reuses its tokens, conventions and docs, so decisions here should stay framework-agnostic wherever possible.

## Goal

A copy-into-your-project component library in the spirit of shadcn/ui, built for Svelte 5, styled with **scoped `<style>` blocks and CSS custom properties instead of Tailwind**. Users own the component files and customize them by editing CSS, not class strings.

Behavior and accessibility come from **Melt UI** builders (`melt`), with our own small additions where Melt has no builder or lacks a feature (see Phase 1a). Component structure is referenced from **shadcn-svelte** (MIT). Our contribution is the styling layer, the theming system, and the distribution.

## Principles

1. **No Tailwind, no utility classes, no runtime CSS-in-JS.** Plain CSS in each component's `<style>` block.
2. **Tokens are the public API.** All colors, spacing, radii, shadows, fonts and motion values come from CSS custom properties defined in one tokens file.
3. **Variants via data attributes.** `data-variant="outline"`, `data-size="sm"`. No class-merging helpers (`cn`, `tailwind-variants`, `clsx`).
4. **State via data attributes.** Style the attributes Melt sets (`[data-open]`, `[data-active]`, `[data-highlighted]`, `[data-orientation]`) plus `[data-disabled]` where we add it. Don't invent a second vocabulary on top.
5. **Consumers must be able to override easily.** Every component exposes component-level custom properties (e.g. `--dui-button-bg`) that fall back to global tokens. Selectors stay low-specificity.
6. **Accessibility is not negotiable.** Never remove behavior Melt provides, and where we add behavior Melt lacks (disabled items, ARIA links), test it. Visible focus styles on every interactive element.
7. **Modern CSS is fine.** Native nesting, `:where()`, `@layer`, `color-mix()`, `oklch()`, container queries. Target evergreen browsers.
8. **Open the file, see the CSS, edit it.** This library exists because styling headless Svelte libraries with scoped CSS is painful: Bits UI renders parts inside its own components, so Svelte strips your scoped selectors as unused, and the usual escapes are Tailwind or wrapping every part in a `child` snippet. Users of this library must never hit that. Every styled element should be reachable by a plain scoped selector in the component's own file, with no `:global()` and no extra work from the consumer.
9. **Keep CSS portable.** The Vue version will reuse this library's CSS. Avoid Svelte-only styling tricks inside the CSS itself where a plain-CSS approach works equally well, and keep framework-specific scoping details out of the shared tokens and keyframes.

## Licensing and attribution

- License: MIT.
- Keep shadcn-svelte's copyright notice in `LICENSE` alongside ours, and credit shadcn/ui, shadcn-svelte and Melt UI in the README.
- This is a new repo, not a GitHub fork. shadcn-svelte is a reference we diff against, not an upstream we merge.

## Repo structure (monorepo, bun workspaces)

```
/
├── LICENSE
├── README.md                 # includes the "Why no Tailwind" section
├── PLAN-svelte.md
├── PLAN-vue.md
├── CONVENTIONS.md            # written in Phase 1; Vue adds its own section later
├── packages/
│   ├── tokens/               # framework-agnostic: tokens.css, themes, keyframes
│   │   ├── tokens.css
│   │   ├── themes/light.css
│   │   ├── themes/dark.css
│   │   └── motion.css        # shared keyframes and easing
│   └── svelte/
│       └── src/lib/components/ui/
│           ├── button/
│           │   ├── button.svelte
│           │   └── index.ts
│           └── ...
├── apps/
│   └── docs/                 # SvelteKit docs + playground site
└── registry/
    └── svelte/               # generated registry JSON for the CLI
```

Keep `registry/` split by framework from the start so Vue can slot in at `registry/vue/` later.

---

## Phase 0 — Setup

- [x] Init bun monorepo, TypeScript, Prettier, ESLint, svelte-check.
- [x] Create `packages/tokens` (plain CSS, no build step needed).
- [x] Create `packages/svelte` (Svelte 5, SvelteKit library mode) with `melt` as a dependency.
- [x] Create `apps/docs` (SvelteKit) that imports from `packages/svelte` for live previews.
- [x] Clone shadcn-svelte into a gitignored `reference/shadcn-svelte/` folder for comparison.
- [x] Add LICENSE with both copyright notices.

**Done when:** `bun run dev` runs the docs app and renders a placeholder page.

## Phase 1 — Conventions spike (most important phase)

Decide the patterns everything else follows. Build these four components to prove them out: **Button, Dialog, Select, Tabs.** (Dialog and Select cover portals and nested parts, the hardest scoping cases.)

### 1a. Foundation and scoping strategy

Svelte scoped styles only apply to elements written in the component's own markup. When a Bits UI component renders the DOM node, a class passed to it is treated as unused and stripped. This is the core problem the library solves (see principle 8), so this decision matters more than any other.

Build Dialog and Select three ways, then pick one and document it:

- **Option A — Bits UI + `child` snippet:** render each element ourselves and spread Bits UI's props onto it, so it's in our markup and scoped styles apply.
- **Option B — Bits UI + wrapper + `:global()`:** a scoped wrapper class with `:global()` selectors for the parts inside it. Only acceptable if A and C are clearly worse, since it conflicts with principle 8.
- **Option C — Melt UI builders:** Melt gives builders whose attributes we spread onto our own elements, so every element is in our markup by design and scoped CSS just works.

Criteria:
- Styles reliably apply (including portalled content), with no svelte-check "unused selector" warnings.
- Component files are readable for a user opening them for the first time.
- Consumer overrides still work.
- **Coverage:** check that the chosen foundation supports every component in the launch set and Phase 6 list (especially Calendar, Command, Combobox, Date Picker). Melt's Svelte 5 version has been changing quickly; check its current component list and stability.
- **Reference availability:** shadcn-svelte is built on Bits UI, so Option C means more structure to work out ourselves.

If the foundation is Melt, update dependencies, the "Behavior and accessibility come from" line, and the Quality bar accordingly.

**Decision (Oct 2026): Option C, Melt UI.** A and B were both built and work, but A puts `child` snippets in every component file and B makes every styled part global. Since users copy these files into their own projects, both put exactly the friction principle 8 rules out in front of them. Known Melt gaps, handled ourselves in the same spread-attributes style: no disabled options in Select or disabled tabs in Tabs; Dialog doesn't link its title and description; no builders yet for Checkbox, Switch, Dropdown Menu, Context Menu, Menubar, Navigation Menu, Calendar, Date Picker, Command, Scroll Area or Hover Card. Write those as small builders in our own code, matching Melt's API shape, and follow Melt's releases in case it adds them.

### 1b. Tokens

- [ ] Write `packages/tokens/tokens.css`: color scale (background, foreground, muted, accent, primary, destructive, border, ring, etc. — mirror shadcn's semantic names so it feels familiar), spacing scale, radius scale, shadows, font stacks, font sizes, motion durations/easings, z-index layers.
- [ ] Light and dark themes. Dark mode via `.dark` class on `<html>` **and** `prefers-color-scheme`, overridable with `data-theme`.

### 1c. Component-level custom properties

Pattern:

```css
.button {
  --bg: var(--dui-button-bg, var(--dui-color-primary));
  --fg: var(--dui-button-fg, var(--dui-color-primary-foreground));
  background: var(--bg);
  color: var(--fg);
}
```

Consumers override with `--dui-button-bg` on the element or any ancestor. Internal vars (`--bg`) have no prefix and aren't meant to be set. Decision (Oct 2026): every public variable, tokens included, is prefixed `--dui-` to avoid clashes with app or Tailwind variables.

### 1d. Variants and sizes

- Use `data-variant` and `data-size` props mapped to attributes.
- Define the shared variant vocabulary now: `default | secondary | outline | ghost | destructive | link`; sizes `sm | md | lg | icon`. Vue will use the same names.

### 1e. Cascade layers and specificity

- Decide whether component styles go in `@layer components` (so unlayered consumer CSS always wins) or stay unlayered with `:where()` to keep specificity at zero. Document the choice.

### 1f. Animations

- Replace `tw-animate-css` with shared keyframes in `packages/tokens/motion.css` (fade, zoom, slide from each side). Respect `prefers-reduced-motion`.

### 1g. CONVENTIONS.md

- [ ] Write `CONVENTIONS.md` with a **shared section** (tokens, custom-property pattern, variant vocabulary, layers/specificity, animations, data-attribute state selectors) and a **Svelte section** (scoping strategy, file layout, props pattern). The Vue plan adds a Vue section later, so keep the shared parts framework-neutral.

**Done when:** the four components look on par with shadcn-svelte in light and dark, pass the checks in "Quality bar" below, and `CONVENTIONS.md` documents every decision above with a code example.

## Phase 2 — Launch set (~20 components)

Launch with a solid core set, then add the rest after launch (Phase 6). Port from shadcn-svelte following `CONVENTIONS.md`. Together with the four spike components (Button, Dialog, Select, Tabs), the launch set is:

1. Input, Textarea, Label, Checkbox, Radio Group, Switch
2. Card, Badge, Separator, Skeleton, Avatar
3. Dropdown Menu, Popover, Tooltip, Sheet, Alert Dialog
4. Alert, Toast/Sonner equivalent

Everything else waits until after launch (see Phase 6).

**Status (Oct 2026):** all four batches are built, with docs demos and browser tests. Dropdown Menu has Item, CheckboxItem, Label, Separator, Group and Shortcut; radio items and submenus wait for Phase 6.

For each component (here and in Phase 6):
- [ ] Port markup and props; keep Melt's behavior intact, and add what Melt lacks.
- [ ] Convert every Tailwind class to scoped CSS using tokens. `data-[state=open]:x` → `[data-state="open"] { x }`.
- [ ] Expose component-level custom properties for the main visual knobs.
- [ ] Add a docs page with live examples of every variant, plus a "Customizing" snippet.
- [ ] Compare visually against the shadcn-svelte reference in light and dark.

**Done when:** each batch passes the quality bar before starting the next.

## Phase 3 — Distribution / CLI

- [x] First check whether shadcn-svelte's CLI custom-registry support (or the shadcn registry format) can serve our components. Prefer it over writing our own CLI.
- [x] If not suitable, build a small CLI (`npx distill-ui add button`) that: copies component files into the user's `$lib/components/ui`, installs `melt` and `@floating-ui/dom` if missing, and copies `tokens.css` + themes on `init`. Design it so a `--framework vue` option can be added later (detect the framework from `package.json` by default).
- [x] Build script that generates `registry/svelte/` JSON from `packages/svelte`.
- [ ] Always support a no-CLI path: every docs page has a "copy the file" button. (Built with the docs pages in Phase 4.)

**Done when:** a fresh SvelteKit app (no Tailwind installed) can `init` and `add` components and they render correctly.

**Status (Oct 2026):** shadcn-svelte's CLI (1.7.0) refuses to `init` without Tailwind v4, and `add` needs the `components.json` that `init` writes, so we built our own in `packages/cli` (npm name `distill-ui`, Node built-ins only). `bun run registry` builds `registry/svelte/`, and `bun run test` fails if it's out of date. Tested in a fresh SvelteKit 3 app with no Tailwind: `init`, `add --all`, svelte-check and a build all pass, and the components render. The framework comes from the project's `package.json` and is saved in `distill-ui.json`, and the registry is split by framework, so Vue slots in at `registry/vue/`. Not published to npm yet. The default registry URL points at the GitHub repo, which only works once it's public.

## Phase 4 — Docs site

- [x] Landing page with the "Why no Tailwind" pitch and a side-by-side code comparison. Lead with the real pain: headless Svelte libraries are hard to style with scoped CSS, so we did that part for you. Show a before/after: the snippet or `:global()` workaround vs. our component's plain `<style>` block.
- [x] Installation (CLI and manual), Theming (tokens, dark mode, creating a theme), Customizing (custom properties, editing files), Conventions.
- [x] A "Styling from scratch" page: how to delete or replace a component's `<style>` block and style it yourself against its classes and data attributes. Treat this as a first-class workflow, not a footnote.
- [x] Structure component pages so a framework switcher (Svelte / Vue) can be added later without restructuring: keep per-framework code samples in separate files.
- [ ] A theme builder page that edits tokens live and exports `tokens.css` (nice-to-have).
- [ ] Deploy (Vercel/Netlify/Cloudflare Pages).

**Status (Oct 2026):** the site is built and every page is prerendered to static HTML. Pages: landing, Introduction, Installation, Theming, Customizing, Styling from scratch, and one page per component with a preview, its code, CLI and manual install (every file with a copy button, read from `registry/`), and its options table (read from the component's CSS). Conventions are linked from the Introduction rather than copied. Demos live in `apps/docs/src/lib/demos/svelte/`, one file per example, so Vue demos can go in `demos/vue/` later. Code is highlighted with Shiki at build time. Every page passes axe in light and dark. The theme builder and deploying are still to do; deploying needs an account.

## Phase 5 — Launch

- [ ] README: pitch, screenshot, quick start, credits. Mention Vue is planned.
- [ ] Post to r/sveltejs, Svelte Discord, Bluesky/X, Hacker News (Show HN).
- [ ] Track feedback in GitHub issues; label which requests are about the override story.
- [ ] Before continuing to Phase 6, review feedback and adjust `CONVENTIONS.md` if the override or scoping approach needs to change. Changing conventions is cheap now and expensive later — and it must settle before the Vue port starts.

## Phase 6 — Remaining Svelte components (post-launch)

Same per-component checklist and quality bar as Phase 2. Prioritize by what users request in issues; a suggested default order:

1. Accordion, Collapsible, Toggle, Toggle Group, Slider, Progress
2. Scroll Area, Breadcrumb, Pagination, Hover Card, Table
3. Command, Combobox, Context Menu, Menubar, Navigation Menu
4. Calendar, Date Picker, Form helpers, Resizable, Carousel, and anything else in shadcn-svelte

### Unstyled option

- [ ] Add an `--unstyled` flag to `add` (or a separate unstyled registry item per component): copies the same component with an empty `<style>` block plus a comment listing every class name and data attribute available to style.
- [ ] Generate unstyled versions automatically from the styled ones in the registry build script, so there is no second copy to maintain.
- [ ] Do **not** add hardcoded fallbacks to make components work without `tokens.css` (e.g. `var(--dui-color-primary, #111)`); unstyled is the supported way to opt out of the tokens.
- [ ] Structural-only versions (layout and positioning kept, visual styles removed) only if users ask for them.

Once the shared conventions have been stable for a while, start `PLAN-vue.md` (it can run in parallel with the tail end of this phase).

---

## Quality bar (every component)

- svelte-check and lint pass with no warnings.
- Keyboard navigation works and follows the WAI-ARIA Authoring Practices pattern for that component; visible focus ring on every interactive element.
- Automated a11y check (axe via Playwright) on the docs example page passes.
- Looks correct in light and dark, and with `prefers-reduced-motion`.
- Overriding `--<component>-*` custom properties from a parent works, demonstrated in docs.
- No Tailwind, `cn`, `clsx` or `tailwind-variants` imports anywhere.
- Works in a fresh SvelteKit app with no Tailwind installed.

## Ongoing maintenance

- Periodically diff `reference/shadcn-svelte` and Melt release notes; port relevant fixes manually.
- Pin Melt to an exact version while it is pre-1.0; test before bumping.

## Notes for Claude Code

- Work one phase at a time; do not start Phase 2 until `CONVENTIONS.md` exists and the four spike components meet the quality bar.
- Before porting a component, read its shadcn-svelte source in `reference/` and the relevant Melt docs (or the WAI-ARIA pattern when Melt has no builder).
- When a Tailwind class has no obvious token equivalent, add a token rather than hardcoding a value, and note it in `CONVENTIONS.md`.
- Ask before changing a convention that is already documented.
