# Repository Guidelines
## Project Structure & Module Organization
The monorepo hosts two frontend clients. `zerogravity-react/` is a Next.js 15 app-router project; feature routes live in `src/app/*`, shared UI under `src/app/_components`, utilities in `src/lib`, and typed contracts in `src/types`. Build sync helpers live in `scripts/`. `zerogravity-vue/` is a Vite-powered dashboard; component modules sit in `src/components`, global stores in `src/stores`, and route views in `src/views`. Shared assets and fonts belong in each project's `public/` (Next) or `src/assets/` (Vue). CI automation and sync jobs are defined in `.github/workflows/`.

## Build, Test, and Development Commands
Install dependencies per app: `cd zerogravity-react && pnpm install`, `cd zerogravity-vue && npm install`. Run the React client locally with `pnpm dev`, produce builds via `pnpm build`, and host production output with `pnpm start`. Guard quality with `pnpm lint`, `pnpm type-check`, and apply formatting using `pnpm format`. Use `pnpm sync:boilerplate` only when mirroring upstream boilerplate changes. For the Vue client, run `npm run dev` for local development, `npm run build` for production bundles, `npm run preview` for static build smoke tests, and `npm run lint` / `npm run format` before merging.

## Coding Style & Naming Conventions
Prettier with the Tailwind plugin enforces formatting (two-space indent, trailing commas) across both apps; rely on lint-staged rather than manual tweaks. React components, hooks, and context providers use PascalCase filenames; shared functions under `src/lib` use camelCase. Prefer co-located CSS modules or vanilla-extract styles per route segment. Vue single-file components should export default Composition API setups and keep script/setup blocks at the top, with PascalCase component names matching their filenames.

## Testing Guidelines
Automated testing is not yet wired; until a unified runner is adopted, every change should ship with manual verification notes in the PR. Use the Next test sandbox at `zerogravity-react/src/app/test` for temporary demo pages—gate them behind explicit routes and strip them before release. For Vue features, add lightweight harness components under `src/views/__playground__` (create if missing) so reviewers can verify behaviour quickly.

## Commit & Pull Request Guidelines
Commits must satisfy commitlint with gitmoji prefixes; format like `:sparkles: feat(login): add magic-link CTA`. Husky hooks already run `pnpm commitlint`, but validate locally when amending. Group related changes, keep subjects under 72 characters after the gitmoji, and document breaking decisions in the body. PRs need a concise summary, linked issues, screenshots or recordings for UI work, and a checklist of manual test steps covering both clients when relevant.
