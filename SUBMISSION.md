# LiveProof - Junction 2026 submission pack

## 1. Junction form

**Project name (max 30 chars)** - pick one:
- `LiveProof` (9)  <- recommended
- `LiveProof Espoo` (15)
- `Proof Over CV` (13)

**Punchline (max 200 chars)** (about 180)
Companies post real problems at recruiting events. Talent solves them live on their phones. Companies review the work, blind, until talent chooses to reveal themselves. Humans decide everything.

**Challenge:** City of Espoo - Rethinking Recruitment

**Demo link:** https://liveproof-ten.vercel.app/
**Source code link:** https://github.com/wallinelias/liveproof
**Phone number(s):** [PLACEHOLDER]
**Discord username:** [PLACEHOLDER]
**Video:** [PLACEHOLDER, max 2:00]
**PDF deck:** [PLACEHOLDER, max 20 MB]

**Technologies:** React, TypeScript, Vite, Tailwind CSS v4, React Router (HashRouter), static hosting (Netlify / GitHub Pages / Vercel static). No backend, no database, no API keys, no paid services.

**Description (max 5000 chars, markdown)** - paste everything between the lines:

---
## The problem
CVs are now written by AI, and screening is increasingly done by AI. At matchmaking events, companies drown in polished, similar approaches, and talent struggles to show real ability in a two-minute chat. Companies also struggle to describe what they need, and follow-up is weak. Profiling tools add bias risk (nationality, language, education, career path) and legal risk.

## The idea
Hackathons show who people really are. LiveProof brings that into every recruiting event.

At a recruiting event, companies post short, real problems from the actual job. Talent solves them live on their phones, solo or in pairs, with the same time box and tools for everyone. Companies review the work, not the CV, blind: they see an anonymous solver name, the work and skill tags. Talent reveals name and contact only if and when they choose.

## How it works
**Talent (mobile-first)**
1. Join the event with an event code.
2. Browse the problem board. Every card shows company, time box, an "AI allowed / No AI this round" badge, solo or pair, and skill tags.
3. Open a problem and ask the company a question.
4. Solve with a countdown timer. Banner: "Same time and tools for everyone". Pair mode has a shared box and short chat.
5. After submitting, an AI-drafted skills summary appears, labelled "AI draft". The talent edits it and it goes to their showcase.
6. The showcase holds solved problems, the talent's own summary, optional skill-tagged peer endorsements and privacy status.
7. When a company is interested, it arrives in the inbox. Talent taps "Reveal" or "Not now".

**Company (laptop or phone)**
1. Paste a vague need, for example "our app feels slow on phones". "Help me write it" gives an AI draft of a concrete problem. The company edits it, sets time box, AI allowed yes/no and solo/pair, and publishes.
2. Review blind submissions in random order: anonymous solver name, work, skill tags, endorsements. Reply in the ask-thread.
3. Tap "I'm interested". This is a human action only. After the talent reveals, the company gets a contact card and a follow-up note template.

**Organiser**
Aggregate counts only: problems, submissions, introductions made. Never anything per person.

## Social layer
Collaboration is optional. Pair partners can give skill-tagged endorsements ("good at debugging"); companies see endorsements, never raw chat. The solo path is fully equal.

## Responsible by design (EU AI Act and privacy)
- **AI assists, never decides.** There is no score, rank, filter or "match %" for people anywhere. The types contain no score field, so it cannot appear by accident.
- **Human in the loop for every hiring step.** Interest, contact and decisions are human actions. This keeps LiveProof away from automated profiling and automated decision-making about individuals.
- **Risk class.** The design deliberately avoids the AI uses that the EU AI Act lists as high-risk in employment (AI to screen, filter, rank or evaluate candidates). The only AI features are two drafting aids (problem text for companies, skills summary for talent). Both are labelled "AI draft", editable and non-binding. This is our reading of the Act, not legal advice. A real deployment would get a legal review, and transparency duties for AI-generated text would be met by the labelling.
- **Privacy by design.** Data minimisation: first name and skills only, and the name stays hidden until the talent reveals. Reveal is one tap and reversible until contact is shared. No accounts, no tracking, no backend in the prototype.
- **Bias avoidance.** Blind review. Random order of submissions (one shuffle helper, no sort by any field). Equal time and tools, declared on every problem. Skills and work are shown, not nationality, language polish, school or career path.

## Synthetic data
Every name, company, problem and submission is fictional. No real personal data is used or stored.

## Feasibility
LiveProof is a static web app: nearly free to host, no installs, works on any phone browser. An organiser needs only an event code, a few company problems and an aggregate stats screen. In production, a small backend would store submissions with event-scoped retention and deletion, and a serverless function could call a small language model for the two drafting aids (key kept server-side). Companies post a problem via a link before the event; talent join by event code, no account.

## What is real and what is simulated in this demo
Real: the full flow, timers, blind random-order review, the reveal and mutual-interest logic, aggregate stats.
Simulated: the AI drafts (problem text and skills summary) are **pre-generated strings**, not live model calls. Company answers in the ask-thread and the pair partner are scripted. There is no backend, so the roles share one in-memory state in one browser.

The 4-second opening shot of the demo video is AI-generated (Higgsfield), abstract, with no real people.
---

## 2. Two-minute video (hard limit 2:00, target 1:50)

