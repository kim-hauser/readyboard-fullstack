import { useEffect, useRef, useState } from 'react'

function MultiSelectFilter({
  label,
  options,
  selectedValues,
  setSelectedValues,
  placeholder = 'Select options',
  id,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  function toggleDropdown() {
    setIsOpen((prev) => !prev)
  }

  function handleOptionToggle(option) {
    const isSelected = selectedValues.includes(option)

    if (isSelected) {
      setSelectedValues(selectedValues.filter((item) => item !== option))
    } else {
      setSelectedValues([...selectedValues, option])
    }
  }

  function clearSelections() {
    setSelectedValues([])
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const buttonText =
    selectedValues.length === 0
      ? placeholder
      : `${selectedValues.length} selected`

  return (
    <div className="filter-group multi-select-filter" ref={containerRef}>
      <label htmlFor={id} className="filter-label">
        {label}
      </label>

      <button
        type="button"
        id={id}
        className={`multi-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{buttonText}</span>
        <span className="multi-select-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="multi-select-dropdown" role="listbox" aria-multiselectable="true">
          <div className="multi-select-actions">
            <button
              type="button"
              className="clear-selection-btn"
              onClick={clearSelections}
            >
              Clear
            </button>
          </div>

          <div className="multi-select-options">
            {options.map((option) => {
              const isChecked = selectedValues.includes(option)

              return (
                <label key={option} className="multi-select-option">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleOptionToggle(option)}
                  />
                  <span>{option}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiSelectFilter