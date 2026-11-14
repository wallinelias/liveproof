import { Link } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import RevealedContact from '../components/RevealedContact'

const note = (alias: string) =>
  `Hi, thank you for your work on the problem. We would like a short call this week to talk about it. Pick any time that suits you. (Re: ${alias})`

export default function CompanyMatches() {
  const { companyId, interests, setInterests, submissions, talent } = useApp()
  const mine = interests.filter((i) => i.companyId === companyId)
  return (
    <div className="p-4 space-y-4">
      <Link to="/company" className="underline">Back</Link>
      <h1 className="text-2xl font-bold">Interest and contacts</h1>
      {mine.length === 0 && <p>No interest sent yet. Open a problem and tap "I'm interested".</p>}
      <ul className="space-y-3">
        {mine.map((i) => {
          const s = submissions.find((x) => x.id === i.submissionId)
          const t = talent.find((x) => x.id === s?.talentId)
          return (
            <li key={i.id} className="p-4 rounded-xl bg-white border-2 border-stone-300 space-y-2">
              <h2 className="font-bold">{s?.alias}</h2>
              {i.status === 'sent' && <p>Waiting for the solver to decide. Their name stays hidden until they choose.</p>}
              {i.status === 'declined' && <p>The solver chose not now.</p>}
              {i.status === 'revealed' && (
                <>
                  <RevealedContact talent={t} interest={i} onShow={() => setInterests(interests.map((x) => x.id === i.id ? { ...x, contactViewed: true } : x))} />
                  {i.contactViewed && (
                    <div className="p-3 rounded-lg bg-stone-100 space-y-1">
                      <p className="font-semibold">Follow-up note (edit before sending)</p>
                      <textarea defaultValue={i.followUpNote ?? note(s?.alias ?? '')} rows={4} className="w-full p-2 rounded-lg border-2 border-stone-700 bg-white" />
                    </div>
                  )}
                </>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
