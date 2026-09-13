import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getChangeById, deleteChange } from '../services/changeService'
import ButtonLink from '../components/ButtonLink'

function ChangeDetail() {
  const { id } = useParams()

  const location = useLocation()
  const fromView = location.state?.fromView || 'status'
  const navigate = useNavigate()

  /* Replaces Mock Changes with actual state + fetch */

  const [change, setChange] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  getChangeById(id)
    .then(setChange)
    .catch((error) => {
      console.error('Error fetching change:', error)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [id])

  if (loading) {
  return (
    <div className="page">
      <section className="card">
        <p>Loading change...</p>
      </section>
    </div>
  )
}

 //Confirmation Window for Delete:
  
  async function handleDelete() {
  const confirmed = window.confirm(
    `Delete change ${change.id}? This cannot be undone.`
  )

  if (!confirmed) return

  try {
    await deleteChange(change.id)
    navigate('/dashboard')
  } catch (error) {
    console.error('Error deleting change:', error)
  }
}

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

      <div className="change-detail-actions">
        <ButtonLink
          to="/dashboard"
          state={{ restoreView: fromView }}
          variant="secondary"
        >
          ← Back to {fromView === 'assignment'
            ? 'Assignment Group View'
            : 'Status View'}
        </ButtonLink>

        <div className="change-detail-actions-right">
          <ButtonLink
            to={`/changes/${change.id}/edit`}
            variant="secondary"
          >
            Edit Change
          </ButtonLink>

          <button
            type="button"
            onClick={handleDelete}
            className="button-link tertiary"
          >
            Delete Change
          </button>
        </div>
      </div>
    </section>
  </div>
 )
}

export default ChangeDetail