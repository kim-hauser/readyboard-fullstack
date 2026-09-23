import { createChange } from '../services/changeService'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ChangeForm from '../components/ChangeForm'

const riskScores = {
  'Very High': 5,
  High: 4,
  Medium: 3,
  Low: 2,
  'Very Low': 1,
}

export default function CreateChange() {

  const navigate = useNavigate()

  const location = useLocation()

  const [successMessage, setSuccessMessage] = useState('')

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    ownerId: '',
    assignmentGroupId: '',
    readinessStatusId: '',
    risk: '',
  })
  
  // State for Owners, Assignment Groups, ReadinessStatus; Dropdown data:

  const [owners, setOwners] = useState([])
  const [assignmentGroups, setAssignmentGroups] = useState([])
  const [readinessStatuses, setReadinessStatuses] = useState([])

  // Calls the backend to fill the empty arrays:

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/api/owners')
      .then((response) => response.json()),

      fetch('http://localhost:8080/api/assignment-groups')
      .then((response) => response.json()),

      fetch('http://localhost:8080/api/readiness-statuses')
      .then((response) => response.json()),
    ])
      .then(([ownersData, assignmentGroupsData, readinessStatusesData]) => {
        setOwners(ownersData)
        setAssignmentGroups(assignmentGroupsData)
        setReadinessStatuses(readinessStatusesData)
      })
      .catch((error) => {
        console.error('Error loading dropdown data:', error)
      })
  }, [])

// Converts all numericFields to a number while preserving empty field as ''.
    
  function handleChange(event) {
    const { name, value } = event.target

    const numericFields = [
    'ownerId',
    'assignmentGroupId',
    'readinessStatusId',
  ]

    setFormData((current) => ({
      ...current,
      [name]:
        numericFields.includes(name) && value !== ''
          ? Number(value)
          : value,
  }))
}
  async function handleSubmit(event) {
    event.preventDefault()

    const changeData = {
        id: formData.id,
        title: formData.title,
        description: formData.description,

        owner: formData.ownerId
          ? { id: formData.ownerId }
          : null,

        assignmentGroup: formData.assignmentGroupId
          ? { id: formData.assignmentGroupId }
          : null, 

        readinessStatus: formData.readinessStatusId
          ? { id: formData.readinessStatusId }
          : null,

        risk: formData.risk,
        riskScore: riskScores[formData.risk],
    }

  try {
     await createChange(changeData)

     setSuccessMessage('Change created successfully.')
   } catch (error) {
     console.error('Error creating change:', error)
   }
 }

  return (
     <main className="change-form-page">
      <section className="change-form-card">
        <h1>Add Change</h1>

          {successMessage && (
            <div className="success-message" role="status">
              ✓ {successMessage}
            </div>
          )}

        <ChangeForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() =>
            navigate('/changes', {
            state: { restoreView: location.state?.fromView || 'status' }
            })
          }
          owners={owners}
          assignmentGroups={assignmentGroups}
          readinessStatuses={readinessStatuses}
          submitLabel="Add Change"
          cancelLabel="Back to Changes"
          disableId={false} // Change IDs are only allowed to be set when creating a new change.
        />
      </section>
    </main>
  )
}