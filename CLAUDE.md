# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. It is written as a product requirements document: sections 1–5 say **what the site must do and feel like**; section 6 holds the few implementation rules needed to honour them.

## 1. Product overview

**What**: the personal portfolio of Sébastien Ritter, a .NET & AI software engineer, on a single scrolling page.

**For whom**: recruiters, hiring managers and fellow engineers who want in under a minute to see who he is, what he masters, where he has worked and what he builds, and how to reach him.

**Identity**: the whole site is a tribute to the *Code Lyoko* cartoon. Each section is a Lyoko territory with its own accent color, and cards look like the supercomputer's windows. The tribute must stay **tasteful and readable**: a recruiter who has never seen the show must still find a clean, professional portfolio.

### Goals

- G1: present identity, skills, career path, projects and photography on one page.
- G2: make contact possible in one click (email and LinkedIn from the hero).
- G3: reward curious visitors with hidden Code Lyoko easter eggs, without ever getting in the way of G1–G2.
- G4: let the owner update all content by editing the data file and the locale files, never a component.
- G5: offer the portfolio in English and French, switchable from the navbar.

### Non-goals

- No multi-page routing, blog, CMS or back-end.
- No light theme (a `lightTheme` exists but is not exposed).
- No generic "AI cyber-HUD" look (see NFR-2).

## 2. Content requirements

| ID   | Requirement |
| ---- | ----------- |
| CM-1 | All displayed content comes from **`src/data/content.js`** (structure: dates, links, logos, tech names, and a `key` per entry) and **`src/locales/<lang>/content.json`** (translatable texts under that `key`: bio, roles, descriptions, degrees, category labels). Updating the portfolio must never require touching a component. |
| CM-2 | Timeline entries and projects are dated by `start` / `end` months (`YYYY-MM`). `end: null` means "ongoing". The displayed period and duration are **computed** (`src/utils/period.js`), never typed by hand. |
| CM-3 | Experiences and education share one chronology, sorted by `start`. |
| CM-4 | Contracted work names the consulting firm in `via`, shown alongside the client. |
| CM-5 | Local images live in `src/img/` and are imported/`require`d, never served from `public/`. Photo pairs live in `src/img/photography/`. |
| CM-6 | Interface labels live in `src/locales/<lang>/ui.json`. Every key must exist in both `en` and `fr` (checked by `App.test.js`). |

## 3. Functional requirements by section

The page is one scroll. The navbar links jump to anchors (`#about`, `#skills`, …); there is no routing. Sections appear in this order:

### 3.1 Navigation (`Navbar`)

- FR-NAV-1: sticky at the top and drawn as a Lyoko window title bar (steel-blue `WINDOW_BAR`). The section links are tabs inside a dark pill, named after Lyoko places: Carthage (`#about`), Abilities (`#skills`), Missions (`#experience`), Programs (`#projects`), Superscan (`#photography`). GitHub and LinkedIn are dark pills on the right.
- FR-NAV-2: the tab of the section in view is lit, following the scroll (`src/utils/useCurrentSection.js`).
- FR-NAV-3: below 1100px the tabs and links collapse into a pill menu button that opens a "Supercomputer" Lyoko window. Picking a link, the close button or the overlay closes it.
- FR-NAV-5: an EN | FR switch (`src/components/LanguageSwitch`, a dark pill with a mini inline-SVG flag per option) sits before GitHub / LinkedIn, and at the bottom of the drawer below 1100px. The choice is remembered in localStorage (`portfolio-lang`); the first visit follows the browser language, English by default.
- FR-NAV-4: the left pill shows only the handle (`Bio.surname`) in monospace, followed by a blinking cursor. No image (the Lyoko symbol that sat beside it was removed).

### 3.2 Hero — Sector 5 / Carthage (`#about`)

