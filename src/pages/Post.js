import React from 'react'
import { useRouteData } from 'react-static'
import { Link } from 'components/Router'

export default function Post() {
  const { post } = useRouteData()

  return (
    <article className="post">
      <Link to="/" className="post-back">
        &larr; All posts
      </Link>
      <h1 className="post-title">{post.title}</h1>
      <div className="post-date">{post.date}</div>
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  )
}
