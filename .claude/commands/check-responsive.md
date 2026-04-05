Audit every component in `src/components/` for responsive design issues.

This project uses three standard breakpoints — check that all components respect them consistently:
- `960px` — tablet landscape / small desktop
- `768px` — tablet portrait
- `640px` — large mobile

Check the following for each component:

1. **Missing breakpoints** — If a component has a fixed `width` or `font-size` in px, verify it has at least one `@media` rule to adapt it. Flag any component with no media queries at all if it contains layout or typography styles.

2. **Breakpoint consistency** — Flag any component that uses a non-standard breakpoint (e.g. `max-width: 900px` or `max-width: 500px`) without a clear reason. New breakpoints should be justified.

3. **Navbar mobile menu** — Verify that at ≤768px: `NavItems` is hidden (`display: none`), `MobileIcon` (hamburger) is visible, and `MobileMenu` contains all the same links as the desktop `NavItems` (including `Photography`).

4. **Skidbladnir** — Verify it has a smaller `width` at ≤768px so it doesn't cover too much of the screen on mobile. Check that `right` positioning leaves enough room for content.

5. **Photography grid** — Verify the grid transitions: 3 columns → 2 columns at ≤960px → 1 column at ≤600px.

6. **Text overflow** — Flag any `Title` or `Desc` styled component that doesn't set `text-align: center` at mobile breakpoints, which can cause text to overflow its container on small screens.

7. **Fixed elements on mobile** — `UlrichEasterEgg` and `Skidbladnir` are `position: fixed`. Verify they don't overlap the main content in a way that makes it unreadable on screens narrower than 768px.

Report each issue with file path, component name, and the specific CSS property causing the problem.
