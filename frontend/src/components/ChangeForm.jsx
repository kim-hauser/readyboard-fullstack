export default function ChangeForm({
  formData,
  onChange,
  onSubmit,
  owners,
  assignmentGroups,
  readinessStatuses,
  submitLabel = 'Save Change',
  disableId = true,
}) {

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="id">Change ID</label>
        <input
          id="id"
          name="id"
          type="text"
          value={formData.id}
          onChange={onChange}
          disabled={disableId}
          required
        />
      </div>

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
        />
      </div>

      <div>
        <label htmlFor="ownerId">Owner</label>
        <select
          id="ownerId"
          name="ownerId"
          value={formData.ownerId}
          onChange={onChange}
          required
        >
          <option value="">Select owner</option>
          {owners.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {owner.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="assignmentGroupId">Assignment Group</label>
        <select
          id="assignmentGroupId"
          name="assignmentGroupId"
          value={formData.assignmentGroupId}
          onChange={onChange}
          required
        >
          <option value="">Select assignment group</option>
          {assignmentGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="readinessStatusId">Readiness Status</label>
        <select
          id="readinessStatusId"
          name="readinessStatusId"
          value={formData.readinessStatusId}
          onChange={onChange}
          required
        >
          <option value="">Select readiness status</option>
          {readinessStatuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="risk">Risk</label>
        <select
          id="risk"
          name="risk"
          value={formData.risk}
          onChange={onChange}
        >
          <option value="">Select risk</option>
          <option value="Very Low">Very Low</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Very High">Very High</option>
        </select>
      </div>

      <button type="submit">{submitLabel}</button>
    </form>
  )
}