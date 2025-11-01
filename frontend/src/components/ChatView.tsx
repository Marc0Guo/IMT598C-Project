import React, { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import './ChatView.css'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I can help you with robot user support. Upload a manual or ask me a question.',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  const handleSend = async () => {
    if (!inputValue.trim() || isThinking) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsThinking(true)

    // Simulate API call with streaming (hardcoded for UI demo)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsThinking(false)

      // Simulate streaming response
      const responseText = 'This is a sample response. In a real implementation, this would come from the POST /chat endpoint with streaming support.'
      let currentIndex = 0

      const streamInterval = setInterval(() => {
        if (currentIndex < responseText.length) {
          const chunk = responseText.slice(0, currentIndex + 1)
          setMessages((prev) => {
            const updated = [...prev]
            const lastMessage = updated[updated.length - 1]
            if (lastMessage.role === 'assistant') {
              lastMessage.content = chunk
            }
            return updated
          })
          currentIndex++
        } else {
          clearInterval(streamInterval)
          setMessages((prev) => {
            const updated = [...prev]
            const lastMessage = updated[updated.length - 1]
            if (lastMessage.role === 'assistant') {
              lastMessage.isStreaming = false
            }
            return updated
          })
        }
      }, 30)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    // In real implementation, this would send feedback to the backend
    console.log(`Feedback ${feedback} for message ${messageId}`)
    // You would call: POST /feedback with messageId and feedback
  }

  return (
    <div className="chat-view">
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="chat-logo">🤖</div>
          <div>
            <div className="chat-title">AI Support Bot</div>
            <div className="chat-subtitle">Online</div>
          </div>
        </div>
        <button className="chat-minimize" aria-label="Minimize chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="messages-container">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onFeedback={handleFeedback}
          />
        ))}
        {isThinking && (
          <div className="thinking-indicator">
            <div className="thinking-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <textarea
          className="message-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... (Press Enter to send)"
          rows={1}
          disabled={isThinking}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={!inputValue.trim() || isThinking}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatView

