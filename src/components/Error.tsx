import React from 'react'

export function ErrorComponent(props: { action: string; error: null | Error }) {
  if (!props.error) {
    return <></>
  }
  return (
    <p className="error">
      Failed to {props.action}:
      <pre>
        <code
          style={{
            backgroundColor: 'pink',
            color: 'red',
            padding: '0.3rem',
          }}
        >
          {props.error.toString()}
        </code>
      </pre>
    </p>
  )
}

export default ErrorComponent
