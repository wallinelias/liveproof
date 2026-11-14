import { Link } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { companies } from '../data/companies'
import { copy } from '../data/copy'

export default function TalentInbox() {
  const { meId, setMeId, interests, setInterests, submissions, talent, setTalent, problems } = useApp()
  const myIds = submissions.filter((s) => s.talentId === meId).map((s) => s.id)
  const mine = interests.filter((i) => myIds.includes(i.submissionId))
  const demoTalent = talent.filter((t) => t.id === 't-me' || submissions.some((s) => s.talentId === t.id))
  const setStatus = (id: string, status: 'sent' | 'revealed' | 'declined') => {
    const next = interests.map((i) => i.id === id ? { ...i, status } : i)
    setInterests(next)
    const anyRevealed = next.some((i) => myIds.includes(i.submissionId) && i.status === 'revealed')
    setTalent(talent.map((t) => t.id === meId ? { ...t, revealed: anyRevealed } : t))
  }
  return (
    <div className="p-4 space-y-4">
      <Link to="/talent/showcase" className="underline">My showcase</Link>
      <h1 className="text-2xl font-extrabold text-brand">Interest inbox</h1>
      <label className="block space-y-1">
        <span className="text-sm">Demo: view as</span>
        <select value={meId} onChange={(e) => setMeId(e.target.value)} className="w-full min-h-12 p-2 rounded-lg border-2 border-line-strong bg-white">
          {demoTalent.map((t) => <option key={t.id} value={t.id}>{t.id === 't-me' ? 'Me' : 'Demo talent ' + t.id}</option>)}
        </select>
      </label>
      <p>{copy.privacy.hidden}</p>
      {mine.length === 0 && <p>{copy.emptyStates.inbox}</p>}
      <ul className="space-y-3">
        {mine.map((i) => {
          const s = submissions.find((x) => x.id === i.submissionId)
          const prob = problems.find((x) => x.id === s?.problemId)
          const co = companies.find((c) => c.id === i.companyId)?.name
          return (
            <li key={i.id} className="p-4 rounded-xl bg-white border-2 border-line space-y-2">
              <h2 className="font-bold">A company is interested in your work</h2>
              <p className="text-sm">For: {prob?.title}</p>
              {i.status === 'sent' && (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button onClick={() => setStatus(i.id, 'revealed')} className="min-h-12 px-4 rounded-lg bg-emerald-700 text-white font-semibold">{copy.privacy.reveal}</button>
                  <button onClick={() => setStatus(i.id, 'declined')} className="min-h-12 px-4 rounded-lg bg-tint font-semibold">{copy.privacy.notNow}</button>
                </div>
              )}
              {i.status === 'revealed' && (
                <>
                  <p>{copy.privacy.revealed} ({co})</p>
                  {i.contactViewed
                    ? <p className="text-sm">The company has seen your contact.</p>
                    : <>
                        <p className="text-sm">{copy.privacy.reversible}</p>
                        <button onClick={() => setStatus(i.id, 'sent')} className="min-h-12 px-4 rounded-lg bg-tint font-semibold">Undo, not now</button>
                      </>}
                </>
              )}
              {i.status === 'declined' && (
                <>
                  <p>You said not now.</p>
                  <button onClick={() => setStatus(i.id, 'sent')} className="min-h-12 px-4 rounded-lg bg-tint font-semibold">Reconsider</button>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
