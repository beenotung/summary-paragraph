import React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

export function NotMatchPage() {
  const history = useHistory()
  const code = JSON.stringify(history.location, null, 2)
  return (
    <div>
      <h2>404 Page Not Found</h2>
      <pre>
        <code>{code}</code>
      </pre>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default NotMatchPage
