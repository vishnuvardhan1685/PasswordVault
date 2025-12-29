import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center space-y-3">
      <div className="text-2xl font-semibold">Page not found</div>
      <Link className="text-emerald-200 hover:text-emerald-100" to="/">
        Go home
      </Link>
    </div>
  )
}
