import { useState } from 'react'
import * as Papa from 'papaparse'

function ChangeImport() {
  const [changes, setChanges] = useState([])
  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    setError('')

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('Parsed CSV:', results.data)
        setChanges(results.data)
      },
      error: (error) => {
        console.error('CSV parsing error:', error)
        setError('Unable to read the selected CSV file.')
      },
    })
  }

  return (
    <main>
      <h1>Import Changes</h1>

      <p>Select a CSV file to preview changes before importing.</p>

      <input
        type="file"
        accept=".csv,text/csv"
        onChange={handleFileChange}
      />

      {error && <p>{error}</p>}

      {changes.length > 0 && (
        <p>{changes.length} changes found.</p>
      )}
    </main>
  )
}

export default ChangeImport