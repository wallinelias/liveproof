import type { Submission } from '../types'

// Aliases are the only identity companies see. Order is not meaningful; the UI shuffles.
export const submissions: Submission[] = [
  {
    id: 's1',
    problemId: 'p1',
    talentId: 't1',
    alias: 'Solver A7',
    work:
      'Sorted by order ID first. Found 143 duplicate IDs, all from one import on the 3rd. Date formats were DD.MM.YYYY and YYYY-MM-DD mixed, so I normalised both. Plan: dedupe at import, validate postcodes, and log rejected blank rows.',
    skills: ['Data analysis', 'Attention to detail', 'Problem solving'],
    note:
      'I worked through a messy export step by step and traced the duplicates to one import. I am good at data checks and clear plans.',
  },
  {
    id: 's2',
    problemId: 'p1',
    talentId: 't2',
    alias: 'Solver K2',
    work:
      'Pivoted by status to see failed orders. Blank postcodes clustered in one region, which pointed to a form bug. Wrote three bullets and one question for the shop team.',
    skills: ['Data analysis', 'Teamwork'],
    note:
      'I like finding patterns in data and turning them into one clear question.',
  },
  {
    id: 's3',
    problemId: 'p2',
    talentId: 't3',
    partnerTalentId: 't5',
    alias: 'Solver M4',
    work:
      'We read the notes twice and listed what was done. The handover names the three open tasks, the test that fails, and where the feature flag lives. We left one question for the team lead.',
    skills: ['Written communication', 'Teamwork'],
    note:
      'I write calmly and ask the right question before I start. I like focused pair work.',
  },
  {
    id: 's4',
    problemId: 'p3',
    talentId: 't4',
    alias: 'Solver R9',
    work:
      'Matched scans on pallet ID within a 5-second window. Found 11 likely pairs, two of them plausible double scans at dock doors. Explained the rule and flagged what the gate log would need to confirm.',
    skills: ['Data analysis', 'Attention to detail'],
    note:
      'I build small data checks in Python and spreadsheets. I am careful with edge cases.',
  },
  {
    id: 's5',
    problemId: 'p3',
    talentId: 't6',
    alias: 'Solver T3',
    work:
      'Started from the timestamps, not the pallet IDs, and checked gaps under one minute. Found 9 pairs. Stated the assumption that scanner clocks drift less than 2 seconds.',
    skills: ['Attention to detail', 'Problem solving'],
    note:
      'I am careful with detail and good at spotting small mismatches. I explain my assumptions.',
  },
  {
    id: 's6',
    problemId: 'p5',
    talentId: 't4',
    partnerTalentId: 't6',
    alias: 'Solver W5',
    work:
      'Reproduced the bug with a date like 00:30 entered on the previous day. The check compared local time to UTC. Proposed a fix and a test for dates across midnight. My partner checked the other fields.',
    skills: ['Problem solving', 'Teamwork'],
    note:
      'I like pairing and explaining bugs in plain words.',
  },
  {
    id: 's7',
    problemId: 'p4',
    talentId: 't5',
    alias: 'Solver D8',
    work:
      'Wrote a 240-character alert with what changed, the new stop order, and a dispatch phone number. Tested it on a colleague who had not seen the route before.',
    skills: ['Clear communication', 'Customer orientation'],
    note:
      'I write short messages for busy readers.',
  },
  {
    id: 's8',
    problemId: 'p6',
    talentId: 't2',
    alias: 'Solver B1',
    work:
      'Grouped 40 reviews into four themes: crashes after updates, unclear pricing, missing sleep tracking, and good coaching tips. Counted each theme and wrote one sentence for each.',
    skills: ['Clear communication', 'Data analysis'],
    note:
      'I write plain summaries of data for non-technical teams.',
  },
]
