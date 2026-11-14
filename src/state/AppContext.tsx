import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import type { Role, Problem, Interest, Submission, AskMessage, Endorsement, Talent } from '../types'
import { interests as seedInterests } from '../data/interests'
import { submissions as seedSubmissions } from '../data/submissions'
import { askMessages as seedAsk } from '../data/askMessages'
import { endorsements as seedEnd } from '../data/endorsements'
import { talent as seedTalent } from '../data/talent'
import { problems as seedProblems } from '../data/problems'

type Set<T> = Dispatch<SetStateAction<T>>

// In-memory only. Seed arrays are used as initial state and never mutated (updates create new arrays); static data (events, companies, problems) is imported directly.
interface AppState {
  role: Role; setRole: (r: Role) => void
  eventJoined: boolean; setEventJoined: (b: boolean) => void
  meId: string; setMeId: (id: string) => void       // current demo talent
  submissions: Submission[]; setSubmissions: Set<Submission[]>
  asks: AskMessage[]; setAsks: Set<AskMessage[]>
  endorsements: Endorsement[]; setEndorsements: Set<Endorsement[]>
  interests: Interest[]; setInterests: Set<Interest[]>
  talent: Talent[]; setTalent: Set<Talent[]>
  problems: Problem[]; setProblems: Set<Problem[]>
  companyId: string; setCompanyId: (id: string) => void   // current demo company
  resetDemo: () => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('talent')
  const [eventJoined, setEventJoined] = useState(false)
  const [meId, setMeId] = useState('t-me')
  const [submissions, setSubmissions] = useState(seedSubmissions)
  const [asks, setAsks] = useState(seedAsk)
  const [endorsements, setEndorsements] = useState(seedEnd)
  const [interests, setInterests] = useState(seedInterests)
  const [talent, setTalent] = useState(seedTalent)
  const [problems, setProblems] = useState<Problem[]>(seedProblems)
  const [companyId, setCompanyId] = useState('c-blorvik')
  const resetDemo = () => {
    setEventJoined(false); setMeId('t-me'); setSubmissions(seedSubmissions); setAsks(seedAsk)
    setEndorsements(seedEnd); setInterests(seedInterests); setTalent(seedTalent)
    setProblems(seedProblems); setCompanyId('c-blorvik')
  }
  return (
    <Ctx.Provider value={{ resetDemo,  role, setRole, eventJoined, setEventJoined, meId, setMeId, submissions, setSubmissions, asks, setAsks, endorsements, setEndorsements, interests, setInterests, talent, setTalent, problems, setProblems, companyId, setCompanyId }}>
      {children}
    </Ctx.Provider>
  )
}

export function useApp() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useApp outside AppProvider')
  return v
}
