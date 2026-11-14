import { useApp } from '../state/AppContext'

const pct = (n: number, total: number) => (total === 0 ? '0%' : Math.round((n / total) * 100) + '%')

export default function Organiser() {
  const { problems, submissions, interests } = useApp()
  const total = problems.length
  const pair = problems.filter((p) => p.mode === 'pair').length
  const ai = problems.filter((p) => p.aiAllowed).length
  const intros = interests.filter((i) => i.status === 'revealed').length
  const stats = [
    { label: 'Problems posted', value: String(total) },
    { label: 'Submissions', value: String(submissions.length) },
    { label: 'Introductions made', value: String(intros) },
    { label: 'Pair problems', value: `${pct(pair, total)} (solo ${pct(total - pair, total)})` },
    { label: 'AI allowed', value: `${pct(ai, total)} (no AI ${pct(total - ai, total)})` },
  ]
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Event stats</h1>
      <p>Totals for the whole event. No individual people are shown here.</p>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="p-4 rounded-xl bg-white border-2 border-stone-300">
            <dt className="text-stone-700">{s.label}</dt>
            <dd className="text-2xl font-bold">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
