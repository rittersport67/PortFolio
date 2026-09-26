Review the architecture of this React portfolio project and report any issues or inconsistencies.

Check the following:

1. **File structure** — All components should live under `src/components/<ComponentName>/index.js`. Flag any component that deviates from this pattern (e.g. wrong location, wrong filename).

2. **Data layer** — All portfolio content (Bio, skills, experiences, education, photography) must live exclusively in `src/data/contants.js` (note the typo — `contants` not `constants`). Flag any hardcoded content found directly in components.

3. **Component pattern** — Each component file should define styled-components at the top and export a single default React component at the bottom. Flag any file that mixes this pattern or splits styled-components into separate files.

4. **App.js section order** — Verify the render order matches the CLAUDE.md spec: Navbar → HeroSection → (Skills, Experience, Education inside ProWrapper) → SectionDivider → (Photography inside PersonalWrapper). Flag any deviation.

5. **Navbar completeness** — Verify that every section with an `id` in a component has a corresponding `href="#id"` link in both the desktop `NavItems` and the mobile `MobileMenu`.

6. **Assets** — Check that all images imported in components actually exist in `src/img/`. Flag broken imports.

Report findings grouped by category. For each issue, give the file path and line number.
