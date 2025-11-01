import React, { useState } from 'react'
import './FeedbackButtons.css'

interface FeedbackButtonsProps {
  messageId: string
  onFeedback: (messageId: string, feedback: 'up' | 'down') => void
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ messageId, onFeedback }) => {
  const [selectedFeedback, setSelectedFeedback] = useState<'up' | 'down' | null>(null)

  const handleClick = (feedback: 'up' | 'down') => {
    if (selectedFeedback === feedback) {
      // Allow toggling off
      setSelectedFeedback(null)
    } else {
      setSelectedFeedback(feedback)
      onFeedback(messageId, feedback)
    }
  }

  return (
    <div className="feedback-buttons">
      <button
        className={`feedback-button ${selectedFeedback === 'up' ? 'active' : ''}`}
        onClick={() => handleClick('up')}
        aria-label="Thumbs up"
        title="Helpful"
      >
        👍
      </button>
      <button
        className={`feedback-button ${selectedFeedback === 'down' ? 'active' : ''}`}
        onClick={() => handleClick('down')}
        aria-label="Thumbs down"
        title="Not helpful"
      >
        👎
      </button>
    </div>
  )
}

export default FeedbackButtons

