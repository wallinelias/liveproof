export type Role = 'talent' | 'company' | 'organiser'

export interface Event { id: string; name: string; code: string; date: string; companyIds: string[] }
export interface Company { id: string; name: string; blurb: string }
export interface Problem {
  id: string; eventId: string; companyId: string
  title: string; description: string
  timeBoxMin: number; aiAllowed: boolean; mode: 'solo' | 'pair'
  skills: string[]
}
export interface Submission {
  id: string; problemId: string; talentId: string
  alias: string            // anonymous label shown to companies, e.g. "Solver A7"
  work: string
  skills: string[]
  note: string   // written by the talent, may be empty
  partnerTalentId?: string
}
export interface Talent {
  id: string; firstName: string; skills: string[]
  revealed: boolean        // identity hidden until true
  contact?: string         // synthetic, only shown after reveal
}
export interface Endorsement { id: string; fromTalentId: string; toTalentId: string; submissionId: string; skill: string; note?: string }
export interface AskMessage { id: string; problemId: string; from: 'talent' | 'company'; talentId?: string; text: string; at: string }
export interface Interest { id: string; submissionId: string; companyId: string; status: 'sent' | 'revealed' | 'declined'; followUpNote?: string; contactViewed?: boolean }
