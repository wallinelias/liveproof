import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useApp } from './state/AppContext'
import type { Role } from './types'

const roles: { id: Role; label: string }[] = [
  { id: 'talent', label: 'Talent' },
  { id: 'company', label: 'Company' },
  { id: 'organiser', label: 'Organiser' },
]

function Placeholder({ title }: { title: string }) {
  return <p className="p-4 text-lg">{title} (placeholder)</p>
}

export default function App() {
  const { role, setRole } = useApp()
  const nav = useNavigate()
  return (
    <div className="min-h-screen bg-amber-50 text-stone-900">
      <header className="sticky top-0 bg-white border-b border-stone-300">
        <div className="mx-auto max-w-3xl flex items-center gap-2 p-2">
          <span className="font-bold mr-auto">LiveProof</span>
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => { setRole(r.id); nav('/' + r.id) }}
              aria-pressed={role === r.id}
              className={`min-h-11 px-3 rounded-lg font-medium ${role === r.id ? 'bg-stone-900 text-white' : 'bg-stone-100'}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </header>
      <main className="mx-auto max-w-3xl">
        <Routes>
          <Route path="/" element={<Navigate to="/talent" replace />} />
          <Route path="/talent/*" element={<Placeholder title="Talent" />} />
          <Route path="/company/*" element={<Placeholder title="Company" />} />
          <Route path="/organiser" element={<Placeholder title="Organiser" />} />
        </Routes>
      </main>
    </div>
  )
}
