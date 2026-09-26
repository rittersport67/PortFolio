Review the source code in `src/` for quality issues specific to this React + styled-components project.

Check the following:

1. **Unused variables and imports** — Flag any import or declared variable that is never used in the file. Pay special attention to styled-components that are defined but never rendered.

2. **Prop consistency** — For components that receive data from `src/data/contants.js`, verify that all expected fields (e.g. `experience.img`, `experience.role`, `experience.company`, `experience.date`, `experience.desc`) are actually used in the render, and that accessing optional fields (e.g. `experience.doc`, `experience.skills`) is guarded with optional chaining or a conditional.

3. **Theme access** — All colors must come from the theme via `${({ theme }) => theme.<key>}`. Flag any hardcoded hex colors inside styled-components.

4. **Key props** — Every `.map()` that renders JSX must pass a stable `key` prop. Flag any missing or index-only keys if the list order can change.

5. **Framer Motion** — In components using framer-motion, verify that animated values come from `useTransform` / `useScroll` and are passed via the `style` prop (not via state re-renders). Flag any `useState` used to drive animations that framer-motion could handle natively.

6. **CSS issues** — Look for obvious styled-components bugs: unclosed template literals, missing units on numeric values (e.g. `font-size: 16` instead of `font-size: 16px`), duplicate property declarations in the same block.

7. **Console noise** — Flag any `console.log`, `console.warn`, or `debugger` left in the code.

Report each issue with file path, line number, and a one-line explanation. Group by category.
