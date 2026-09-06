import { useEffect, useState } from 'react'

// Uses state + scroll listener/helper function to create a "back to top" button near footer.

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button className="back-to-top" onClick={scrollToTop}>
      ⬆ Back to Top
    </button>
  )
}

export default BackToTop