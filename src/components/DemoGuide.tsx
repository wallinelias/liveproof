import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { copy } from '../data/copy'

export default function DemoGuide() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const { guideHidden, setGuideHidden, setRole, setPrefillCode, problems, companyId } = useApp()
  if (guideHidden || pathname === '/') return null
  const g = copy.guide
  const is = (p: string) => !!matchPath(p, pathname)
  const firstId = problems[0]?.id
  const myFirst = problems.find((p) => p.companyId === companyId)?.id ?? firstId
  const go = (role: 'talent' | 'company' | 'organiser' | null, to: string) => () => { if (role) setRole(role); nav(to) }

  let step: { text: string; button?: string; act?: () => void } | null = null
  if (is('/talent')) step = { ...g.join, act: () => setPrefillCode('ESPOO-TALENT-NIGHT') }
  else if (is('/talent/board')) step = { ...g.board, act: go(null, `/talent/problem/${firstId}`) }
  else if (is('/talent/problem/:id')) step = { ...g.detail, act: go(null, pathname + '/solve') }
  else if (is('/talent/problem/:id/solve')) step = g.solve
  else if (is('/talent/submitted/:sid')) step = { ...g.submitted, act: go(null, '/talent/showcase') }
  else if (is('/talent/showcase')) step = { ...g.showcase, act: go('company', '/company') }
  else if (is('/talent/inbox')) step = { ...g.inbox, act: go('organiser', '/organiser') }
  else if (is('/company')) step = { ...g.company, act: go(null, `/company/problem/${myFirst}`) }
  else if (is('/company/new')) step = { ...g.companyNew, act: go(null, '/company') }
  else if (is('/company/problem/:id')) step = { ...g.companyProblem, act: go(null, '/company/matches') }
  else if (is('/company/matches')) step = { ...g.matches, act: go('talent', '/talent/inbox') }
  else if (is('/organiser')) step = { ...g.organiser, act: go(null, '/') }
  if (!step) return null

  return (
    <aside aria-label={g.label} className="mx-auto max-w-3xl flex items-center gap-2 pl-3 pr-1 py-1 bg-tint border-b border-line text-sm text-brand">
      <p className="flex-1 min-w-0"><strong>{g.label}.</strong> {step.text}</p>
      {step.button && step.act && (
        <button onClick={step.act} className="shrink-0 min-h-11 px-3 rounded-lg bg-brand text-white font-semibold">{step.button}</button>
      )}
      <button onClick={() => setGuideHidden(true)} aria-label={g.dismiss} className="shrink-0 min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" /></svg>
      </button>
    </aside>
  )
}
