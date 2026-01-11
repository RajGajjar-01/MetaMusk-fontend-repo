import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send, Lock } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function ChatInput({ onSendMessage, onLoginRequired }) {
    const [message, setMessage] = useState('')
    const [charCount, setCharCount] = useState(0)
    const maxChars = 5000
    const { isAuthenticated } = useAuth()

    const handleChange = (e) => {
        const value = e.target.value
        if (value.length <= maxChars) {
            setMessage(value)
            setCharCount(value.length)
        }
    }

    const handleSubmit = () => {
        if (!isAuthenticated) {
            // Redirect to login if not authenticated
            onLoginRequired?.()
            return
        }

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

    const handleTextareaClick = () => {
        if (!isAuthenticated) {
            onLoginRequired?.()
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
                        onClick={handleTextareaClick}
                        placeholder={isAuthenticated ? "Describe the animation you want to create..." : "Sign in to start creating animations..."}
                        className={`min-h-[120px] pr-32 resize-none bg-transparent border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors text-foreground placeholder:text-muted-foreground ${!isAuthenticated ? 'cursor-pointer' : ''}`}
                        disabled={!isAuthenticated}
                    />

                    {!isAuthenticated && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-md">
                            <div className="flex items-center gap-2 text-foreground">
                                <Lock className="w-5 h-5" />
                                <span className="text-sm font-medium">Sign in to create animations</span>
                            </div>
                        </div>
                    )}

                    {/* Bottom Controls */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground" disabled={!isAuthenticated}>
                                        DecimusLLM 2024 ⌄
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>DecimusLLM 2024</DropdownMenuItem>
                                    <DropdownMenuItem>GPT-4</DropdownMenuItem>
                                    <DropdownMenuItem>Claude 3</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">
                                {charCount}/{maxChars}
                            </span>
                            <Button
                                onClick={handleSubmit}
                                disabled={!isAuthenticated || !message.trim()}
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
