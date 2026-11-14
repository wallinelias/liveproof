# LiveProof architecture

Static SPA: React / Vite / TypeScript / Tailwind v4. No backend, no accounts, no secrets.
Dependencies: react, react-dom, react-router-dom (justified: nested routes + params for problem/submission
pages; HashRouter so the static build works on any host without rewrite rules), tailwindcss. Nothing else.

## Layout
- `src/types.ts` all data shapes (Event, Company, Problem, Submission, Talent, Endorsement, AskMessage, Interest).
- `src/data/*.ts` one typed seed array per entity (events, companies, problems, submissions, talent,
  endorsements, askMessages, interests). Empty until M1; all synthetic.
- `src/state/AppContext.tsx` single React context (in-memory, resets on reload).
- `src/App.tsx` shell + role switcher + routes. `src/pages/` one file per screen.

## Routes (HashRouter)
`/talent` join (event code) -> `/talent/board` -> `/talent/problem/:id` (+ask thread) -> `/talent/solve/:id`
-> `/talent/summary/:submissionId` -> `/talent/showcase`, `/talent/inbox`.
`/company` -> `/company/new` (post problem), `/company/problem/:id` (blind submissions), `/company/matches`.
`/organiser` aggregate stats.

## State
`useApp()` exposes role, eventJoined, meId (demo talent), and mutable copies of submissions, asks,
endorsements, interests, talent. Events, companies, problems are imported read-only (company-posted problems
get a state array added by the builder). No persistence; reload resets the demo.

## Role switcher
Header buttons set `role` in context and navigate to `/<role>`. Demo convenience only, no auth: each role is
a route tree over the same in-memory state, so actions carry across (company "interested" appears in the
talent inbox).

## Red lines, enforced in code
- Random order: company views get submissions only via one helper (`shuffle()`, Fisher-Yates, once per view
  mount). No sort by any field; no score/rank field exists in the types.
- Blind: company components receive `Submission` (alias, work, skills, endorsements) only. `Talent.firstName`
  and `contact` render only through one `RevealedContact` component that requires `talent.revealed` and an
  interest with status `revealed`.
- Reveal: talent taps "Reveal" in the inbox; "Not now" sets `declined`. Reversible until contact is shown.
- AI drafts (problem text, skills summary) are pre-generated strings labelled "AI draft", always editable.
  Nothing ranks, scores or filters people. Organiser sees counts only.

## Deploy
`npm run build` emits static `dist/` (relative `base: './'`). Any static host (Netlify drop, GitHub Pages,
Vercel static). No env vars.
