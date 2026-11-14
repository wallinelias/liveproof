import type { Problem } from '../types'

export const problems: Problem[] = [
  {
    id: 'p1',
    eventId: 'ev-espoo-talent-night',
    companyId: 'c-blorvik',
    title: 'Clean up a messy order export',
    description:
      'A shop export has about 2,000 rows with mixed date formats, duplicate order IDs and blank postcodes. Find the three biggest problems and write a short fix plan. A synthetic sample file is on the board.',
    timeBoxMin: 15,
    aiAllowed: true,
    mode: 'solo',
    skills: ['Data analysis', 'Problem solving'],
  },
  {
    id: 'p2',
    eventId: 'ev-espoo-talent-night',
    companyId: 'c-blorvik',
    title: 'Hand over a half-built booking feature',
    description:
      'A colleague left a booking screen half done. Pair up, read the notes, agree what is left, and write a handover message a new developer could act on without asking you anything.',
    timeBoxMin: 30,
    aiAllowed: false,
    mode: 'pair',
    skills: ['Teamwork', 'Written communication'],
  },
  {
    id: 'p3',
    eventId: 'ev-espoo-talent-night',
    companyId: 'c-quillmarsh',
    title: 'Spot duplicate pallet scans',
    description:
      'A warehouse scanner log shows some pallets scanned twice within seconds. List the likely duplicate pairs, explain the rule you used, and say what you would need to confirm it.',
    timeBoxMin: 20,
    aiAllowed: false,
    mode: 'solo',
    skills: ['Data analysis', 'Attention to detail'],
  },
  {
    id: 'p4',
    eventId: 'ev-espoo-talent-night',
    companyId: 'c-quillmarsh',
    title: 'Write a route-change alert for drivers',
    description:
      'A delivery route changed at 07:40 and drivers need to know in one short message. Write the alert for a phone screen, under 280 characters, with what changed, what to do, and who to call.',
    timeBoxMin: 30,
    aiAllowed: true,
    mode: 'solo',
    skills: ['Clear communication', 'Customer orientation'],
  },
  {
    id: 'p5',
    eventId: 'ev-espoo-talent-night',
    companyId: 'c-tarnbeck',
    title: 'Fix a validation bug on a symptom form',
    description:
      'A mock intake form rejects valid dates entered after midnight. Pair up, reproduce it with the test data, propose a fix, and say how you would check that other fields still work.',
    timeBoxMin: 20,
    aiAllowed: true,
    mode: 'pair',
    skills: ['Problem solving', 'Teamwork'],
  },
  {
    id: 'p6',
    eventId: 'ev-espoo-talent-night',
    companyId: 'c-tarnbeck',
    title: 'Summarise app store reviews into themes',
    description:
      'Forty short synthetic reviews of a fictional fitness app are in the sample. Group them into no more than five themes, count each theme, and write one sentence per theme for the product team.',
    timeBoxMin: 15,
    aiAllowed: false,
    mode: 'solo',
    skills: ['Clear communication', 'Data analysis'],
  },
]
