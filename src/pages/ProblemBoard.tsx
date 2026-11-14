import { Link, Navigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { companies } from '../data/companies'
import { copy } from '../data/copy'

const badge = 'inline-block px-3 py-1 rounded-full text-sm font-semibold border'

export default function ProblemBoard() {
  const { eventJoined, problems } = useApp()
  if (!eventJoined) return <Navigate to="/talent" replace />
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-extrabold text-brand">Problem board</h1>
      <p>{copy.boardIntro}</p>
      <p className="p-3 rounded-lg bg-emerald-100 border border-emerald-800 font-semibold">{copy.banner}</p>
      {problems.length === 0 && <p>{copy.emptyStates.board}</p>}
      <ul className="space-y-3">
        {problems.map((p) => (
          <li key={p.id}>
            <Link to={`/talent/problem/${p.id}`} className="block p-4 min-h-12 rounded-2xl bg-white border border-line shadow-sm hover:border-brand hover:shadow space-y-2">
              <p className="text-sm text-muted">{companies.find((c) => c.id === p.companyId)?.name}</p>
              <h2 className="text-lg font-bold">{p.title}</h2>
              <div className="flex flex-wrap gap-2">
                <span className={`${badge} border-line text-ink`}>{p.timeBoxMin} min</span>
                <span className={`${badge} ${p.aiAllowed ? 'bg-brand text-white border-brand' : 'bg-accent-soft text-accent-ink border-accent'}`}>{p.aiAllowed ? copy.aiBadge.allowed : copy.aiBadge.notAllowed}</span>
                <span className={`${badge} border-line text-ink`}>{p.mode === 'solo' ? 'Solo' : 'Pair'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.skills.map((s) => <span key={s} className="px-2.5 py-1 rounded-md bg-tint text-brand font-medium text-sm">{s}</span>)}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
