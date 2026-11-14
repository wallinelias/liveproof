import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { copy } from '../data/copy'

const PARTNER_ID = 't-partner-mika'
const partnerName = 'Mika'
const replies = [
  'Hi, I am Mika. I will read the problem again and tell you what I notice.',
  'I think the slowest step is the first one. What do you think?',
  'Good idea. Can you write that into the shared box? I will check it.',
  'Looks clear to me. Maybe add how we would check the change.',
]

export default function Solve() {
  const { id } = useParams()
  const nav = useNavigate()
  const { eventJoined, meId, submissions, setSubmissions, problems, endorsements, setEndorsements } = useApp()
  const [chat, setChat] = useState<{ me: boolean; text: string }[]>([])
  const [msg, setMsg] = useState('')
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

  const send = () => {
    const t = msg.trim()
    if (!t) return
    const n = chat.filter((c) => !c.me).length
    setChat([...chat, { me: true, text: t }, ...(n < replies.length ? [{ me: false, text: replies[n] }] : [])])
    setMsg('')
  }

  const submit = () => {
    const sid = `s-me-${submissions.length}`
    const used = new Set(submissions.map((x) => x.alias))
    let alias = ''
    do alias = `Solver ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 90 + 10)}`
    while (used.has(alias))
    const summary = `Worked on "${p.title}" and wrote up their steps in their own words. Shows ${p.skills.join(' and ').toLowerCase()}.`
    const pair = p.mode === 'pair'
    setSubmissions([...submissions, { id: sid, problemId: p.id, talentId: meId, alias, work, skills: p.skills, summary, summaryIsAiDraft: true, ...(pair ? { partnerTalentId: PARTNER_ID } : {}) }])
    if (pair) setEndorsements([...endorsements, { id: `e-p-${sid}`, fromTalentId: PARTNER_ID, toTalentId: meId, submissionId: sid, skill: p.skills[0], note: 'Easy to think out loud with.' }])
    nav(`/talent/submitted/${sid}`)
  }

  return (
    <div className="p-4 space-y-4">
      <Link to={`/talent/problem/${p.id}`} className="inline-flex items-center min-h-12 underline font-medium">Back to problem</Link>
      <h1 className="text-2xl font-bold">{p.title}</h1>
      <p className="p-3 rounded-lg bg-emerald-100 border border-emerald-800 font-semibold">{copy.banner}</p>
      <p className="text-3xl font-bold tabular-nums" role="timer" aria-label="Time left">{mm}:{ss}</p>
      {over && <p role="alert" className="p-3 rounded-lg bg-rose-100 border border-rose-800 font-semibold">Time is up. Your work is saved below. Please submit it now.</p>}
      {p.mode === 'pair' && <p className="p-3 rounded-lg bg-sky-100 border border-sky-800">Pair round with {partnerName}, a practice partner. You share one work box.</p>}
      <label htmlFor="work" className="block font-medium">{p.mode === 'pair' ? 'Shared work box (text or code)' : 'Your answer (text or code)'}</label>
      <textarea id="work" value={work} readOnly={over} onChange={(e) => setWork(e.target.value)} rows={14} className="w-full p-3 rounded-lg border-2 border-stone-400 font-mono text-sm" />
      {p.mode === 'pair' && (
        <section aria-label="Chat with partner" className="space-y-2">
          <h2 className="font-bold">Chat with {partnerName}</h2>
          <ul className="space-y-2" aria-live="polite">
            {chat.map((c, i) => <li key={i} className={`p-2 rounded-lg max-w-[85%] ${c.me ? 'ml-auto bg-stone-200' : 'bg-white border border-stone-300'}`}><span className="block text-xs">{c.me ? 'You' : partnerName}</span>{c.text}</li>)}
          </ul>
          <label htmlFor="msg" className="block font-medium">Message</label>
          <div className="flex gap-2">
            <input id="msg" value={msg} onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} className="flex-1 min-h-12 px-3 rounded-lg border-2 border-stone-400" />
            <button onClick={send} className="min-h-12 px-4 rounded-lg bg-stone-200 font-semibold">Send</button>
          </div>
        </section>
      )}
      <button onClick={submit} className="w-full min-h-12 rounded-lg bg-stone-900 text-white font-bold">Submit my work</button>
    </div>
  )
}
