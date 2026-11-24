import React from 'react'
import { navigate } from '@reach/router'

// Must match basePath in static.config.js. useBasepath() is empty in the
// client bundle, so it is set here to keep links identical in the static
// HTML and after hydration.
const BASE_PATH = '/rsb'

// Link that always carries the site base path.
export function Link({ to, children, onClick, ...rest }) {
  const href = `${BASE_PATH}${to}`
  const handle = e => {
    if (onClick) onClick(e)
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return
    }
    e.preventDefault()
    navigate(href)
  }
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
