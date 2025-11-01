import React, { useState } from 'react'
import './UploadWindow.css'

interface UploadWindowProps {
  onClose: () => void
}

type UploadStage = 'idle' | 'uploading' | 'parsing' | 'indexing' | 'complete' | 'error'

const UploadWindow: React.FC<UploadWindowProps> = ({ onClose }) => {
  const [stage, setStage] = useState<UploadStage>('idle')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [parseProgress, setParseProgress] = useState(0)
  const [indexProgress, setIndexProgress] = useState(0)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setStage('idle')
      setParseProgress(0)
      setIndexProgress(0)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    // Simulate upload process (hardcoded for UI demo)
    setStage('uploading')

    // Simulate uploading
    setTimeout(() => {
      setStage('parsing')
      // Simulate parsing progress
      let progress = 0
      const parseInterval = setInterval(() => {
        progress += 10
        setParseProgress(progress)
        if (progress >= 100) {
          clearInterval(parseInterval)
          setStage('indexing')
          // Simulate indexing progress
          let indexProgress = 0
          const indexInterval = setInterval(() => {
            indexProgress += 10
            setIndexProgress(indexProgress)
            if (indexProgress >= 100) {
              clearInterval(indexInterval)
              setStage('complete')
              setTimeout(() => {
                onClose()
              }, 2000)
            }
          }, 200)
        }
      }, 300)
    }, 500)
  }

  const handleCancel = () => {
    setStage('idle')
    setSelectedFile(null)
    setParseProgress(0)
    setIndexProgress(0)
  }

  const getStageMessage = () => {
    switch (stage) {
      case 'uploading':
        return 'Uploading file...'
      case 'parsing':
        return 'Parsing document...'
      case 'indexing':
        return 'Indexing content...'
      case 'complete':
        return 'Upload complete!'
      case 'error':
        return 'Upload failed. Please try again.'
      default:
        return 'Select a PDF file to upload'
    }
  }

  return (
    <div className="upload-overlay" onClick={onClose}>
      <div className="upload-window" onClick={(e) => e.stopPropagation()}>
        <div className="upload-header">
          <h2>Upload Robot Manual</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="upload-content">
          <div className="file-input-wrapper">
            <input
              type="file"
              id="file-input"
              accept=".pdf"
              onChange={handleFileSelect}
              disabled={stage !== 'idle' && stage !== 'error'}
              className="file-input"
            />
            <label htmlFor="file-input" className="file-input-label">
              {selectedFile ? selectedFile.name : 'Choose PDF file'}
            </label>
          </div>

          {selectedFile && (
            <div className="file-info">
              <p>File: {selectedFile.name}</p>
              <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )}

          <div className="upload-status">
            <p className="status-message">{getStageMessage()}</p>

            {stage === 'parsing' && (
              <div className="progress-section">
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${parseProgress}%` }}
                  />
                </div>
                <span className="progress-text">{parseProgress}%</span>
              </div>
            )}

            {stage === 'indexing' && (
              <div className="progress-section">
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${indexProgress}%` }}
                  />
                </div>
                <span className="progress-text">{indexProgress}%</span>
              </div>
            )}

            {stage === 'complete' && (
              <div className="success-message">
                ✓ Manual successfully uploaded and indexed!
              </div>
            )}
          </div>
        </div>

        <div className="upload-actions">
          {stage === 'idle' || stage === 'error' ? (
            <>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button
                className="upload-action-button"
                onClick={handleUpload}
                disabled={!selectedFile}
              >
                Upload
              </button>
            </>
          ) : stage === 'complete' ? (
            <button className="upload-action-button" onClick={onClose}>
              Close
            </button>
          ) : (
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadWindow

