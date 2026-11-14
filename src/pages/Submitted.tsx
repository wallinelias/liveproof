import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { copy } from '../data/copy'

export default function Submitted() {
  const { sid } = useParams()
  const nav = useNavigate()
  const { submissions, setSubmissions } = useApp()
  const s = submissions.find((x) => x.id === sid)
  const [note, setNote] = useState(s?.note ?? '')
  const [nudge, setNudge] = useState(false)
  if (!s) return <Navigate to="/talent/board" replace />
  const add = () => {
    setSubmissions(submissions.map((x) => x.id === s.id ? { ...x, note: note.trim() } : x))
    nav('/talent/showcase')
  }
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-extrabold text-brand">Work submitted</h1>
      <p>{copy.privacy.hidden}</p>
      <label htmlFor="note" className="block text-xl font-bold">{copy.note.label}</label>
      <p className="text-sm">{copy.note.optional}</p>
      <textarea id="note" value={note} maxLength={280} onChange={(e) => setNote(e.target.value)} rows={4} className="w-full p-3 rounded-lg border-2 border-line-strong" />
      <p className="text-sm">{note.length}/280</p>
      <button type="button" onClick={() => setNudge(!nudge)} aria-expanded={nudge} className="min-h-12 underline font-medium">{copy.note.nudge}</button>
      {nudge && <ul className="list-disc pl-6 space-y-1">{copy.note.starters.map((x) => <li key={x}>{x}</li>)}</ul>}
      <div className="flex flex-wrap gap-2">{s.skills.map((k) => <span key={k} className="px-2 py-1 rounded bg-tint text-brand font-medium text-sm">{k}</span>)}</div>
      {s.partnerTalentId && <p className="text-sm">Thanks for pairing up. Your partner's note about your work already shows on your submission.</p>}
      <button onClick={add} className="w-full min-h-12 rounded-lg bg-brand text-white font-bold">Add to my showcase</button>
      <Link to="/talent/board" className="inline-flex items-center min-h-12 underline font-medium">Back to board</Link>
    </div>
  )
}
