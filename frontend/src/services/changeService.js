const API_URL = 'http://localhost:8080/api/changes'

// GET /api/changes
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

// GET api/changes/:id
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

/* Helper Function for EditChange - GetChangeById in ChangeDetail transforms nested objects 
into Strings. For Edit, we want the actual IDs. */

export async function getChangeByIdRaw(id) {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch change')
  }

  return response.json()
}

// POST Changes
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

// PUT /api/changes/:id
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

