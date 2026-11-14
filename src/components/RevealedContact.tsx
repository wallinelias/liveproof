import type { Interest, Talent } from '../types'

// The only place a name and contact are rendered. Needs talent.revealed and a revealed interest.
export default function RevealedContact({ talent, interest, onShow }: { talent?: Talent; interest: Interest; onShow: () => void }) {
  if (!talent || !talent.revealed || interest.status !== 'revealed') return null
  if (!interest.contactViewed) {
    return (
      <button onClick={onShow} className="min-h-12 px-4 rounded-lg bg-emerald-700 text-white font-semibold">
        Show contact card
      </button>
    )
  }
  return (
    <div className="p-3 rounded-lg bg-emerald-100 border-2 border-emerald-800 space-y-1">
      <p className="font-bold">{talent.firstName} chose to share their contact</p>
      <p>{talent.contact}</p>
    </div>
  )
}
