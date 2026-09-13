import { createChange } from '../services/changeService'
import { useEffect, useState } from 'react'
import ChangeForm from '../components/ChangeForm'

const riskScores = {
  'Very High': 5,
  High: 4,
  Medium: 3,
  Low: 2,
  'Very Low': 1,
}

export default function CreateChange() {
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

      ...[name === 'risk' && {
        riskScore: riskScores[value],
      }],
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
     const createdChange = await createChange(changeData)
     console.log('Created change:', createdChange)
   } catch (error) {
     console.error('Error creating change:', error)
   }
 }

  return (
    <main>
      <h1>Add Change</h1>

      <ChangeForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        owners={owners}
        assignmentGroups={assignmentGroups}
        readinessStatuses={readinessStatuses}
        submitLabel="Add Change"
      />
    </main>
  )
}