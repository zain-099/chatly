# Repository Guidelines

## Project Structure & Module Organization

- `apps/` hosts product surfaces like the builder, viewer, docs, and landing page (e.g., `apps/builder`, `apps/viewer`).
- `packages/` contains shared libraries, blocks, embeds, and tooling (`packages/ui`, `packages/lib`, `packages/blocks/*`, `packages/embeds/*`).
- `scripts/` is for repository-wide maintenance scripts.
- Tests live alongside code in `*.test.ts` and under app-specific fixtures (e.g., `apps/viewer/src/test`).

## Coding Style & Naming Conventions

- Primary languages are TypeScript/TSX; follow existing patterns in each package/app.
- Formatting and linting are enforced by Biome (`biome.json`); use spaces and let Biome format.
- Use PascalCase for React components and camelCase for variables/functions, mirroring existing code.
- Never use `any` type. Always use proper TypeScript types, interfaces, or union types instead.
- Whenever possible, never use `as`. Instead, use `satisfies` as of last resort to make sure we keep strong type-safety.
- Prefer writing long and complex functions that provide good, deep abstraction.
- IMPORTANT: Only add a comment if a piece of logic is hard to grasp.
- Prefer infer the return type of a function instead of declaring it.
- Helper functions should be placed at the bottom of the file.
