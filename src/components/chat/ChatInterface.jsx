import { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from '../landing/ChatInput'

export default function ChatInterface() {
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async (message) => {
        // Add user message
        const userMessage = {
            id: Date.now(),
            text: message,
            isUser: true,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setIsLoading(true)

        // Simulate AI response
        setTimeout(() => {
            const aiMessage = {
                id: Date.now() + 1,
                text: "I'll help you create that animation! Let me generate the Manim code for you...",
                isUser: false,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiMessage])
            setIsLoading(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col h-screen pt-16">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto pb-48 pt-8">
                <div className="container mx-auto max-w-4xl px-4">
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p className="text-center">
                                Start a conversation to create your animation
                            </p>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg) => (
                                <ChatMessage
                                    key={msg.id}
                                    message={msg.text}
                                    isUser={msg.isUser}
                                />
                            ))}
                            {isLoading && (
                                <ChatMessage
                                    message=""
                                    isUser={false}
                                    isLoading={true}
                                />
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>
            </div>

            {/* Chat Input */}
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    )
}
