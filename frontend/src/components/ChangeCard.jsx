import { Link } from 'react-router-dom'

function ChangeCard({ change, viewMode }) {
  const { id, title, owner } = change

  return (
    <div className="card">
      <h3>
        <Link 
          to={`/change/${id}`}
          state={{ fromView: viewMode }}
          >
          {title}
        </Link>
      </h3>
      <p>{owner}</p>
    </div>
  )
}

export default ChangeCard

/* Flow:

Dashboard → passes viewMode
ChangeDetail → reads fromView
ButtonLink → passes restoreView
Dashboard → restores with useEffect

*/