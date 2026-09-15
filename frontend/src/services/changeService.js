const API_URL = 'http://localhost:8080/api/changes'

// GET all
export async function getChanges() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch changes')
  }

  const data = await response.json()

  return data.map((change) => ({
    ...change,
    owner: change.owner?.name ?? 'Unassigned',
    assignmentGroup: change.assignmentGroup?.name ?? 'Unassigned',
    status: change.readinessStatus?.name ?? 'Pending',
  }))
}

// GET by ID
export async function getChangeById(id) {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch change')
  }

  const change = await response.json()

  return {
    ...change,
    owner: change.owner?.name ?? 'Unassigned',
    assignmentGroup: change.assignmentGroup?.name ?? 'Unassigned',
    status: change.readinessStatus?.name ?? 'Pending',
  }
}

// Helper function for EditChange to get raw data.
export async function getChangeByIdRaw(id) {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch change')
  }

  return response.json()
}

// POST (Create) Change
export async function createChange(changeData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changeData),
  })

  if (!response.ok) {
    throw new Error('Failed to create change')
  }

  return response.json()
}

// PUT (Edit/Update) Change
export async function updateChange(id, changeData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changeData),
  })

  if (!response.ok) {
    throw new Error('Failed to update change')
  }

  return response.json()
}

// DELETE Change

export async function deleteChange(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete change')
  }
}