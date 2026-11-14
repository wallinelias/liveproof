import { useEffect, useRef, useState } from 'react'
import ResponsibleDialog from './components/ResponsibleDialog'
import Organiser from './pages/Organiser'
import Landing from './pages/Landing'
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
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
  const tabs = [
    { to: '/talent/board', label: 'Board', dot: false, icon: 'M4 5h16M4 12h16M4 19h16' },
    { to: '/talent/showcase', label: 'My showcase', dot: false, icon: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z' },
    { to: '/talent/inbox', label: 'Inbox', dot: unread, icon: 'M4 6h16v12H4zM4 7l8 6 8-6' },
  ]
  const showTalentNav = role === 'talent' && eventJoined && loc.pathname.startsWith('/talent')
  const [roleOpen, setRoleOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const roleRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!roleOpen && !menuOpen) return
    const down = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node
      if (!roleRef.current?.contains(t)) setRoleOpen(false)
      if (!menuRef.current?.contains(t)) setMenuOpen(false)
    }
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setRoleOpen(false); setMenuOpen(false) } }
    document.addEventListener('mousedown', down)
    document.addEventListener('touchstart', down)
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('mousedown', down); document.removeEventListener('touchstart', down); document.removeEventListener('keydown', key) }
  }, [roleOpen, menuOpen])
  const nav = useNavigate()
  const pickRole = (r: Role) => { setRoleOpen(false); setRole(r); nav('/' + r) }
  const doReset = () => { setMenuOpen(false); resetDemo(); nav('/' + role) }
  return (
    <div className="min-h-screen bg-mist text-ink antialiased">
      <header className="sticky top-0 z-10 h-14 bg-white border-b border-line shadow-sm">
        <div className="mx-auto max-w-3xl h-full flex items-center gap-2 px-2">
          <Link to="/" aria-label="LiveProof home" className="font-extrabold text-xl tracking-tight text-brand mr-auto min-h-11 inline-flex items-center rounded-lg">LiveProof<span className="text-accent">.</span></Link>
          <div role="group" aria-label="Switch role" className="hidden sm:flex p-1 gap-1 rounded-xl bg-mist border border-line">
            {roles.map((r) => (
              <button key={r.id} onClick={() => pickRole(r.id)} aria-pressed={role === r.id}
                className={`min-h-11 px-3 rounded-lg font-semibold ${role === r.id ? 'bg-brand text-white shadow' : 'text-brand'}`}>
                {r.label}
              </button>
            ))}
          </div>
          {showTalentNav && (
            <nav aria-label="Talent" className="hidden sm:flex gap-1">
              {tabs.map((t) => (
                <NavLink key={t.to} to={t.to} className={({ isActive }) => `min-h-11 px-2 inline-flex items-center rounded-lg text-sm font-medium ${isActive ? 'bg-brand text-white' : 'text-brand'}`}>
                  {t.label}{t.dot && <span className="ml-1 w-2 h-2 rounded-full bg-rose-600" aria-hidden="true" />}{t.dot && <span className="sr-only"> (new)</span>}
                </NavLink>
              ))}
            </nav>
          )}
          <button onClick={() => setShowResp(true)} className="hidden sm:inline-flex items-center min-h-11 px-2 rounded-lg text-sm font-medium text-brand underline">Responsible by design</button>
          <button onClick={doReset} className="hidden sm:inline-flex items-center min-h-11 px-2 rounded-lg text-sm font-medium text-brand underline">Reset demo</button>

          <div className="sm:hidden relative" ref={roleRef}>
            <button onClick={() => { setRoleOpen((o) => !o); setMenuOpen(false) }} aria-haspopup="menu" aria-expanded={roleOpen}
              className="min-h-11 pl-3 pr-2 inline-flex items-center gap-1 rounded-full bg-tint text-brand font-semibold">
              {roles.find((r) => r.id === role)?.label}
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 8l5 5 5-5" /></svg>
            </button>
            {roleOpen && (
              <div role="menu" aria-label="Switch role" className="absolute right-0 mt-2 w-44 p-1 bg-white rounded-xl border border-line shadow-lg">
                {roles.map((r) => (
                  <button key={r.id} role="menuitemradio" aria-checked={role === r.id} onClick={() => pickRole(r.id)}
                    className={`w-full min-h-11 px-3 text-left rounded-lg font-semibold ${role === r.id ? 'bg-brand text-white' : 'text-brand'}`}>
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="sm:hidden relative" ref={menuRef}>
            <button onClick={() => { setMenuOpen((o) => !o); setRoleOpen(false) }} aria-haspopup="menu" aria-expanded={menuOpen} aria-label="Menu"
              className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-brand">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
            {menuOpen && (
              <div role="menu" aria-label="Menu" className="absolute right-0 mt-2 w-56 p-1 bg-white rounded-xl border border-line shadow-lg">
                <button role="menuitem" onClick={() => { setMenuOpen(false); setShowResp(true) }} className="w-full min-h-11 px-3 text-left rounded-lg font-medium text-brand">Responsible by design</button>
                <button role="menuitem" onClick={doReset} className="w-full min-h-11 px-3 text-left rounded-lg font-medium text-brand">Reset demo</button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className={`mx-auto max-w-3xl ${showTalentNav ? 'pb-24 sm:pb-0' : ''}`}>
        <Routes>
          <Route path="/" element={<Landing onResponsible={() => setShowResp(true)} />} />
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
      {showTalentNav && (
        <nav aria-label="Talent" className="sm:hidden fixed bottom-0 inset-x-0 z-10 bg-white border-t border-line pb-[env(safe-area-inset-bottom)]">
          <div className="flex h-14">
            {tabs.map((t) => (
              <NavLink key={t.to} to={t.to} className={({ isActive }) => `flex-1 flex flex-col items-center justify-center gap-0.5 text-xs font-semibold ${isActive ? 'text-brand bg-tint' : 'text-muted'}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.icon} /></svg>
                <span className="inline-flex items-center">{t.label}{t.dot && <span className="ml-1 w-2 h-2 rounded-full bg-rose-600" aria-hidden="true" />}{t.dot && <span className="sr-only"> (new)</span>}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      )}
      {showResp && <ResponsibleDialog onClose={() => setShowResp(false)} />}
    </div>
  )
}
