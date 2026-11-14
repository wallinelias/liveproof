import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { shuffle } from '../lib'
import { copy } from '../data/copy'

export default function CompanyProblem() {
  const { id } = useParams()
  const { companyId, problems, submissions, endorsements, asks, setAsks, interests, setInterests } = useApp()
  const [reply, setReply] = useState('')
  const p = problems.find((x) => x.id === id)
  const subs = submissions.filter((s) => s.problemId === id).map((s) => s.id)
  // Shuffle once per view mount; never sorted.
  const order = useMemo(() => shuffle(subs), []) // eslint-disable-line react-hooks/exhaustive-deps
  if (!p) return <div className="p-4"><Link to="/company" className="underline">Back</Link><p>Problem not found</p></div>
  const thread = asks.filter((a) => a.problemId === p.id)
  const send = () => {
    const t = reply.trim()
    if (!t) return
    setAsks([...asks, { id: 'a-c-' + asks.length, problemId: p.id, from: 'company', text: t, at: new Date().toISOString() }])
    setReply('')
  }
  const interested = (sid: string) =>
    setInterests([...interests, { id: 'i-' + interests.length, submissionId: sid, companyId, status: 'sent' }])

  return (
    <div className="p-4 space-y-4">
      <Link to="/company" className="underline">Back</Link>
      <h1 className="text-2xl font-extrabold text-brand">{p.title}</h1>
      <h2 className="text-xl font-bold">Blind submissions (random order)</h2>
      {order.length === 0 && <p>{copy.emptyStates.submissions}</p>}
      <ul className="space-y-3">
        {order.map((sid) => {
          const s = submissions.find((x) => x.id === sid)!
          const ends = endorsements.filter((e) => e.submissionId === s.id)
          const sent = interests.some((i) => i.submissionId === s.id && i.companyId === companyId)
          return (
            <li key={s.id} className="p-4 rounded-xl bg-white border-2 border-line space-y-2">
              <h3 className="font-bold text-lg">{s.alias}</h3>
              <p>{s.work}</p>
              <div className="flex flex-wrap gap-2">
                {s.skills.map((k) => <span key={k} className="px-2 py-1 rounded bg-tint text-brand font-medium text-sm">{k}</span>)}
              </div>
              {s.note && <p className="text-sm p-2 rounded bg-mist"><span className="font-medium">{copy.note.writtenBy}:</span> {s.note}</p>}
              {ends.length > 0 && (
                <ul className="text-sm space-y-1">
                  {ends.map((e) => <li key={e.id}>Endorsed by a peer for {e.skill}{e.note ? `: ${e.note}` : ''}</li>)}
                </ul>
              )}
              <button onClick={() => interested(s.id)} disabled={sent} className="w-full min-h-12 rounded-lg bg-emerald-700 text-white font-semibold disabled:opacity-50">
                {sent ? 'Interest sent' : "I'm interested"}
              </button>
            </li>
          )
        })}
      </ul>
      <h2 className="text-xl font-bold">Questions from solvers</h2>
      {thread.length === 0 && <p>{copy.emptyStates.asks}</p>}
      <ul className="space-y-2">
        {thread.map((a) => (
          <li key={a.id} className={`p-3 rounded-lg ${a.from === 'company' ? 'bg-tint' : 'bg-mist'}`}>
            <span className="font-semibold">{a.from === 'company' ? 'You' : 'A solver'}: </span>{a.text}
          </li>
        ))}
      </ul>
      <label className="block space-y-1"><span className="font-semibold">Reply</span>
        <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={2} className="w-full p-2 rounded-lg border-2 border-line-strong bg-white" /></label>
      <button onClick={send} className="min-h-12 px-4 rounded-lg bg-brand text-white font-semibold">Send reply</button>
    </div>
  )
}
