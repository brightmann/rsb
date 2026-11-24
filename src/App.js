import React from 'react'
import { Root, Routes } from 'react-static'
import { Link } from 'components/Router'

import './app.css'

function App() {
  return (
    <Root>
      <header className="site-header">
        <Link to="/" className="site-title">
          rsb
        </Link>
      </header>
      <main className="site-main">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Routes path="*" />
        </React.Suspense>
      </main>
      <footer className="site-footer">
        <p>Built with react-static</p>
      </footer>
    </Root>
  )
}

export default App
