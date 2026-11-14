import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { copy } from '../data/copy'

export default function Solve() {
  const { id } = useParams()
  const nav = useNavigate()
  const { eventJoined, meId, submissions, setSubmissions, problems } = useApp()
  const p = problems.find((x) => x.id === id)
  const [left, setLeft] = useState((p?.timeBoxMin ?? 0) * 60)
  const [work, setWork] = useState('Step 1: What I notice\n\nStep 2: What I would do\n\nStep 3: How I would check it\n')

  useEffect(() => {
    if (left <= 0) return
    const t = setTimeout(() => setLeft((l) => l - 1), 1000)
    return () => clearTimeout(t)
  }, [left])

  if (!eventJoined) return <Navigate to="/talent" replace />
  if (!p) return <Navigate to="/talent/board" replace />
  const over = left <= 0
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')

  const submit = () => {
    const sid = `s-me-${submissions.length}`
    const alias = `Solver ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 90 + 10)}`
    const summary = `Worked on "${p.title}" and wrote up their steps in their own words. Shows ${p.skills.join(' and ').toLowerCase()}.`
    setSubmissions([...submissions, { id: sid, problemId: p.id, talentId: meId, alias, work, skills: p.skills, summary, summaryIsAiDraft: true }])
    nav(`/talent/submitted/${sid}`)
  }

  return (
    <div className="p-4 space-y-4">
      <Link to={`/talent/problem/${p.id}`} className="inline-flex items-center min-h-12 underline font-medium">Back to problem</Link>
      <h1 className="text-2xl font-bold">{p.title}</h1>
      <p className="p-3 rounded-lg bg-emerald-100 border border-emerald-800 font-semibold">{copy.banner}</p>
      {p.mode === 'pair' && <p className="p-3 rounded-lg bg-amber-100 border border-amber-700">The pair round arrives in M4. Solo problems work fully now.</p>}
      {p.mode === 'solo' && (
        <>
          <p className="text-3xl font-bold tabular-nums" role="timer" aria-label="Time left">{mm}:{ss}</p>
          {over && <p role="alert" className="p-3 rounded-lg bg-rose-100 border border-rose-800 font-semibold">Time is up. Your work is saved below. Please submit it now.</p>}
          <label htmlFor="work" className="block font-medium">Your answer (text or code)</label>
          <textarea id="work" value={work} readOnly={over} onChange={(e) => setWork(e.target.value)} rows={14} className="w-full p-3 rounded-lg border-2 border-stone-400 font-mono text-sm" />
          <button onClick={submit} className="w-full min-h-12 rounded-lg bg-stone-900 text-white font-bold">Submit my work</button>
        </>
      )}
    </div>
  )
}
