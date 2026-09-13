import {
  getChangeByIdRaw,
  updateChange,
} from '../services/changeService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChangeForm from '../components/ChangeForm'

const riskScores = {
  'Very High': 5,
  High: 4,
  Medium: 3,
  Low: 2,
  'Very Low': 1,
}

export default function EditChange() {
  const { id } = useParams()
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

  // Load the existing change:
  useEffect(() => {
   getChangeByIdRaw(id)
      .then((change) => {
        setFormData({
          id: change.id,
          title: change.title,
          description: change.description ?? '',
          ownerId: change.owner?.id ?? '',
          assignmentGroupId: change.assignmentGroup?.id ?? '',
          readinessStatusId: change.readinessStatus?.id ?? '',
          risk: change.risk ?? '',
        })
      })
      .catch((error) => {
        console.error('Error loading change:', error)
      })
   }, [id])


 // Load dropdown data
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
     const updatedChange = await updateChange(id, changeData)
     console.log('Updated change:', updatedChange)
   } catch (error) {
     console.error('Error updating change:', error)
   }
 }

  return (
    <main>
      <h1>Edit Change</h1>

      <ChangeForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        owners={owners}
        assignmentGroups={assignmentGroups}
        readinessStatuses={readinessStatuses}
        submitLabel="Save Change"
      />
    </main>
  )

  // Flow for Edit Change: Dashboard -> Change Card -> Change Detail -> Edit Change -> PUT
}