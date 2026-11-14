import { Link, Navigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { copy } from '../data/copy'

export default function Showcase() {
  const { eventJoined, meId, submissions, setSubmissions, problems, endorsements, talent } = useApp()
  if (!eventJoined) return <Navigate to="/talent" replace />
  const mine = submissions.filter((s) => s.talentId === meId)
  const me = talent.find((t) => t.id === meId)
  const revealed = !!me?.revealed
  const received = endorsements.filter((e) => e.toTalentId === meId)
  const edit = (id: string, note: string) =>
    setSubmissions(submissions.map((x) => x.id === id ? { ...x, note } : x))
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-extrabold text-brand">My showcase</h1>
      <section className="p-4 rounded-xl bg-white border-2 border-line space-y-1">
        <h2 className="font-bold">Privacy: {revealed ? 'Revealed' : 'Hidden'}</h2>
        <p>{revealed ? copy.privacy.revealed : copy.privacy.hidden}</p>
        {!revealed && <p className="text-sm">{copy.privacy.reversible}</p>}
      </section>
      <h2 className="text-xl font-bold">Solved problems</h2>
      {mine.length === 0 && <p>{copy.emptyStates.showcase}</p>}
      <ul className="space-y-3">
        {mine.map((s) => (
          <li key={s.id} className="p-4 rounded-xl bg-white border-2 border-line space-y-2">
            <h3 className="font-bold">{problems.find((p) => p.id === s.problemId)?.title}</h3>
            <label htmlFor={`sum-${s.id}`} className="block font-medium">{copy.note.label}</label>
            <textarea id={`sum-${s.id}`} value={s.note} maxLength={280} onChange={(e) => edit(s.id, e.target.value)} rows={3} className="w-full p-3 rounded-lg border-2 border-line-strong" />
            <div className="flex flex-wrap gap-2">{s.skills.map((k) => <span key={k} className="px-2 py-1 rounded bg-tint text-brand font-medium text-sm">{k}</span>)}</div>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold">Endorsements received</h2>
      {received.length === 0 ? <p>No endorsements yet. They are optional.</p> : (
        <ul className="space-y-2">
          {received.map((e) => <li key={e.id} className="p-3 rounded-lg bg-white border border-line"><span className="px-2 py-1 rounded bg-tint text-brand font-medium text-sm">{e.skill}</span> {e.note}</li>)}
        </ul>
      )}
      <Link to="/talent/board" className="inline-flex items-center min-h-12 underline font-medium">Back to board</Link>
    </div>
  )
}
