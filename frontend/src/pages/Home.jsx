import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page">
      <h1>ReadyBoard</h1>
      <p className="subtitle">
        A streamlined tool for tracking and managing change requests.
      </p>

      <section className="card">
        <h2>Welcome 👋</h2>
        <p>
          ReadyBoard helps teams stay organized by providing a clear view of
          active changes, ownership, and progress—all in one place.
        </p>
        <p>
          Whether you're a Change Manager or a Change Owner, you can quickly
          understand what needs attention and take action.
        </p>
      </section>

      <section className="card">
        <h2>Get Started</h2>
        <p>
          View your current tasks and drill into details to manage changes
          efficiently.
        </p>
      <Link to="/changes" className="button">
          View Changes →
      </Link>
      </section>
    </div>
  )
}

export default Home