---
name: code-cleanup
description: Clean up source code without changing behavior — remove dead code, unused imports/variables/styled-components, console noise, commented-out blocks, orphan files and unused dependencies; replace hard-coded territory hex colors with palette.js constants. Use when the user asks to "clean up", "nettoyer le code", "code cleanup", "remove dead code", "supprimer le code mort", or to tidy a file or folder.
argument-hint: "[file or folder path — defaults to the files changed in git]"
---

# Code cleanup

Target: `$ARGUMENTS`
If no argument is given, use the modified/untracked source files under `src/` from `git status --porcelain`. If that is empty, use all of `src/`.
A folder means every `.js`/`.jsx`/`.css` file inside it, recursively (skip `node_modules`, `build`, images, lockfiles).

Unlike `/code-quality` (which only reports), this skill **applies** the fixes. The golden rule: **no behavior or visual change.** When in doubt, leave it and list it in the report.

## 1. Baseline

Before touching anything, run `CI=true npm run build` and note any existing warnings/errors. This is the reference to compare against at the end.

## 2. What to clean (apply)

1. **Unused imports** — remove imports never referenced in the file (including unused React hooks, MUI components, icons, images).
2. **Unused declarations** — local variables, functions, constants, and **styled-components defined but never rendered**. Grep the whole `src/` before deleting anything that is exported.
3. **Console noise** — remove `console.log`, `console.debug`, `debugger`. Keep `console.error`/`console.warn` inside genuine error handling.
4. **Commented-out code** — delete blocks of commented-out JSX/JS. Keep explanatory comments, JSDoc, and `eslint-disable` directives that are still needed.
5. **Hard-coded territory colors** — replace `#00d4ff`, `#4ba7d1`, `#5abf4e`, `#9b70c8`, `#e8960a` (any case) with `CARTHAGE`, `ICE`, `FOREST`, `MOUNTAIN`, `DESERT` imported from `src/utils/palette.js`. Hex inside `rgba()`/alpha suffixes (`#00d4ff33`) → use a template literal (`` `${CARTHAGE}33` ``). Do not touch other hex values.
6. **Redundant code** — duplicate CSS properties in the same block (keep the last, which is the effective one), empty styled-component blocks, useless fragments (`<>{single}</>`), `return undefined`, unused function params at the end of a signature, `x === true` → `x`.
7. **Stale references** — imports or comments still pointing at renamed/removed paths (e.g. `data/contants`, `public/img/...`, `ImageSlider`).

## 3. What to report only (never apply automatically)

- **Orphan files** — components/images under `src/` that nothing imports (check with `grep -r` on the basename). Exception: `Skidbladnir` is intentionally imported but not rendered — leave it alone.
- **Unused dependencies** — packages in `package.json` `dependencies` never imported in `src/` (ignore `react-scripts`, `web-vitals`, testing libs, and peer deps like `@emotion/*` needed by MUI).
- **Unused theme keys** in `src/utils/Themes.js` and unused entries in `src/data/content.js`.
- Anything that would change rendering, props contracts, or the data shape.

## 4. Protected — do not modify

- Images in `src/img/` (`logo.png`, `lyoko-symbol.png`, `ulrich.png`, `skidbladnir.png`, photography assets).
- `lightTheme` in `Themes.js` (unused but kept on purpose).
- Formatting/style of lines you don't otherwise change — no mass reformatting, no renaming, no reordering of styled-components.

## 5. Verify

- Run `CI=true npm run build` again. It must succeed with no **new** warnings compared to the baseline (CI mode turns warnings into errors, so any leftover unused var shows up).
- Run `npm test -- --watchAll=false`.
- If either fails because of a cleanup change, revert that specific change rather than working around it.

## 6. Report

Finish with:
- **Applied** — per file, a short bullet list of what was removed/replaced (counts are fine: "3 unused imports, 2 unused styled-components").
- **To review** — orphan files, unused deps, unused theme/content keys, and anything skipped because it was ambiguous, each with path and a one-line reason.
- Build/test result before vs after.
