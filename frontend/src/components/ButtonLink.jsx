import { Link } from 'react-router-dom'


function ButtonLink({ to, children, variant = 'primary', ...props }) {
  return (
    <Link
      to={to}
      className={`button-link ${variant}`}
      {...props}
    >
      {children}
    </Link>
  )
}

export default ButtonLink