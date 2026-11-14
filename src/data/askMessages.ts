import type { AskMessage } from '../types'

export const askMessages: AskMessage[] = [
  {
    id: 'a1',
    problemId: 'p1',
    from: 'talent',
    talentId: 't1',
    text: 'Is the sample file the full export or only one day?',
    at: '2026-11-12T10:05',
  },
  {
    id: 'a2',
    problemId: 'p1',
    from: 'company',
    text: 'One day, about 2,000 rows. The full export is much bigger, so a plan that scales is a plus.',
    at: '2026-11-12T10:20',
  },
  {
    id: 'a3',
    problemId: 'p3',
    from: 'talent',
    talentId: 't4',
    text: 'Do we have the gate log, or only the scanner data?',
    at: '2026-11-12T11:02',
  },
  {
    id: 'a4',
    problemId: 'p3',
    from: 'company',
    text: 'Scanner data only for today. Say what the gate log would confirm, and that is enough.',
    at: '2026-11-12T11:18',
  },
  {
    id: 'a5',
    problemId: 'p5',
    from: 'talent',
    talentId: 't6',
    text: 'Can we add our own test dates, or only use the sample?',
    at: '2026-11-12T10:31',
  },
  {
    id: 'a6',
    problemId: 'p5',
    from: 'company',
    text: 'Use the sample first. Any extra test you add is welcome.',
    at: '2026-11-12T10:44',
  },
]
