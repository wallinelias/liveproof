import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { problems } from '../data/problems'
import { companies } from '../data/companies'
import { copy } from '../data/copy'

const badge = 'inline-block px-2 py-1 rounded-full text-sm font-medium border border-stone-700'
const replies = [
  'Thanks for asking. Use your best judgement and note any assumption you make in your answer.',
  'Good question. The sample on the board is all you need, and a short written plan is fine.',
  'Either approach works for us. We care more about how you explain your choice.',
]

export default function ProblemDetail() {
  const { id } = useParams()
  const { eventJoined, meId, asks, setAsks } = useApp()
  const [text, setText] = useState('')
  const p = problems.find((x) => x.id === id)
  if (!eventJoined) return <Navigate to="/talent" replace />
  if (!p) return <div className="p-4"><Link to="/talent/board" className="underline">Back to board</Link><p>Problem not found</p></div>
  const company = companies.find((c) => c.id === p.companyId)?.name
  const thread = asks.filter((a) => a.problemId === p.id)

  const send = () => {
    const t = text.trim()
    if (!t) return
    const now = new Date().toISOString()
    const n = asks.length
    setAsks([
      ...asks,
      { id: `a-new-${n}`, problemId: p.id, from: 'talent', talentId: meId, text: t, at: now },
      { id: `a-new-${n}-r`, problemId: p.id, from: 'company', text: replies[n % replies.length], at: now },
    ])
    setText('')
  }

  return (
    <div className="p-4 space-y-4">
      <Link to="/talent/board" className="inline-flex items-center min-h-12 underline font-medium">Back to board</Link>
      <p className="text-sm text-stone-700">{company}</p>
      <h1 className="text-2xl font-bold">{p.title}</h1>
      <div className="flex flex-wrap gap-2">
        <span className={badge}>{p.timeBoxMin} min</span>
        <span className={`${badge} ${p.aiAllowed ? 'bg-sky-100' : 'bg-stone-100'}`}>{p.aiAllowed ? copy.aiBadge.allowed : copy.aiBadge.notAllowed}</span>
        <span className={badge}>{p.mode === 'solo' ? 'Solo' : 'Pair'}</span>
      </div>
      <p>{p.description}</p>
      <div className="flex flex-wrap gap-2">
        {p.skills.map((s) => <span key={s} className="px-2 py-1 rounded bg-amber-100 text-sm">{s}</span>)}
      </div>
      <Link to={`/talent/problem/${p.id}/solve`} className="flex items-center justify-center min-h-12 rounded-lg bg-stone-900 text-white font-bold">Start solving</Link>

      <section aria-labelledby="ask-h" className="space-y-3">
        <h2 id="ask-h" className="text-xl font-bold">Ask the company</h2>
        {thread.length === 0 && <p>{copy.emptyStates.asks}</p>}
        <ul className="space-y-2">
          {thread.map((a) => (
            <li key={a.id} className={`p-3 rounded-lg border ${a.from === 'company' ? 'bg-white border-stone-400' : 'bg-sky-50 border-sky-300'}`}>
              <p className="text-sm font-semibold">{a.from === 'company' ? `From the company (${company})` : 'A talent asked'}</p>
              <p>{a.text}</p>
            </li>
          ))}
        </ul>
        <label htmlFor="q" className="block font-medium">Your question</label>
        <textarea id="q" value={text} onChange={(e) => setText(e.target.value)} rows={3} className="w-full p-3 rounded-lg border-2 border-stone-400" />
        <button onClick={send} className="min-h-12 px-4 rounded-lg bg-stone-900 text-white font-medium">Send question</button>
      </section>
    </div>
  )
}
