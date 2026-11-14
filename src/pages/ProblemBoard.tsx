import { Link, Navigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { companies } from '../data/companies'
import { copy } from '../data/copy'

const badge = 'inline-block px-2 py-1 rounded-full text-sm font-medium border border-stone-700'

export default function ProblemBoard() {
  const { eventJoined, problems } = useApp()
  if (!eventJoined) return <Navigate to="/talent" replace />
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Problem board</h1>
      <p>{copy.boardIntro}</p>
      <p className="p-3 rounded-lg bg-emerald-100 border border-emerald-800 font-semibold">{copy.banner}</p>
      {problems.length === 0 && <p>{copy.emptyStates.board}</p>}
      <ul className="space-y-3">
        {problems.map((p) => (
          <li key={p.id}>
            <Link to={`/talent/problem/${p.id}`} className="block p-4 min-h-12 rounded-xl bg-white border-2 border-stone-300 hover:border-stone-900 space-y-2">
              <p className="text-sm text-stone-700">{companies.find((c) => c.id === p.companyId)?.name}</p>
              <h2 className="text-lg font-bold">{p.title}</h2>
              <div className="flex flex-wrap gap-2">
                <span className={badge}>{p.timeBoxMin} min</span>
                <span className={`${badge} ${p.aiAllowed ? 'bg-sky-100' : 'bg-stone-100'}`}>{p.aiAllowed ? copy.aiBadge.allowed : copy.aiBadge.notAllowed}</span>
                <span className={badge}>{p.mode === 'solo' ? 'Solo' : 'Pair'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.skills.map((s) => <span key={s} className="px-2 py-1 rounded bg-amber-100 text-sm">{s}</span>)}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
