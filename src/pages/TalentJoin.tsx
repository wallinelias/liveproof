import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { events } from '../data/events'

export default function TalentJoin() {
  const { setEventJoined } = useApp()
  const nav = useNavigate()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    const ok = events.some((ev) => ev.code.toLowerCase() === code.trim().toLowerCase())
    if (ok) { setError(''); setEventJoined(true); nav('/talent/board') }
    else setError('That code did not work. Check the code on the event screen and try again.')
  }

  return (
    <form onSubmit={submit} className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Join the event</h1>
      <p className="text-lg">Enter the event code to see today's problems. Your name stays hidden.</p>
      <label htmlFor="code" className="block font-semibold">Event code</label>
      <input
        id="code" value={code} onChange={(e) => setCode(e.target.value)}
        autoComplete="off" autoCapitalize="characters" placeholder="ESPOO-TALENT-NIGHT"
        aria-invalid={!!error} aria-describedby={error ? 'code-err' : undefined}
        className="w-full min-h-12 px-3 text-lg rounded-lg border-2 border-stone-700 bg-white"
      />
      {error && <p id="code-err" role="alert" className="text-red-800 font-medium">{error}</p>}
      <button type="submit" className="w-full min-h-12 rounded-lg bg-stone-900 text-white text-lg font-semibold">Join</button>
    </form>
  )
}
