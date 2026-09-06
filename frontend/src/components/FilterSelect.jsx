function FilterSelect({ label, id, value, onChange, options }) {
  return (
    <div className="filter-group">
      <label htmlFor={id} className="filter-label">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="filter-dropdown"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterSelect