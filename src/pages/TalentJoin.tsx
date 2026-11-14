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
      <div className="rounded-2xl bg-brand text-white p-6 space-y-2">
        <h1 className="text-3xl font-extrabold">Join the event</h1>
        <p className="text-lg text-white/90">Show what you can do. Companies see your work first, never your name. Enter the event code to see today's problems. Your name stays hidden.</p>
      </div>
      <label htmlFor="code" className="block font-semibold">Event code</label>
      <input
        id="code" value={code} onChange={(e) => setCode(e.target.value)}
        autoComplete="off" autoCapitalize="characters" placeholder="ESPOO-TALENT-NIGHT"
        aria-invalid={!!error} aria-describedby={error ? 'code-err' : undefined}
        className="w-full min-h-12 px-3 text-xl text-center tracking-wide rounded-xl border-2 border-line-strong bg-white"
      />
      {error && <p id="code-err" role="alert" className="text-red-800 font-medium">{error}</p>}
      <button type="submit" className="w-full min-h-14 rounded-xl bg-brand hover:bg-brand-dark text-white text-lg font-semibold">Join</button>
    </form>
  )
}
