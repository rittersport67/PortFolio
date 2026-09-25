# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:3000
npm run build      # Production build
npm test           # Run tests (watch mode)
npm test -- --watchAll=false  # Run tests once
```

No linting script is defined; ESLint runs implicitly via `react-scripts` using the `react-app` config.

## Architecture

This is a single-page React portfolio site bootstrapped with Create React App. It is a **single-scroll layout** — no routing is used for navigation; all nav links are anchor `href="#section-id"` jumps.

### Data layer

All portfolio content lives in **`src/data/content.js`**. This is the single source of truth for:
- `Bio` — name, roles, description paragraphs, resume URL, social links
- `skills` — array of skill categories, each with a `skills[]` of `{ name, image }`
- `experiences` and `education` — rendered together on the Experience timeline
- `projects` — personal projects
- `photography` — before/after photo pairs, `require`d from `src/img/photography/`

All local images live in `src/img/` and are imported (never referenced from `public/`).

To update portfolio content, edit only this file.

### Theming

`src/utils/Themes.js` exports `darkTheme` and `lightTheme`. Only `darkTheme` is applied (in `App.js` via `ThemeProvider` from `styled-components`). Styled components access theme values via `${({ theme }) => theme.<key>}`.

Territory accent colors live in `src/utils/palette.js` (`CARTHAGE`, `ICE`, `FOREST`, `MOUNTAIN`, `DESERT`). Import them from there instead of hard-coding hex values.

### Component structure

Components are under `src/components/<ComponentName>/index.js`. Each component file contains both the styled-components definitions and the React component — they are not split. The pattern is:
1. Define all styled-components at the top
2. Export a single default React component at the bottom

The `Experience` section uses **MUI Lab Timeline** (`@mui/lab`) to render `ExperienceCards` (experiences and education on one rail).

### Section layout

`App.js` renders, in order:
1. `Navbar` — sticky, collapses to a drawer on small screens
2. `LyokoMapOverlay` — fixed Lyoko map that rotates toward the current section's territory
3. `HeroSection` (`#about`) — name, title, static roles, short bio, contact CTA, photo; faint hex data-rain canvas
4. `Skills`, `Experience`, `Projects`, `Photography` (with `BeforeAfterCard`)
5. `DigitalSea` — static footer

### Visual restraint

The site was deliberately stripped of generic "AI cyber-HUD" styling. Keep it that way:
- Motion budget: Skidbladnir, the Ulrich/XANA easter egg, the rotating Lyoko map, the faint hero data rain, the navbar cursor blink. Do not add looping/pulsing animations.
- Glows (`box-shadow` / `drop-shadow`) only on `:hover`, except the Lyoko "objects" (Skidbladnir, Ulrich).
- No corner brackets, no `◈` / `▸` decorative glyphs.
- `prefers-reduced-motion` disables all CSS animation (`App.css`); the data-rain canvas paints a single frozen frame. Elements marked `data-allow-motion` (the navbar cursor, the Lyoko map rotation) are exempt.

### Code Lyoko territory design system

| Section | Territory | Accent |
|---|---|---|
| HeroSection | Sector 5 / Carthage | `CARTHAGE` `#00d4ff` |
| Skills | Ice (Banquise) | `ICE` `#4ba7d1` |
| Experience | Forest (education items use `ICE`) | `FOREST` `#5abf4e` |
| Projects | Mountain | `MOUNTAIN` `#9b70c8` |
| Photography | Desert | `DESERT` `#e8960a` |

Territory styles are applied via section-level styling (not via `ThemeProvider` — keep the global dark theme intact).

### Skidbladnir — scroll parallax

`src/components/Skidbladnir/index.js` — fixed-position element that flies diagonally across the page (bottom-right → top-left) as the user scrolls, using `useScroll` + `useTransform` from framer-motion.

- **Asset**: `src/img/skidbladnir.png` — transparent background PNG. Do not modify the image.
- Teal `drop-shadow` glow to match the site palette
- Fades in after scroll starts, fades out near the end
- `pointer-events: none` so it never blocks clicks
- Currently **not imported** in `App.js`; to enable, import it and render it outside `<Body>` so it overlays everything including the navbar

### Easter egg — Ulrich (Code Lyoko)

Hovering the navbar logo area triggers a subtle floating Ulrich animation:
- **Trigger**: `onMouseEnter` / `onMouseLeave` on the `LogoArea` wrapper in `Navbar/index.js`
- **Asset**: `src/img/ulrich.png` — transparent-background PNG, do not modify
- **Component**: `src/components/Navbar/UlrichEasterEgg.js`
- Lazy-loaded via `React.lazy` + `Suspense`, mounted on first hover only
- Rendered via `createPortal` into `document.body`
- Appearance: ~180px tall, teal `drop-shadow` glow, CSS scan-line overlay, float loop animation
- Uses `framer-motion` `AnimatePresence` for spring enter/exit — no new dependencies

### Navbar logo area

The navbar shows two images side by side in a `LogoArea` wrapper:
- `src/img/logo.png` — the main portfolio logo (do not modify)
- `src/img/lyoko-symbol.png` — Code Lyoko symbol, shown at 36px height with `filter: invert(1)` (white) that transitions to teal on hover via CSS filter
