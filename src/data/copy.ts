// UI microcopy and pre-written AI draft examples. All text is plain and synthetic.

export const copy = {
  guide: {
    label: 'Demo guide',
    dismiss: 'Dismiss demo guide',
    show: 'Show guide',
    join: { text: 'Enter the event code ESPOO-TALENT-NIGHT.', button: 'Fill the code' },
    board: { text: 'Pick a problem. Note the AI-allowed badge.', button: 'Open a problem' },
    detail: { text: 'Ask the company a question, then start solving.', button: 'Start solving' },
    solve: { text: 'Same time and tools for everyone. Submit when ready.' },
    submitted: { text: 'Edit the AI draft, then add it to your showcase.', button: 'Go to my showcase' },
    showcase: { text: 'Now switch to Company to see how your work is reviewed.', button: 'Switch to Company' },
    company: { text: "Blind submissions appear in random order. Tap 'I'm interested'.", button: 'Open a problem' },
    companyNew: { text: 'Post a problem, then see the blind submissions arrive in random order.', button: 'Back to company home' },
    companyProblem: { text: "Blind submissions appear in random order. Tap 'I'm interested'.", button: 'See interest sent' },
    matches: { text: 'Switch to Talent inbox to reveal.', button: 'Open Talent inbox' },
    inbox: { text: 'Reveal yourself to share contact. Reversible until contact.', button: 'See organiser view' },
    organiser: { text: 'Aggregate stats only. No individual rankings.', button: 'Back to start' },
  },

  landing: {
    promise: 'Show what you can do, not what your CV says.',
    support: 'Solve a real problem from a real job, live on your phone. Companies review your work, not your background.',
    steps: [
      { title: 'Solve a real problem live', text: 'Same time and tools for everyone.' },
      { title: 'Reviewed blind, in random order', text: 'The company sees the work, not who you are.' },
      { title: 'You choose when to reveal', text: 'Humans decide every hiring step.' },
    ],
    start: { talent: 'Start as Talent', company: 'Start as Company', organiser: 'See the organiser view' },
    note: 'Demo with synthetic data. No real people.',
  },

  banner: 'Same time and tools for everyone',

  boardIntro: 'Pick a real problem, do a short timed task, and show what you can do. Companies see your work, not your CV.',

  responsible: {
    title: 'Responsible by design',
    bullets: [
      'AI drafts only. A human always edits and decides.',
      'No scoring and no ranking of people. Ever.',
      'Submissions are shown in random order.',
      'Blind until the talent chooses to reveal their name and contact.',
      'All data is synthetic, and humans make every hiring decision.',
    ],
  },

  aiBadge: {
    allowed: 'AI allowed',
    notAllowed: 'No AI this round',
  },

  aiDraft: {
    label: 'AI draft',
    editHint: 'This is a starting point. Edit anything you like.',
  },

  emptyStates: {
    board: 'No problems here yet. Check back soon.',
    submissions: 'No work yet. Submissions appear here in random order.',
    asks: 'No questions yet. Ask one if something is unclear.',
    inbox: 'Nothing here yet. Companies that are interested will show up here.',
    showcase: 'Finish a problem to start your showcase.',
  },

  privacy: {
    hidden: 'Your name stays hidden. Companies see only your solver name and your work.',
    reveal: 'Reveal my name and contact',
    notNow: 'Not now',
    revealed: 'You chose to share your name and contact with this company.',
    reversible: 'You can say not now at any time before your contact is shared.',
  },

  // Example of the "Help me write it" flow: a vague need turned into a draft problem.
  // Shown as an AI draft. The company edits it before posting.
  helpMeWrite: {
    need: 'Our app feels slow on phones sometimes and users complain. Not sure what to test.',
    draftProblem: {
      title: 'Find why the order list loads slowly on phones',
      description:
        'Users on older Android phones report that the order list takes several seconds to show. Using the sample app build, measure load times on two phone profiles, find the slowest step, and propose one change with a way to check it.',
      timeBoxMin: 20,
      aiAllowed: true,
      mode: 'solo',
      skills: ['Problem solving', 'Attention to detail'],
    },
  },
}
