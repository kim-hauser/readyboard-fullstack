import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Papa from 'papaparse'
import { createChange } from '../services/changeService'

function ChangeImport() {
  const navigate = useNavigate()

  const [changes, setChanges] = useState([])
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Load lookup data to match CSV names with database IDs during import
  const [owners, setOwners] = useState([])
  const [assignmentGroups, setAssignmentGroups] = useState([])
  const [readinessStatuses, setReadinessStatuses] = useState([])

  // Fetch lookup values when the import page loads
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/api/owners').then((res) => res.json()),
      fetch('http://localhost:8080/api/assignment-groups').then((res) =>
        res.json()
      ),
      fetch('http://localhost:8080/api/readiness-statuses').then((res) =>
        res.json()
      ),
    ])
      .then(([ownersData, groupsData, statusesData]) => {
        setOwners(ownersData)
        setAssignmentGroups(groupsData)
        setReadinessStatuses(statusesData)
      })
      .catch((error) => {
        console.error('Failed to load import lookup data:', error)
        setError('Unable to load data needed for import.')
      })
  }, [])

  // Parse selected CSV file and store rows for preview
  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    setError('')
    setSuccessMessage('')

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setChanges(results.data)
      },
      error: (error) => {
        console.error('CSV parsing error:', error)
        setError('Unable to read the selected CSV file.')
      },
    })
  }

  // Translate CSV names into IDs and post each change
  const handleImport = async () => {
    setError('')
    setSuccessMessage('')

    try {
      for (const change of changes) {
        const owner = owners.find(
          (owner) => owner.name === change.owner
        )

        const assignmentGroup = assignmentGroups.find(
          (group) => group.name === change.assignmentGroup
        )

        const readinessStatus = readinessStatuses.find(
          (status) => status.name === change.readinessStatus
        )

        if (!owner || !assignmentGroup || !readinessStatus) {
          throw new Error(`Unable to match lookup data for ${change.id}`)
        }

        const riskScores = {
          'Very High': 5,
          High: 4,
          Medium: 3,
          Low: 2,
          'Very Low': 1,
        }

        const changeData = {
          id: change.id,
          title: change.title,
          description: change.description,

          owner: {
            id: owner.id,
          },

          assignmentGroup: {
            id: assignmentGroup.id,
          },

          readinessStatus: {
            id: readinessStatus.id,
          },

          risk: change.risk,
          riskScore: riskScores[change.risk],
        }

        await createChange(changeData)
      }

      setSuccessMessage(
        `${changes.length} changes imported successfully.`
      )
    } catch (error) {
      console.error('Import failed:', error)
      setError(error.message)
    }
  }

return (
  <main>
    <h1>Import Changes</h1>

    {successMessage && (
      <div className="success-message" role="status">
        ✓ {successMessage}
      </div>
    )}

    <p>Select a CSV file to preview changes before importing.</p>

    <input
      type="file"
      accept=".csv,text/csv"
      onChange={handleFileChange}
    />

    <div className="form-actions">
      <button
        type="button"
        onClick={() => navigate('/changes')}
        className="secondary-button"
      >
        ← Back to Changes
      </button>
    </div>

    {error && <p>{error}</p>}

    {changes.length > 0 && (
      <div className="import-preview">
        <h2>Preview</h2>

        <p>{changes.length} changes found.</p>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Owner</th>
              <th>Assignment Group</th>
              <th>Status</th>
              <th>Risk</th>
            </tr>
          </thead>

          <tbody>
            {changes.map((change) => (
              <tr key={change.id}>
                <td>{change.id}</td>
                <td>{change.title}</td>
                <td>{change.description}</td>
                <td>{change.owner}</td>
                <td>{change.assignmentGroup}</td>
                <td>{change.readinessStatus}</td>
                <td>{change.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleImport}
          >
            Import Changes
          </button>
        </div>
      </div>
    )}
  </main>
 )
}

export default ChangeImport