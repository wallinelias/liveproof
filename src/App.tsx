import { useState } from 'react'
import ResponsibleDialog from './components/ResponsibleDialog'
import Organiser from './pages/Organiser'
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from './state/AppContext'
import TalentJoin from './pages/TalentJoin'
import ProblemBoard from './pages/ProblemBoard'
import ProblemDetail from './pages/ProblemDetail'
import Solve from './pages/Solve'
import Submitted from './pages/Submitted'
import Showcase from './pages/Showcase'
import CompanyHome from './pages/CompanyHome'
import CompanyNew from './pages/CompanyNew'
import CompanyProblem from './pages/CompanyProblem'
import CompanyMatches from './pages/CompanyMatches'
import TalentInbox from './pages/TalentInbox'
import type { Role } from './types'

const roles: { id: Role; label: string }[] = [
  { id: 'talent', label: 'Talent' },
  { id: 'company', label: 'Company' },
  { id: 'organiser', label: 'Organiser' },
]

export default function App() {
  const { role, setRole, eventJoined, interests, submissions, meId, resetDemo } = useApp()
  const [showResp, setShowResp] = useState(false)
  const loc = useLocation()
  const myIds = submissions.filter((x) => x.talentId === meId).map((x) => x.id)
  const unread = interests.some((i) => i.status === 'sent' && myIds.includes(i.submissionId))
  const tabs = [{ to: '/talent/board', label: 'Board' }, { to: '/talent/showcase', label: 'My showcase' }, { to: '/talent/inbox', label: unread ? 'Inbox (new)' : 'Inbox' }]
  const nav = useNavigate()
  return (
    <div className="min-h-screen bg-amber-50 text-stone-900">
      <header className="sticky top-0 z-10 bg-white border-b-2 border-stone-900">
        <div className="mx-auto max-w-3xl flex flex-wrap items-center gap-x-2 gap-y-1 p-2">
          <div className="flex gap-2 w-full sm:w-auto sm:order-2">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => { setRole(r.id); nav('/' + r.id) }}
                aria-pressed={role === r.id}
                className={`flex-1 min-h-11 px-3 rounded-lg font-medium ${role === r.id ? 'bg-stone-900 text-white' : 'bg-stone-100'}`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <span className="font-bold mr-auto sm:order-1">LiveProof</span>
          <button onClick={() => setShowResp(true)} className="min-h-11 px-2 rounded-lg text-sm font-medium underline sm:order-3">Responsible by design</button>
          <button onClick={() => { resetDemo(); nav('/' + role) }} className="min-h-11 px-3 rounded-lg text-sm font-medium border-2 border-stone-900 sm:order-4">Reset demo</button>
        </div>
        {role === 'talent' && eventJoined && loc.pathname.startsWith('/talent') && (
          <nav aria-label="Talent" className="mx-auto max-w-3xl flex gap-2 p-2 pt-0">
            {tabs.map((t) => (
              <NavLink key={t.to} to={t.to} className={({ isActive }) => `flex-1 min-h-12 inline-flex items-center justify-center rounded-lg font-medium text-center ${isActive ? 'bg-stone-900 text-white' : 'bg-stone-100'}`}>
                {t.label}{t.label.includes('new') && <span className="ml-1 w-2 h-2 rounded-full bg-rose-600" aria-hidden="true" />}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-3xl">
        <Routes>
          <Route path="/" element={<Navigate to="/talent" replace />} />
          <Route path="/talent" element={<TalentJoin />} />
          <Route path="/talent/board" element={<ProblemBoard />} />
          <Route path="/talent/problem/:id" element={<ProblemDetail />} />
          <Route path="/talent/problem/:id/solve" element={<Solve />} />
          <Route path="/talent/submitted/:sid" element={<Submitted />} />
          <Route path="/talent/showcase" element={<Showcase />} />
          <Route path="/talent/inbox" element={<TalentInbox />} />
          <Route path="/talent/*" element={<Navigate to="/talent" replace />} />
          <Route path="/company" element={<CompanyHome />} />
          <Route path="/company/new" element={<CompanyNew />} />
          <Route path="/company/problem/:id" element={<CompanyProblem />} />
          <Route path="/company/matches" element={<CompanyMatches />} />
          <Route path="/company/*" element={<Navigate to="/company" replace />} />
          <Route path="/organiser" element={<Organiser />} />
        </Routes>
      </main>
      {showResp && <ResponsibleDialog onClose={() => setShowResp(false)} />}
    </div>
  )
}
