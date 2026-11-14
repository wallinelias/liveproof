import { Link } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { companies } from '../data/companies'

export default function CompanyHome() {
  const { companyId, setCompanyId, problems, submissions } = useApp()
  const mine = problems.filter((p) => p.companyId === companyId)
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Company dashboard</h1>
      <label className="block space-y-1">
        <span className="font-semibold">Demo company</span>
        <select value={companyId} onChange={(e) => setCompanyId(e.target.value)} className="w-full min-h-12 p-2 rounded-lg border-2 border-stone-700 bg-white">
          {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>
      <Link to="/company/new" className="block min-h-12 p-3 rounded-lg bg-stone-900 text-white font-semibold text-center">Post a problem</Link>
      <Link to="/company/matches" className="block min-h-12 p-3 rounded-lg bg-white border-2 border-stone-900 font-semibold text-center">Interest and contacts</Link>
      <h2 className="text-xl font-bold">Your problems</h2>
      {mine.length === 0 && <p>No problems yet. Post your first one.</p>}
      <ul className="space-y-3">
        {mine.map((p) => (
          <li key={p.id}>
            <Link to={`/company/problem/${p.id}`} className="block p-4 min-h-12 rounded-xl bg-white border-2 border-stone-300 hover:border-stone-900">
              <h3 className="font-bold">{p.title}</h3>
              <p className="text-sm">{submissions.filter((s) => s.problemId === p.id).length} submissions</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
