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

All portfolio content lives in **`src/data/contants.js`** (note the typo — `contants`, not `constants`). This is the single source of truth for:
- `Bio` — name, roles, description paragraphs, resume URL, social links
- `skills` — array of skill categories, each with a `skills[]` of `{ name, image }`
- `experiences` — array of `{ role, company, date, desc, skills[], img, doc? }`
- `education` — array of education entries
- `photography` — array of `{ id, title, image, category }` — `image` is an external URL, not bundled

To update portfolio content, edit only this file.

### Theming

`src/utils/Themes.js` exports `darkTheme` and `lightTheme`. Only `darkTheme` is currently applied (in `App.js` via `ThemeProvider` from `styled-components`). All styled components access theme values via `${({ theme }) => theme.<key>}`.

### Component structure

Components are under `src/components/<ComponentName>/index.js`. Each component file contains both the styled-components definitions and the React component — they are not split. The pattern is:
1. Define all styled-components at the top
2. Export a single default React component at the bottom

The `Experience` section uses **MUI Lab Timeline** (`@mui/lab`) to render `ExperienceCards`. Skills and Education sections use their own layout.

`ImageSlider` exists in `src/components/ImageSlider/` but is not currently imported in `App.js`.

### Section layout — PRO / PERSO split

`App.js` renders sections in two visually distinct blocks:

**PRO block** (`ProWrapper` — gradient + diagonal `clip-path`):
1. `Navbar` — sticky, collapses to hamburger at ≤768px
2. `HeroSection` — photo + typewriter role animation (`typewriter-effect`)
3. `Skills`
4. `Experience` — MUI Timeline with `ExperienceCards`
5. `Education`

A `SectionDivider` with the label "Personal" separates the two blocks.

**PERSO block** (`PersonalWrapper`):
6. `Photography` — responsive 3-column image grid fed by `photography[]` from `contants.js`

### Code Lyoko territory design system (planned)

Each section will be styled to evoke a specific Code Lyoko territory. Agreed mapping:

| Section | Territory | Key colors |
|---|---|---|
| HeroSection | Sector 5 / Carthage | Deep blue `#001AFF`, cyan, hexagonal patterns |
| Skills | Forest | Green `#3B8C2A`, dark green bg |
| Experience | Mountain | Purple `#7B4EA8`, grey-purple bg |
| Education | Ice (Banquise) | Cyan `#4BA7D1`, cold blue-white |
| Photography | Desert | Amber/orange `#D4870A`, warm dark bg |

Territory styles are applied via section-level wrappers (not via `ThemeProvider` — keep the global dark theme intact). Use CSS background gradients, border accents, and subtle texture overlays (repeating geometric patterns) to evoke each territory without breaking the existing component internals.

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
