import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import mockChanges from '../data/mockChanges'
import ChangeCard from '../components/ChangeCard'
import FilterSelect from '../components/FilterSelect'
import MultiSelectFilter from '../components/MultiSelectFilter'
import RiskDot from '../components/RiskDot'

const columns = [
  { key: 'ready', title: 'Ready' },
  { key: 'pending', title: 'Pending' },
  { key: 'open', title: 'Open' },
]

function Dashboard() {
  const location = useLocation()

  const [viewMode, setViewMode] = useState(
    location.state?.restoreView || 'status'
  )

  // Status view filter
  const [selectedOwners, setSelectedOwners] = useState([])

  // Assignment view filters
  const [selectedGroups, setSelectedGroups] = useState([])
  const [selectedRisk, setSelectedRisk] = useState('All Risk Scores')

  // Last names are sorted

  const getLastName = (fullName) => {
    const nameParts = fullName.trim().split(' ')
    return nameParts[nameParts.length - 1]
  }

  const owners = [
    ...new Set(mockChanges.map((change) => change.owner)),
  ].sort((a, b) =>
    getLastName(a).localeCompare(getLastName(b), undefined, {
      sensitivity: 'base',
    })
  )

  const assignmentGroups = [
    ...new Set(
      mockChanges.map((change) => change.assignmentGroup || 'Unassigned')
    ),
  ].sort()

  // Status view filtering
  const filteredStatusChanges =
    selectedOwners.length === 0
      ? mockChanges
      : mockChanges.filter((change) => selectedOwners.includes(change.owner))

  const groupedChanges = filteredStatusChanges.reduce((acc, change) => {
    const key = change.status.toLowerCase()
    acc[key] = acc[key] || []
    acc[key].push(change)
    return acc
  }, {})

  // Assignment view filtering
  const filteredAssignmentChanges = mockChanges.filter((change) => {
    const matchesGroup =
      selectedGroups.length === 0 ||
      selectedGroups.includes(change.assignmentGroup || 'Unassigned')

    const matchesRisk =
      selectedRisk === 'All Risk Scores' ||
      (selectedRisk === 'Very High' && change.riskScore === 5) ||
      (selectedRisk === 'High' && change.riskScore === 4) ||
      (selectedRisk === 'Medium+' && change.riskScore >= 3) ||
      (selectedRisk === 'Low' && change.riskScore === 2) ||
      (selectedRisk === 'Very Low' && change.riskScore === 1)

    return matchesGroup && matchesRisk
  })

  /* 
  
  Risk filtering logic:
  
  Changes are grouped and sorted first by assignment group, THEN risk score.
  1. Very High (Score 5) risks to the top of view regardless of Group Name
  2. High Risks (Score 4) then ranked by number/alphabetically w/ groups
  3. Medium/Low/Very Low (Scores 3-2-1) follow.

  */

  const groupedByAssignment = filteredAssignmentChanges.reduce((acc, change) => {
    const key = change.assignmentGroup || 'Unassigned'
    acc[key] = acc[key] || []
    acc[key].push(change)
    return acc
  }, {})

  const sortedAssignmentGroups = Object.entries(groupedByAssignment)
    .map(([groupName, changes]) => [
      groupName,
      [...changes].sort((a, b) => b.riskScore - a.riskScore),
    ])
    .sort(([groupA, changesA], [groupB, changesB]) => {
      const highestRiskA = Math.max(
        ...changesA.map((change) => change.riskScore || 0)
      )
      const highestRiskB = Math.max(
        ...changesB.map((change) => change.riskScore || 0)
      )

      if (highestRiskB !== highestRiskA) {
        return highestRiskB - highestRiskA
      }

      return groupA.localeCompare(groupB)
    })
  
  // Toggles between Status/Assignment views; filters live here too.

  return (
    <div className="page">
      <div className="dashboard-controls">
        <div className="view-toggle">
          <button
            type="button"
            onClick={() => setViewMode('status')}
            className={viewMode === 'status' ? 'active-toggle' : ''}
          >
            Status View
          </button>

          <button
            type="button"
            onClick={() => setViewMode('assignment')}
            className={viewMode === 'assignment' ? 'active-toggle' : ''}
          >
            Assignment Group View
          </button>
        </div>
  
        <div className="filter-bar">
          {viewMode === 'assignment' ? (
            <>
              <MultiSelectFilter
                label="Assignment Group"
                id="groupFilter"
                options={assignmentGroups}
                selectedValues={selectedGroups}
                setSelectedValues={setSelectedGroups}
                placeholder="All Groups"
              />

              <FilterSelect
                label="Risk Level"
                id="riskFilter"
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                options={[
                  'All Risk Scores',
                  'Very High',
                  'High',
                  'Medium+',
                  'Low',
                  'Very Low',
                ]}
              />
            </>
          ) : (
            <MultiSelectFilter
              label="Owner"
              id="ownerFilter"
              options={owners}
              selectedValues={selectedOwners}
              setSelectedValues={setSelectedOwners}
              placeholder="All Owners"
            />
          )}
        </div>
      </div>

      {viewMode === 'status' ? (
        <div className="columns">
          {columns.map((col) => (
            <div key={col.key} className="status-column">
              <h2>{col.title}</h2>

              {groupedChanges[col.key]?.map((change) => (
                <ChangeCard
                  key={change.id}
                  change={change}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ))}
        </div>

      /* ChangeCards + columns = displays changes in Status View; 
        assignment-buckets display changes in Assignment View */

      ) : (
        <div className="assignment-buckets">
          {sortedAssignmentGroups.map(([groupName, changes]) => {
            const readyCount = changes.filter(
              (change) => change.status === 'Ready'
            ).length

            const pendingCount = changes.filter(
              (change) => change.status === 'Pending'
            ).length

            const openCount = changes.filter(
              (change) => change.status === 'Open'
            ).length

            return (
              <section key={groupName} className="queue-bucket">
                <div className="queue-bucket-header">
                  <div>
                    <h2>{groupName}</h2>
                    <p className="queue-bucket-meta">
                      {changes.length} total · Ready: {readyCount} · Pending:{' '}
                      {pendingCount} · Open: {openCount}
                    </p>
                  </div>
                </div>

                <div className="queue-list">
                  {changes.map((change) => (
                    <Link
                      key={change.id}
                      to={`/change/${change.id}`}
                      state={{ fromView: viewMode }}
                      className="queue-row"
                    >
                      <div className="queue-row-main">
                        <span className="queue-change-id-wrap">
                          <span className="queue-change-id">{change.id}</span>
                          <RiskDot riskScore={change.riskScore} />
                        </span>

                        <span className="queue-change-title">
                          {change.title}
                        </span>
                      </div>

                      <div className="queue-row-side">
                        <span className="queue-change-owner">
                          {change.owner}
                        </span>

                        <span
                          className={`queue-status-pill ${change.status.toLowerCase()}`}
                        >
                          {change.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dashboard