The full script, shot table, Higgsfield prompt, filming guide, CapCut steps and checklist are in `VIDEO_PLAN.md`.

## 3. 60-second spoken pitch (about 150 words)

"Everyone at a recruiting event has the same problem. Companies get a stack of AI-polished CVs that all sound alike. Talent get two minutes at a booth to prove themselves. And the AI screening that is supposed to help adds bias and legal risk.

LiveProof changes the signal. Companies post a short, real problem from the actual job. Talent solve it live on their phones, with the same time and tools for everyone, solo or in pairs. Companies review the work, not the CV. It is blind and in random order. There are no scores and no rankings. A human taps interested, and the talent decides if and when to reveal their name.

AI only helps draft: it turns a vague company need into a clear problem, and it drafts a skills summary the talent edits. It never decides about a person. That keeps us clear of automated profiling under the EU AI Act, with minimal data and synthetic data throughout.

Hackathons show who people really are. LiveProof brings that into every recruiting event."

## 4. PDF deck outline (9 slides)

1. **Title** - LiveProof, pitch line, City of Espoo Rethinking Recruitment. (Context)
2. **Problem** [Impact 45] - AI-written CVs, AI screening, irrelevant approaches, weak follow-up, bias risk for international talent. Companies cannot state their needs.
3. **Insight and idea** [Impact 45] - Live work beats CV. Hackathon signal in every event. One-line flow: post, solve, review blind, reveal, follow up.
4. **Talent experience** [Innovation and UX 35] - Phone screenshots: board with badges, solve with timer, AI draft summary, showcase, reveal inbox.
5. **Company experience** [Innovation and UX 35] - Help me write it, blind random-order review, "I'm interested", contact card.
6. **Social layer** [Innovation and UX 35] - Pair mode, skill-tagged endorsements, solo always equal, no raw chat to companies.
7. **Responsible by design** [Responsible and Feasible 20] - No scores or ranking, human decides, random order, blind, minimal data, synthetic data. EU AI Act: drafting aids only, labelled; avoids high-risk screening use; legal review before production.
8. **Feasibility and Espoo rollout** [Responsible and Feasible 20, Impact 45] - Static web app, near-zero cost, event code, no accounts. Pilot at one Espoo event, then a city-run platform. Real vs simulated table. Organiser stats are counts only.
9. **Impact and ask** [Impact 45] - Better relevance for companies, fairer chance for international and non-traditional talent, measurable follow-up. Pitch line, demo link, contact.

## 5. Q&A prep (10 questions)

1. **What risk class is this under the EU AI Act?**
   We designed it to stay out of the high-risk employment category by never using AI to screen, rank or evaluate candidates. The only AI is two labelled, editable drafting aids, so transparency is the main duty. This is our reading, and we would get a legal review before a real launch.

2. **How do you avoid bias?**
   Review is blind, in random order, with equal time and tools, so name, school, nationality and language polish never appear. Humans still judge, so human bias remains, but we remove the cues and the automated amplification.

3. **What does the AI actually do?**
   It drafts a clear problem from a company's vague need, and drafts a skills summary the talent edits. It never scores, ranks, filters or recommends people.

4. **What is real and what is simulated in the demo?**
   The flow, timers, random order, reveal logic and stats are real code. The AI drafts are pre-generated strings, and the company replies and pair partner are scripted, with all data synthetic.

5. **How would it scale?**
   It is a static front end, so event load is cheap. For production we add a small backend with event-scoped storage and deletion, and a serverless call for the drafts.

6. **How are companies and talent onboarded?**
   Companies get a link before the event to post a problem, with help from the draft tool. Talent just scan an event code on arrival, with no account.

7. **Why would companies use it?**
   They get real evidence of skill on their own problem, fewer irrelevant approaches, and a clearer description of their own needs. Candidates approach them only after solving their problem.

8. **Can it be gamed, for example with AI or friends?**
   Each problem declares if AI is allowed, and short timed tasks plus a follow-up conversation make pure outsourcing hard to hide. Companies should treat the work as a conversation starter, and a human interviews anyway.

9. **Is it unfair to introverts, or to people who are slower on a phone?**
   Solo is fully equal and social features are optional. Endorsements are an extra signal, never required, and no one is ranked on them. Time boxes and accessibility should be reviewed per event.

10. **How does privacy work, and what is the business model for a city?**
    We keep first name and skills only, hidden until the talent reveals, and everything in the demo is synthetic. For a city like Espoo it is event infrastructure: free for talent, with the city or sponsoring companies paying per event, and aggregate stats showing the impact of its events.

## 6. USER checklist for the morning

- [ ] `npm run build` passes, then deploy `dist/` to a static host (Netlify drop or GitHub Pages). Open the live URL on a phone and test the full flow.
- [ ] Put the demo URL and the repo URL into the placeholders above. Make the repo public or share access.
- [ ] Record the 2-minute video from the script (phone for talent, laptop for company and organiser). Check it is under 2:00. Upload and get a link.
- [ ] Build the PDF deck from section 4 (8-10 slides, under 20 MB) and export it.
- [ ] Fill in the Junction form: name, punchline, description, challenge, technologies, video, demo, source, deck, phone, Discord.
- [ ] Set submission status to FINAL before Sun 15 Nov 10:00 (hard deadline).
- [ ] Be at the venue at 10:30 for peer review. Charge the phone, and have the demo URL and a screen recording as backup.
