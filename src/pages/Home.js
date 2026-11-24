import React from 'react'
import { useRouteData } from 'react-static'
import { Link } from 'components/Router'

export default function Home() {
  const { posts, page, totalPages } = useRouteData()

  return (
    <div className="home">
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.slug} className="post-list-item">
            <Link to={`/post/${post.slug}`} className="post-list-title">
              {post.title}
            </Link>
            <div className="post-list-date">{post.date}</div>
            <p className="post-list-excerpt">{post.excerpt}</p>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <nav className="pagination">
          {page > 1 ? (
            <Link to={page - 1 === 1 ? '/' : `/page/${page - 1}`}>Newer</Link>
          ) : (
            <span className="pagination-placeholder" />
          )}
          <span className="pagination-status">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link to={`/page/${page + 1}`}>Older</Link>
          ) : (
            <span className="pagination-placeholder" />
          )}
        </nav>
      )}
    </div>
  )
      }
