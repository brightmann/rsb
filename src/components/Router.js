import React from 'react'
import { useSiteData } from 'react-static'
import { navigate } from '@reach/router'

// Link that always carries the site base path.
export function Link({ to, children, onClick, ...rest }) {
  const { basePath = '/rsb' } = useSiteData()
  const href = `${basePath}${to}`
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
