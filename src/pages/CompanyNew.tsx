import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { copy } from '../data/copy'

const field = 'w-full min-h-12 p-2 rounded-lg border-2 border-stone-700 bg-white'

export default function CompanyNew() {
  const { companyId, problems, setProblems } = useApp()
  const nav = useNavigate()
  const [need, setNeed] = useState('')
  const [drafted, setDrafted] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState('')
  const [timeBoxMin, setTime] = useState(20)
  const [aiAllowed, setAi] = useState(true)
  const [mode, setMode] = useState<'solo' | 'pair'>('solo')

  const help = () => {
    const d = copy.helpMeWrite.draftProblem
    setTitle(d.title); setDescription(d.description); setSkills(d.skills.join(', '))
    setTime(d.timeBoxMin); setAi(d.aiAllowed); setMode(d.mode as 'solo' | 'pair'); setDrafted(true)
  }
  const publish = () => {
    if (!title.trim() || !description.trim()) return
    setProblems([...problems, {
      id: 'p-new-' + (problems.length + 1), eventId: 'ev-espoo-talent-night', companyId,
      title: title.trim(), description: description.trim(), timeBoxMin, aiAllowed, mode,
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
    }])
    nav('/company')
  }
  return (
    <div className="p-4 space-y-4">
      <Link to="/company" className="underline">Back</Link>
      <h1 className="text-2xl font-bold">Post a problem</h1>
      <label className="block space-y-1">
        <span className="font-semibold">Describe your need in your own words</span>
        <textarea value={need} onChange={(e) => setNeed(e.target.value)} rows={3} placeholder={copy.helpMeWrite.need} className={field} />
      </label>
      <button onClick={help} className="min-h-12 px-4 rounded-lg bg-sky-800 text-white font-semibold">Help me write it</button>
      {drafted && (
        <p className="p-3 rounded-lg bg-sky-100 border border-sky-800">
          <span className="font-bold">{copy.aiDraft.label}.</span> {copy.aiDraft.editHint}
        </p>
      )}
      <label className="block space-y-1"><span className="font-semibold">Title</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={field} /></label>
      <label className="block space-y-1"><span className="font-semibold">Problem</span>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className={field} /></label>
      <label className="block space-y-1"><span className="font-semibold">Skills (comma separated)</span>
        <input value={skills} onChange={(e) => setSkills(e.target.value)} className={field} /></label>
      <label className="block space-y-1"><span className="font-semibold">Time box (minutes)</span>
        <input type="number" min={5} max={120} value={timeBoxMin} onChange={(e) => setTime(Number(e.target.value))} className={field} /></label>
      <label className="flex items-center gap-3 min-h-12 font-semibold">
        <input type="checkbox" checked={aiAllowed} onChange={(e) => setAi(e.target.checked)} className="w-6 h-6" /> AI allowed
      </label>
      <label className="block space-y-1"><span className="font-semibold">Solo or pair</span>
        <select value={mode} onChange={(e) => setMode(e.target.value as 'solo' | 'pair')} className={field}>
          <option value="solo">Solo</option><option value="pair">Pair</option>
        </select></label>
      <button onClick={publish} disabled={!title.trim() || !description.trim()} className="w-full min-h-12 rounded-lg bg-stone-900 text-white font-semibold disabled:opacity-40">Publish</button>
    </div>
  )
}
