import { Link } from 'react-router-dom'
import { useState } from 'react'

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
    setIsOpen(prev => !prev)
  }

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-header">

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

{/* Conditional statement for mobile hamburger menu CSS. If true mobile CSS class shows. */}
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/changes" onClick={closeMenu}>Changes</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
      </div>
    </nav>
  )
}

export default NavBar