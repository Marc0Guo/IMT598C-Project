import React from 'react'
import FeedbackButtons from './FeedbackButtons'
import { Message } from './ChatView'
import './MessageBubble.css'

interface MessageBubbleProps {
  message: Message
  onFeedback: (messageId: string, feedback: 'up' | 'down') => void
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onFeedback }) => {
  const isUser = message.role === 'user'
  const isStreaming = message.isStreaming ?? false

  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <div className="assistant-avatar">🤖</div>
      )}
      <div className="message-content-wrapper">
        <div className={`message-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
          <div className="message-content">
            {message.content || (isStreaming ? '...' : '')}
            {isStreaming && (
              <span className="streaming-cursor">|</span>
            )}
          </div>
          {!isUser && message.content && (
            <FeedbackButtons
              messageId={message.id}
              onFeedback={onFeedback}
            />
          )}
        </div>
        <div className="message-timestamp">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble

