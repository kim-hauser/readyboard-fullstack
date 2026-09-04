import { Link, useParams, useLocation } from 'react-router-dom'
import mockChanges from '../data/mockChanges'
import ButtonLink from '../components/ButtonLink'

function ChangeDetail() {
  const { id } = useParams()

  const location = useLocation()
  const fromView = location.state?.fromView || 'status' 

  const change = mockChanges.find(
    (c) => c.id.toString() === id
  )

  /* Checks for valid changes; gives error page if invalid ID */
  /* Also contains both variants of ButtonLink component as props */

  if (!change) {
    return (
      <div className="page">
        <section className="card">
          <h1>Change Not Found</h1>
          <p>
            We couldn’t find a change request with Change Number: <strong>{id}</strong>
          </p>
          <ButtonLink 
            to="/dashboard"
            state={{ restoreView: fromView }} 
            variant = "primary">
            ← Back to Dashboard
          </ButtonLink>
        </section>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="card">
        <h1>{change.title}</h1>
        <p><strong>ID:</strong> {change.id}</p>
        <p><strong>Owner:</strong> {change.owner}</p>
        <p><strong>Assignment Group:</strong> {change.assignmentGroup}</p>
        <p><strong>Status:</strong> {change.status}</p>
        <p><strong>Risk:</strong> {change.risk}</p>
        <p><strong>Description:</strong> {change.description}</p>
        <ButtonLink 
          to="/dashboard"
          state={{ restoreView: fromView }}
          variant = "secondary"
          >
          ← Back to {fromView === 'assignment' ? 'Assignment Group View' : 'Status View'}
        </ButtonLink>
      </section>
    </div>
  )
}

export default ChangeDetail