- FR-HERO-0: opens with the shared sector header, like every territory section (see NFR-1): "Sector 5 — Carthage", title "Profile".
- FR-HERO-1: an "Identity" Lyoko window (pills: location, years of experience) shows the name (Michroma), title and roles as a "key : value" line, a short bio, and a "Get in touch" `mailto:` CTA (the page's only filled Carthage button) with a LinkedIn pill.
- FR-HERO-2: a "Card scan" Lyoko window beside it holds the static Lyoko character card (`src/img/hero-lyokocard.png`). Clicking it ("Virtualize me") triggers the virtualization intro (§4.1). Below 960px the card window stacks above the profile.
- FR-HERO-3: a faint hex data-rain plays on the dark navy background (no grid lines).

### 3.3 Skills — Ice (`#skills`)

- FR-SKL-1: one Lyoko window per skill category. Each shows the category name, the skill count and a gauge comparing its size with the largest category.
- FR-SKL-2: each skill shows its logo and name.

### 3.4 Experience — Forest (`#experience`)

- FR-EXP-1: a single vertical timeline mixes missions and education in chronological order.
- FR-EXP-2: each card is titled "Mission" (Forest accent) or "Education" (Ice accent) and shows the period, the duration, and a gauge comparing its duration with the longest entry.
- FR-EXP-3: the description and abilities are shown together in full (no tabs, no truncation).

### 3.5 Projects — Mountain (`#projects`)

- FR-PRJ-1: a grid of "Program" windows showing period, duration, a gauge (duration vs. the longest project), category, description, and GitHub / live-app links when available.
- FR-PRJ-2: filter buttons: "all", then one per distinct project category, derived from the data.
- FR-PRJ-3: descriptions are clamped to 3 lines so the grid stays even.

### 3.6 Photography — Desert (`#photography`)

- FR-PHO-1: each photo is a before/after pair with a draggable divider (mouse and touch) that reveals the edit.

### 3.7 Footer — Digital Sea

- FR-FTR-1: static footer with a "Return to the past" link back to the top and the fan-tribute disclaimer ("not affiliated with or endorsed by its rights holders").

## 4. Easter eggs

Easter eggs are optional delights: they must never trigger on a plain visit or block normal use.

| Easter egg              | Status        |
| ----------------------- | ------------- |
| Virtualization intro    | **Active**    |

### 4.1 Virtualization intro (active)

**User story**: as a curious visitor clicking the hero Lyoko card, I watch Jérémie's supercomputer virtualize me into Lyoko, then I choose when to enter the site.

- EE-INT-0 **Language**: the intro is not translated and stays in English whatever the selected language. It reads only `Bio.name`, `experiences.length` and `projects.length` from content.js.
- EE-INT-1 **Trigger**: only when the URL hash is `#intro`, on load or on `hashchange`. The hero card links to it. It never plays on a plain visit.
- EE-INT-2 **Sequence** (~15 s): "Transfer <first name>" → "Scanner <first name>" → "Virtualization!", paced by an invisible typing of those lines (the log itself is not shown). Then a hold on the finished hologram, then "Click to enter Lyoko". It fades out only on a click. No keyboard skip, so a stray key press cannot cut it short.
- EE-INT-3 **Replay**: each trigger restarts from the beginning. The hash is cleared on dismissal so the intro can be triggered again.
- EE-INT-4 **Page behavior**: full-screen overlay; body scroll is locked while it is visible.
- EE-INT-5 **Reduced motion**: skipped entirely under `prefers-reduced-motion`.
- EE-INT-6 **Visual content** (all CSS/SVG, no bitmap background except the listed assets):
  - Backdrop: a supercomputer screen with a teal-to-black gradient, light pillars, a top HUD (user ID, phase buttons lit as the sequence advances) and a bottom control bar whose track shows progress.
  - Console (`ScanWindow.js`): module row, tabs, side gauges, a rotating Lyoko world map (`code-lyoko-inspired-world.png`, 40 s/turn) and a scanner. In the scanner, a faceless, unclothed T-pose mannequin (slim 1.85 m / 77 kg build, head after `hero-pp.jpg`: quiff, short sides, square bearded jaw) is outlined (Transfer), revealed as a glossy green Aelita-style hologram behind a scan band (Scanner), then ringed and lit (Virtualization). A "CARD SCAN" panel reveals the hero card during Scanner and Virtualization.
  - Superscan pop-up (`SuperscanWindow.js`), beside the console for the whole intro: data grid, XANA status, a fixed "2:02:00" timer, an activated tower as a red hologram with XANA roots, the eye of XANA (inline SVG), and a gauge filling to 100 % during Transfer.
- EE-INT-7 **Responsive**: ≤960px hides the Superscan (console goes full width); ≤768px keeps only the scanner and the card.
- Dev tip: open `http://localhost:3000/#intro`.

## 5. Non-functional requirements

### NFR-1 — Territory identity

Each section has exactly one territory accent, taken from `src/utils/palette.js`:

| Section     | Territory                   | Accent               |
| ----------- | --------------------------- | -------------------- |
| Hero        | Sector 5 / Carthage         | `CARTHAGE` `#00d4ff` |
| Skills      | Ice (Banquise)              | `ICE` `#4ba7d1`      |
| Experience  | Forest (education uses Ice) | `FOREST` `#5abf4e`   |
| Projects    | Mountain                    | `MOUNTAIN` `#9b70c8` |
| Photography | Desert                      | `DESERT` `#e8960a`   |

The global theme stays dark. Territory styling is applied at section level, not by swapping the theme.

Every territory section, the hero included, opens with the same header, `src/components/SectionHeader`: a "Sector N — Territory" tag between two rules, a 42px Poppins title underlined with the accent, and a one-line description. Never restyle a section title locally; outer spacing is set with `styled(SectionHeader)`.

| Section     | Tag                  | Title                 |
| ----------- | -------------------- | --------------------- |
| Hero        | Sector 5 — Carthage  | Profile               |
| Skills      | Sector 1 — Ice       | Abilities             |
| Experience  | Sector 2 — Forest    | Missions & Education  |
| Projects    | Sector 3 — Mountain  | Programs              |
| Photography | Sector 4 — Desert    | Photography Superscan |

The navbar, the hero and the Skills, Experience and Projects cards all use the same **Lyoko window** look. Cards use the frame (`Cards/LyokoWindow.js`): a steel-blue title bar with optional left and right pills around a centered title (Michroma), a slate content panel, a scrollbar-style gauge (0–1) and a status bar. The hover glow and gauge take the section's accent.

| Section    | Title                   | Left pill | Right pill  | Gauge                            |
| ---------- | ----------------------- | --------- | ----------- | -------------------------------- |
| Hero       | "Identity"              | location  | years exp.  | full                             |
| Hero       | "Card scan"             | —         | —           | full                             |
| Skills     | category name           | —         | skill count | category size vs. the largest    |
| Experience | "Mission" / "Education" | period    | duration    | duration vs. the longest entry   |
| Projects   | "Program"               | period    | duration    | duration vs. the longest project |
| Nav drawer | "Supercomputer"         | —         | close button | full                            |

### NFR-2 — Visual restraint

The site was deliberately stripped of generic "AI cyber-HUD" styling. Keep it that way.

- Motion budget: the faint hero data-rain, the navbar cursor blink, the virtualization intro, plus the disabled hero card flip if it is ever re-enabled. **No other looping or pulsing animation.**
- Glows (`box-shadow` / `drop-shadow`) only on hover.
- No corner brackets, no `◈` / `▸` decorative glyphs.

### NFR-3 — Accessibility and motion

- `prefers-reduced-motion` disables all CSS animation (`App.css`), freezes the data-rain on one frame and skips the intro. Only elements marked `data-allow-motion` are exempt: the navbar cursor and the hero card flip.
- Every interactive element (nav links, filters, before/after divider, CTA) works with mouse and touch.

### NFR-4 — Responsive

- The layout works from phone width up. The navbar becomes a drawer and the intro degrades as described in EE-INT-7.

### NFR-5 — Tribute and legal

- The site states in the footer that it is a fan-made tribute, not affiliated with the rights holders.
- `hero-lyokocard.png` is a transparent-background PNG used as provided: **do not modify this image**.
- Do not add images copied from the show (characters, logos, symbols). Recreate emblems as inline SVG instead.

## 6. Implementation guardrails

### Commands

```bash
npm start                      # Dev server at http://localhost:3000
npm run build                  # Production build
npm test                       # Run tests (watch mode)
npm test -- --watchAll=false   # Run tests once
```

No lint script is defined. ESLint runs implicitly through `react-scripts` (`react-app` config).

### Stack and structure

- Create React App, styled-components, framer-motion, MUI Lab Timeline (Experience), i18next + react-i18next (pinned to i18next 23 / react-i18next 14: newer versions require TypeScript ≥ 5, which conflicts with CRA).
- i18n is set up in `src/i18n.js` (imported by `index.js` and `setupTests.js`): namespaces `ui` (default) and `content`. Components use `const { t } = useTranslation()`; content texts are read as `t('content:experiences.<key>.desc')`, arrays with `{ returnObjects: true }`, markup with `<Trans components={{ em: <em /> }} />`. Language-dependent values (texts, `period.js` output) are computed at render time, never at module load.
- `App.js` mounts, in order: `VirtualizationIntro`, `Navbar`, `HeroSection`, `Skills`, `Experience`, `Projects`, `Photography` (with `BeforeAfterCard`), `DigitalSea`.
- One component per folder, `src/components/<Name>/index.js`: styled-components at the top, a single default-exported React component at the bottom (not split into separate files).
- `LyokoWindow` exposes its accent to children as `--accent-rgb`. Callers set its width via `styled(LyokoWindow)`, and its frame colors are the `WINDOW_*` constants of `colors.js`. `rightSlot` replaces the right pill with any node (the drawer's close button). It also exports `WindowPill`, the dark title-bar pill, reused for the navbar and hero controls (`styled(WindowPill).attrs({ as: 'a' })`).
- `src/utils/useCurrentSection.js` returns the id of the section in view; used by the navbar tabs.

### Styling constants — no hard-coded colors or font stacks in components

| Scope                           | Colors                                             | Fonts                     |
| ------------------------------- | -------------------------------------------------- | ------------------------- |
| Site (everything but the intro) | `src/utils/colors.js` (+ `palette.js` for accents) | `src/utils/fonts.js`      |
| `VirtualizationIntro/*`         | `src/utils/introColors.js`                         | `src/utils/introFonts.js` |

- For translucency, use `alpha(HEX, opacity)` (from `colors.js`, re-exported by `introColors.js`), not `rgba()`. `rgbChannels(HEX)` returns `'r, g, b'` for CSS custom properties.
- `introColors.js` also re-exports `WHITE`, `BLACK` and `CARTHAGE`, so intro files import only from it.
- `themes.js` builds `darkTheme` from `colors.js`. It is applied in `App.js` through `ThemeProvider`, and components read it via `${({ theme }) => theme.<key>}`.
- `App.css` (global Poppins font, Google Fonts imports) is plain CSS and cannot import these constants.
- Intro hologram effects use inline SVG filters and masks with ids prefixed `vi-`. Volume comes from `feDiffuseLighting` + `feSpecularLighting` on the blurred silhouette.
