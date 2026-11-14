import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { copy } from '../data/copy'

export default function Submitted() {
  const { sid } = useParams()
  const nav = useNavigate()
  const { submissions, setSubmissions, endorsements, setEndorsements, meId, problems } = useApp()
  const [skill, setSkill] = useState('')
  const [note, setNote] = useState('')
  const [endDone, setEndDone] = useState(false)
  const s = submissions.find((x) => x.id === sid)
  const [summary, setSummary] = useState(s?.summary ?? '')
  if (!s) return <Navigate to="/talent/board" replace />
  const skillOptions = problems.find((p) => p.id === s.problemId)?.skills ?? s.skills
  const endorse = () => {
    if (!skill) return
    setEndorsements([...endorsements, { id: `e-${Date.now()}`, fromTalentId: meId, toTalentId: 't-partner-mika', submissionId: s.id + '-partner', skill, note: note.trim() || undefined }])
    setEndDone(true)
  }
  const add = () => {
    const edited = summary !== s.summary
    setSubmissions(submissions.map((x) => x.id === s.id ? { ...x, summary, summaryIsAiDraft: x.summaryIsAiDraft && !edited } : x))
    nav('/talent/showcase')
  }
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Work submitted</h1>
      <p>{copy.privacy.hidden}</p>
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Your skills summary</h2>
        {s.summaryIsAiDraft && <span className="px-2 py-1 rounded-full text-sm font-medium bg-violet-100 border border-violet-800">{copy.aiDraft.label}</span>}
      </div>
      <p className="text-sm">{copy.aiDraft.editHint}</p>
      <label htmlFor="sum" className="block font-medium">Summary</label>
      <textarea id="sum" value={summary} onChange={(e) => setSummary(e.target.value)} rows={5} className="w-full p-3 rounded-lg border-2 border-stone-400" />
      <div className="flex flex-wrap gap-2">{s.skills.map((k) => <span key={k} className="px-2 py-1 rounded bg-amber-100 text-sm">{k}</span>)}</div>
      {s.partnerTalentId && (
        <section className="p-4 rounded-xl bg-white border-2 border-stone-300 space-y-2">
          <h2 className="text-xl font-bold">Endorse your partner (optional)</h2>
          {endDone ? <p>Thanks, your endorsement was saved.</p> : (
            <>
              <p className="text-sm">Pick one skill and write one line. You can skip this.</p>
              <label htmlFor="eskill" className="block font-medium">Skill</label>
              <select id="eskill" value={skill} onChange={(e) => setSkill(e.target.value)} className="w-full min-h-12 p-2 rounded-lg border-2 border-stone-400 bg-white">
                <option value="">Choose a skill</option>
                {skillOptions.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
              <label htmlFor="enote" className="block font-medium">One line</label>
              <input id="enote" maxLength={120} value={note} onChange={(e) => setNote(e.target.value)} className="w-full min-h-12 px-3 rounded-lg border-2 border-stone-400" />
              <div className="flex gap-2">
                <button onClick={endorse} disabled={!skill} className="min-h-12 px-4 rounded-lg bg-emerald-700 text-white font-semibold disabled:opacity-50">Send endorsement</button>
                <button onClick={() => setEndDone(true)} className="min-h-12 px-4 rounded-lg bg-stone-200 font-semibold">Skip</button>
              </div>
            </>
          )}
        </section>
      )}
      <button onClick={add} className="w-full min-h-12 rounded-lg bg-stone-900 text-white font-bold">Add to my showcase</button>
      <Link to="/talent/board" className="inline-flex items-center min-h-12 underline font-medium">Back to board</Link>
    </div>
  )
}
