import { Link } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { copy } from '../data/copy'
import type { Role } from '../types'

const c = copy.landing

export default function Landing({ onResponsible }: { onResponsible: () => void }) {
  const { setRole } = useApp()
  const buttons: { role: Role; label: string; primary: boolean }[] = [
    { role: 'talent', label: c.start.talent, primary: true },
    { role: 'company', label: c.start.company, primary: false },
    { role: 'organiser', label: c.start.organiser, primary: false },
  ]
  return (
    <div className="px-4 py-10 bg-gradient-to-b from-sky-soft via-sky-soft/60 to-mist relative overflow-hidden">
      <svg className="absolute -top-16 -right-16 w-64 h-64 text-sky opacity-30 pointer-events-none" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <circle cx="120" cy="80" r="70" stroke="currentColor" strokeWidth="14" />
        <path d="M0 170 Q60 110 120 150 T200 120" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      </svg>
      <h1 className="relative text-4xl font-extrabold tracking-tight text-brand leading-tight">{c.promise}</h1>
      <p className="relative mt-4 text-lg text-muted">{c.support}</p>

      <ol className="relative mt-10 grid gap-3 sm:grid-cols-3">
        {c.steps.map((s, i) => (
          <li key={s.title} className="bg-white border border-line border-t-4 border-t-sky rounded-2xl p-5 shadow-sm">
            <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-tint text-brand font-bold" aria-hidden="true">{i + 1}</span>
            <h2 className="mt-2 font-bold text-ink">{s.title}</h2>
            <p className="mt-1 text-muted">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="relative mt-10 grid gap-3">
        {buttons.map((b) => (
          <Link key={b.role} to={'/' + b.role} onClick={() => setRole(b.role)}
            className={`min-h-12 px-4 inline-flex items-center justify-center rounded-xl font-bold text-lg ${b.primary ? 'bg-brand text-white' : 'bg-white text-brand border-2 border-brand'}`}>
            {b.label}
          </Link>
        ))}
      </div>

      <div className="relative mt-8 text-center">
        <button onClick={onResponsible} className="min-h-11 px-3 rounded-lg font-medium text-brand underline">Responsible by design</button>
        <p className="text-sm text-muted">{c.note}</p>
      </div>
    </div>
  )
}
