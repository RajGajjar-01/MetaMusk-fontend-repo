import { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from '../landing/ChatInput'
import { enhancePrompt } from '@/services/api'

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

    const formatEnhancedResponse = (data) => {
        let response = `**${data.concept_name}**\n\n`
        response += `${data.enhanced_prompt}\n\n`
        
        response += `**Target Audience:** ${data.target_audience}\n`
        response += `**Estimated Duration:** ${data.estimated_duration} seconds\n\n`
        
        if (data.learning_objectives?.length > 0) {
            response += `**Learning Objectives:**\n`
            data.learning_objectives.forEach((obj, i) => {
                response += `${i + 1}. ${obj}\n`
            })
            response += '\n'
        }
        
        if (data.video_script?.scenes?.length > 0) {
            response += `**Video Script (${data.video_script.scenes.length} scenes):**\n\n`
            data.video_script.scenes.forEach((scene, i) => {
                response += `**Scene ${i + 1}: ${scene.title}** (${scene.duration}s)\n`
                response += `${scene.narration}\n`
                if (scene.visuals?.length > 0) {
                    response += `Visuals: ${scene.visuals.join(', ')}\n`
                }
                response += '\n'
            })
        }
        
        if (data.suggested_visuals?.length > 0) {
            response += `**Suggested Visuals:** ${data.suggested_visuals.join(', ')}\n\n`
        }
        
        if (data.example) {
            response += `**Example:**\n`
            if (data.example.title) response += `${data.example.title}\n`
            if (data.example.input) response += `Input: ${data.example.input}\n`
            if (data.example.steps?.length > 0) {
                data.example.steps.forEach((step, i) => {
                    response += `${i + 1}. ${step}\n`
                })
            }
        }
        
        return response
    }

    const handleSendMessage = async (message) => {
        const userMessage = {
            id: Date.now(),
            text: message,
            isUser: true,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setIsLoading(true)

        try {
            const data = await enhancePrompt({ prompt: message })
            
            const aiMessage = {
                id: Date.now() + 1,
                text: formatEnhancedResponse(data),
                isUser: false,
                timestamp: new Date(),
                data: data
            }
            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                text: `Sorry, I encountered an error: ${error.message}. Please make sure the backend server is running.`,
                isUser: false,
                timestamp: new Date(),
                isError: true
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
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
                                    isError={msg.isError}
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
