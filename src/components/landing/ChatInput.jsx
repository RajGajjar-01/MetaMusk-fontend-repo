import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

export default function ChatInput({ onSendMessage }) {
    const [message, setMessage] = useState('')
    const [charCount, setCharCount] = useState(0)
    const maxChars = 5000

    const handleChange = (e) => {
        const value = e.target.value
        if (value.length <= maxChars) {
            setMessage(value)
            setCharCount(value.length)
        }
    }

    const handleSubmit = () => {
        if (message.trim()) {
            onSendMessage?.(message)
            setMessage('')
            setCharCount(0)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto max-w-4xl">
                <div className="relative">
                    <Textarea
                        value={message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe the animation you want to create..."
                        className="min-h-[120px] pr-32 resize-none bg-transparent border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors text-foreground placeholder:text-muted-foreground"
                    />

                    {/* Bottom Controls */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                                Press Enter to send, Shift+Enter for new line
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">
                                {charCount}/{maxChars}
                            </span>
                            <Button
                                onClick={handleSubmit}
                                disabled={!message.trim()}
                                size="sm"
                                className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
