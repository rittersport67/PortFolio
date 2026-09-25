---
name: add-headers
description: Add a file header comment and doc comments on every function / component / hook / class, using the documentation convention of the detected framework (JSDoc for React/JS, TSDoc for TS, docstrings for Python, KDoc, PHPDoc, GoDoc…). Use when the user asks to "add headers", "documenter les fonctions", "ajouter des entêtes", "add JSDoc", or to document a file or folder.
argument-hint: "[file or folder path — defaults to the files changed in git]"
---

# Add file headers + function/component docs

Target: `$ARGUMENTS`
If no argument is given, use the modified/untracked source files from `git status --porcelain`. If that is empty, ask the user which file or folder to document.
A folder means every source file inside it, recursively (skip `node_modules`, `build`, `dist`, `.git`, generated files, images, lockfiles, `*.min.*`).

## 1. Detect the framework and doc convention

Inspect the manifest files at the repo root (`package.json`, `tsconfig.json`, `pyproject.toml`, `requirements.txt`, `go.mod`, `pom.xml`, `build.gradle*`, `composer.json`, `Cargo.toml`, `pubspec.yaml`…) and the target file's extension, then pick the convention:

| Stack | Header style | Function/component doc |
|---|---|---|
| React (JS/JSX) | `/** … */` block with `@file` | JSDoc: `@component`, `@param {Object} props`, `@param {type} props.x`, `@returns {JSX.Element}` |
| React / Next / Vue / Angular (TS) | `/** … */` with `@file` | TSDoc: no types in tags (types live in the signature), `@param x - desc`, `@returns` |
| Vue SFC | `<!-- … -->` above `<template>` | JSDoc in `<script>` for props/emits/composables |
| Node / plain JS | `/** … */` with `@file` / `@module` | JSDoc with `{type}` |
| Python | module docstring `"""…"""` on line 1 (after shebang/encoding) | Google-style docstrings (`Args:`, `Returns:`, `Raises:`) unless the repo already uses NumPy/Sphinx style |
| Go | `// Package x …` above `package` | `// FuncName does …` (must start with the identifier) |
| Java / Kotlin | `/** … */` above the class | Javadoc / KDoc (`@param`, `@return`, `@throws`) |
| PHP | `/** … */` with `@file` / `@package` | PHPDoc |
| Rust | `//!` module docs | `///` item docs with `# Examples` only when useful |
| C# | `// <copyright>` style only if the repo already uses it | `/// <summary>` XML docs |
| Dart / Flutter | `///` library doc | `///` docs |

**Existing style wins.** Before writing, look at 2–3 already-documented files in the repo. If they follow a different convention (language, tag set, header fields), match them instead of the table.

## 2. File header

Place it at the very top, after any shebang, `'use client'` / `'use strict'` directive, or encoding line (directives must stay first — put the header *after* them).

Content — short and factual, derived from reading the file:
- `@file` — relative path from repo root
- 1–3 line description of the file's role (what it renders / exposes and where it is used)
- `@module` / `@component` when relevant
- Notable dependencies only if non-obvious (e.g. framer-motion, MUI Lab Timeline)
- Do **not** add author, date, or license fields unless existing headers in the repo already have them. If they do, reuse the git user name (`git config user.name`) and today's date.

If the file already has a header, update it in place rather than adding a second one.

## 3. Function / component docs

Document every **exported** item and every non-trivial internal function:
- React components: purpose, each prop (name, type, whether optional, default), return. For components that receive data from a data file, name the expected shape.
- Hooks: what state/effect they manage, params, returned value.
- Plain functions / methods: purpose, params, return, thrown errors, side effects.
- Classes: class-level summary + public methods.

Skip:
- styled-components / CSS-in-JS declarations, simple constants, one-line arrow callbacks inside JSX, trivial getters. At most, group styled-components under a single `/* ---- Styled components ---- */` separator if the file has none.
- Anything that already has an accurate doc comment (fix it only if it's wrong or outdated).

Write descriptions that explain **why / what for**, not a restatement of the name (`/** Renders the navbar */` on `Navbar` is useless — say what's notable: sticky, hamburger at ≤768px, easter-egg trigger…).

## 4. Rules

- **Comments only.** Never change code, imports, formatting, or logic. The diff must contain only added/modified comment lines.
- Always write docs and comments in **English**, even if existing comments or the conversation are in another language. JSDoc tags stay as-is.
- Keep headers under ~8 lines and function docs proportional to complexity.
- For JS/TS projects, after editing run the linter/build check if cheap (`npx eslint <files>` or the project's lint script) to confirm nothing broke; for Python run `python -m py_compile <files>`.

## 5. Report

Finish with a short list: files touched, number of items documented per file, and the convention used (and why, if it was inferred from existing files rather than the table).
