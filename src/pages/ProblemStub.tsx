import { Link, useParams } from 'react-router-dom'
import { problems } from '../data/problems'

export default function ProblemStub() {
  const { id } = useParams()
  const p = problems.find((x) => x.id === id)
  return (
    <div className="p-4 space-y-4">
      <Link to="/talent/board" className="inline-flex items-center min-h-12 underline font-medium">Back to board</Link>
      <h1 className="text-2xl font-bold">{p ? p.title : 'Problem not found'}</h1>
      <p>Full problem detail coming soon.</p>
    </div>
  )
}
