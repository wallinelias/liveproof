import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { copy } from '../data/copy'

export default function Submitted() {
  const { sid } = useParams()
  const nav = useNavigate()
  const { submissions, setSubmissions } = useApp()
  const s = submissions.find((x) => x.id === sid)
  const [summary, setSummary] = useState(s?.summary ?? '')
  if (!s) return <Navigate to="/talent/board" replace />
  const add = () => {
    const edited = summary !== s.summary
    setSubmissions(submissions.map((x) => x.id === s.id ? { ...x, summary, summaryIsAiDraft: x.summaryIsAiDraft && !edited } : x))
    nav('/talent/showcase')
  }
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-extrabold text-brand">Work submitted</h1>
      <p>{copy.privacy.hidden}</p>
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Your skills summary</h2>
        {s.summaryIsAiDraft && <span className="px-2 py-1 rounded-full text-sm font-medium bg-accent-soft text-accent-ink border border-accent">{copy.aiDraft.label}</span>}
      </div>
      <p className="text-sm">{copy.aiDraft.editHint}</p>
      <label htmlFor="sum" className="block font-medium">Summary</label>
      <textarea id="sum" value={summary} onChange={(e) => setSummary(e.target.value)} rows={5} className="w-full p-3 rounded-lg border-2 border-line-strong" />
      <div className="flex flex-wrap gap-2">{s.skills.map((k) => <span key={k} className="px-2 py-1 rounded bg-tint text-brand font-medium text-sm">{k}</span>)}</div>
      {s.partnerTalentId && <p className="text-sm">Thanks for pairing up. Your partner's note about your work already shows on your submission.</p>}
      <button onClick={add} className="w-full min-h-12 rounded-lg bg-brand text-white font-bold">Add to my showcase</button>
      <Link to="/talent/board" className="inline-flex items-center min-h-12 underline font-medium">Back to board</Link>
    </div>
  )
}
