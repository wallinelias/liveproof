# LiveProof - Spec

## One-liner
At a recruiting event, companies post short real problems from the actual job. Talent solves them live
on their phones, solo or in pairs, with the same time and tools for everyone. Companies review the WORK,
not the CV, blind until the talent chooses to reveal themselves. Humans decide everything.

Pitch line: "Hackathons show who people really are. LiveProof brings that into every recruiting event."

## The challenge (City of Espoo, "Rethinking Recruitment")
How can matchmaking events help companies and talent find each other relevantly, despite AI-generated
CVs and AI-assisted screening? Any stage: before, during, after the event. Judging:
Impact & Relevance 45%, Innovation & UX 35%, Responsible & Feasible Execution 20%.
Hard constraints: no automated profiling/decision-making about individuals without human involvement,
synthetic data, minimal personal data, show how privacy works under the EU AI Act, avoid bias
(nationality, language, education, career path).

## Problems we solve (from the brief)
- Companies cannot describe their needs clearly or early -> AI-assisted problem drafting (human edits).
- Talent cannot articulate their value; CVs are AI-written -> live work is the proof + talent-owned summary.
- Companies drown in irrelevant approaches -> talent approaches only companies whose problem they solved.
- Bias / international talent -> blind review, equal time and tools, skills not polish.
- Follow-up after events is weak -> mutual-interest flow and follow-up note.

## Principles (design rules)
1. AI assists, never decides. No scores, no rankings, no "match %" for people. Ever.
2. Submissions appear in random order. Company sees skills tags + work, not name/school/nationality.
3. Talent owns their showcase and chooses when to reveal identity. Reveal is one tap, reversible before contact.
4. Fair playing field: every problem declares time box, AI allowed yes/no, solo or pair. Same for all solvers.
5. Solo path is always fully equal. Social features are optional.
6. Collaboration signal = optional, skill-tagged peer endorsements. Company never sees raw chat.
7. Minimal data: first name + skills only until reveal. Everything in the demo is synthetic.

## Users and screens
### Talent (mobile-first)
1. Join event: enter event code (demo: "ESPOO-TALENT-NIGHT").
2. Problem board: cards with company, title, time box, AI-allowed badge, solo/pair badge, skill tags.
3. Problem detail + "Ask the company" thread (company answers are seeded human-style replies).
4. Solve: countdown timer, text/code box, submit. Pair mode: shared box + short chat with a scripted
   synthetic partner. Banner: "Same time and tools for everyone".
5. After submit: AI-drafted skills summary (editable by talent, labelled "AI draft") -> goes to showcase.
6. My showcase: solved problems, skills summary, endorsements received, privacy status.
7. Interest inbox: "A company is interested in your work" -> Reveal / Not now.
### Company (dashboard, works on laptop and phone)
1. Post a problem: paste a vague need -> "Help me write it" gives an AI draft the company edits ->
   set time box, AI allowed, solo/pair -> publish. Seed demo output is pre-generated.
2. Blind submissions: anonymous cards ("Solver A7"), work text, skill tags, endorsements, random order,
   can reply to ask-thread. Button "I'm interested" (human action only).
3. Mutual interest: after talent reveals -> synthetic contact card + follow-up note template.
### Organiser (small, optional if time)
Aggregate event stats only (problems, submissions, introductions made). Never per-person ranking.

## Out of scope
Real accounts, real backend, real email, native apps, real-time multi-device sync, any scoring model.
Stretch (only if budget remains): one serverless function that calls a small Claude model for the two
AI-draft features, key stored as a server env var, never in the client.

## Demo script (about 60-90 s, keep this flow working at all times)
1. Phone, talent: join event -> problem board (point at AI-allowed badge).
2. Open a problem, ask a question, see the answer.
3. Solve with timer (pre-filled) -> submit -> AI draft summary -> showcase.
4. Quick pair round with endorsement.
5. Switch to company: post a problem with AI help; open blind submissions in random order; click interested.
6. Switch to talent: interest arrives -> reveal -> mutual contact. 
7. Organiser stats slide. Close with the pitch line.

## Look and feel
Clean, warm, high contrast, large tap targets, readable text sizes, accessible colours. Plain language.
Role switcher visible at the top (Talent / Company / Organiser) for the demo.

## Submission checklist (Junction form)
Project name (max 30 chars), punchline (max 200), description (max 5000, markdown), challenge = City of Espoo
Rethinking Recruitment, technologies, 2-minute video (hard limit), demo link, source code link, PDF deck (max 20MB),
phone numbers, Discord username. Set status to FINAL before Sun 10:00. Be at the venue 10:30 for peer review.
