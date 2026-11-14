import { Link, Navigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { problems } from '../data/problems'
import { copy } from '../data/copy'

export default function ShowcaseStub() {
  const { eventJoined, meId, submissions } = useApp()
  if (!eventJoined) return <Navigate to="/talent" replace />
  const mine = submissions.filter((s) => s.talentId === meId)
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">My showcase</h1>
      {mine.length === 0 && <p>{copy.emptyStates.showcase}</p>}
      <ul className="space-y-3">
        {mine.map((s) => (
          <li key={s.id} className="p-4 rounded-xl bg-white border-2 border-stone-300 space-y-2">
            <h2 className="font-bold">{problems.find((p) => p.id === s.problemId)?.title}</h2>
            <p>{s.summary}</p>
            {s.summaryIsAiDraft && <span className="px-2 py-1 rounded-full text-sm bg-violet-100 border border-violet-800">{copy.aiDraft.label}</span>}
          </li>
        ))}
      </ul>
      <Link to="/talent/board" className="inline-flex items-center min-h-12 underline font-medium">Back to board</Link>
    </div>
  )
}
