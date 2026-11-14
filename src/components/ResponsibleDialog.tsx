import { useEffect, useRef } from 'react'
import { copy } from '../data/copy'

export default function ResponsibleDialog({ onClose }: { onClose: () => void }) {
  const btn = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    btn.current?.focus()
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-20 bg-black/60 flex items-end sm:items-center justify-center p-2" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="resp-title" className="w-full max-w-md max-h-full overflow-auto bg-white rounded-xl border-2 border-stone-900 p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
        <h2 id="resp-title" className="text-xl font-bold">{copy.responsible.title}</h2>
        <ul className="list-disc pl-5 space-y-2">
          {copy.responsible.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <button ref={btn} onClick={onClose} className="min-h-12 w-full rounded-lg bg-stone-900 text-white font-medium">Close</button>
      </div>
    </div>
  )
}
