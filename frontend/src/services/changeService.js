const API_URL = 'http://localhost:8080/api/changes'

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
}