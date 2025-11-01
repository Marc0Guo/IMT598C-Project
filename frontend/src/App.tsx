import React, { useState } from 'react'
import ChatView from './components/ChatView'
import UploadWindow from './components/UploadWindow'
import './App.css'

function App() {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <div className="logo">🤖</div>
          <h1>AI Self-Serve Customer Support</h1>
        </div>
        <nav className="header-nav">
          <a href="#" className="nav-link">Help Center</a>
          <a href="#" className="nav-link">Getting Started</a>
          <a href="#" className="nav-link">Topics</a>
          <a href="#" className="nav-link">Video Tutorials</a>
        </nav>
        <div className="header-right">
          <button
            className="upload-button"
            onClick={() => setShowUpload(true)}
          >
            Upload Manual
          </button>
        </div>
      </header>
      <div className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">How can we help?</h2>
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search for manuals, troubleshooting, and more"
              className="hero-search"
            />
          </div>
        </div>
      </div>
      <div className="main-content">
        <ChatView />
      </div>
      {showUpload && (
        <UploadWindow onClose={() => setShowUpload(false)} />
      )}
    </div>
  )
}

export default App

