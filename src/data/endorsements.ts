import type { Endorsement } from '../types'

export const endorsements: Endorsement[] = [
  {
    id: 'e1',
    fromTalentId: 't2',
    toTalentId: 't1',
    submissionId: 's1',
    skill: 'Data analysis',
    note: 'Found the duplicate source fast.',
  },
  {
    id: 'e2',
    fromTalentId: 't6',
    toTalentId: 't4',
    submissionId: 's6',
    skill: 'Problem solving',
    note: 'Explained the midnight bug clearly.',
  },
  {
    id: 'e3',
    fromTalentId: 't1',
    toTalentId: 't5',
    submissionId: 's7',
    skill: 'Clear communication',
    note: 'The alert was short and easy to act on.',
  },
]
