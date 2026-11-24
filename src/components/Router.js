import React from 'react'
import { navigate } from '@reach/router'
import { useBasepath } from 'react-static'

// Link that always carries the site base path (e.g. /rsb), both in the
// static HTML and after client-side hydration.
export function Link({ to, children, onClick, ...rest }) {
  const base = useBasepath()
  const prefix = base ? `/${base}`.replace(/\/+$/, '') : ''
  const href = `${prefix}${to}`
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
