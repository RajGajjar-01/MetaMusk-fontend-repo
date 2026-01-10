import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function ChatMessage({ message, isUser, isLoading }) {
    return (
        <div className={`flex gap-4 mb-6 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <Avatar className="w-10 h-10 shrink-0">
                {isUser ? (
                    <>
                        <AvatarImage src="/user-avatar.png" alt="User" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                            U
                        </AvatarFallback>
                    </>
                ) : (
                    <>
                        <AvatarImage src="/ai-avatar.png" alt="AI" />
                        <AvatarFallback className="bg-primary/10 text-primary border border-primary/20">
                            A
                        </AvatarFallback>
                    </>
                )}
            </Avatar>

            {/* Message Content */}
            <div className={`flex flex-col max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                <Card className={`p-4 ${isUser
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'bg-card/50 backdrop-blur border-border/50'
                    }`}>
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Creating animation specification...</span>
                        </div>
                    ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message}</p>
                    )}
                </Card>

                {!isUser && !isLoading && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground pl-1">
                        <span>{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(message)}
                            className="hover:text-foreground transition-colors p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md"
                            title="Copy response"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
