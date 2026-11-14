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
    <div className="px-4 py-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-brand leading-tight">{c.promise}</h1>
      <p className="mt-4 text-lg text-muted">{c.support}</p>

      <ol className="mt-8 grid gap-3 sm:grid-cols-3">
        {c.steps.map((s, i) => (
          <li key={s.title} className="bg-white border border-line rounded-2xl p-4">
            <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-tint text-brand font-bold" aria-hidden="true">{i + 1}</span>
            <h2 className="mt-2 font-bold text-ink">{s.title}</h2>
            <p className="mt-1 text-muted">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-3">
        {buttons.map((b) => (
          <Link key={b.role} to={'/' + b.role} onClick={() => setRole(b.role)}
            className={`min-h-12 px-4 inline-flex items-center justify-center rounded-xl font-bold text-lg ${b.primary ? 'bg-brand text-white' : 'bg-white text-brand border-2 border-brand'}`}>
            {b.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button onClick={onResponsible} className="min-h-11 px-3 rounded-lg font-medium text-brand underline">Responsible by design</button>
        <p className="text-sm text-muted">{c.note}</p>
      </div>
    </div>
  )
}
