import { useState } from 'react'
import Header from '@/components/landing/Header'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Send, Loader2, Video, RefreshCw } from 'lucide-react'
import { generateVideo } from '@/services/api'

export default function ChatPage() {
    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const handleGenerate = async () => {
        if (!prompt.trim() || isLoading) return

        setIsLoading(true)
        setError(null)
        setResult(null)

        try {
            const data = await generateVideo({ concept: prompt })
            setResult(data)
        } catch (err) {
            setError(err.message || 'Failed to generate video. Make sure the backend is running.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleGenerate()
        }
    }

    const handleReset = () => {
        setPrompt('')
        setResult(null)
        setError(null)
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            
            <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-16">
                <div className="w-full max-w-2xl">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Generate Educational Video
                        </h1>
                        <p className="text-muted-foreground">
                            Describe a math concept and we'll create an animated video for you
                        </p>
                    </div>

                    {/* Input Area */}
                    <Card className="p-6 mb-6">
                        <Textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g., Explain the Pythagorean theorem with visual proof"
                            className="min-h-[120px] resize-none mb-4 text-base"
                            disabled={isLoading}
                        />
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                                Press Enter to generate
                            </span>
                            <div className="flex gap-2">
                                {result && (
                                    <Button
                                        variant="outline"
                                        onClick={handleReset}
                                        disabled={isLoading}
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        New Video
                                    </Button>
                                )}
                                <Button
                                    onClick={handleGenerate}
                                    disabled={!prompt.trim() || isLoading}
                                    className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Video className="w-4 h-4 mr-2" />
                                            Generate Video
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Error Display */}
                    {error && (
                        <Card className="p-4 mb-6 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
                            <p className="text-red-700 dark:text-red-400">{error}</p>
                        </Card>
                    )}

                    {/* Result Display */}
                    {result && (
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className={`px-3 py-1 rounded-full text-sm ${
                                    result.status === 'success' 
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                }`}>
                                    {result.status}
                                </div>
                            </div>

                            {result.video_path && (
                                <div className="mb-4">
                                    <h3 className="font-medium mb-2">Video Path</h3>
                                    <code className="block p-3 bg-muted rounded text-sm">
                                        {result.video_path}
                                    </code>
                                </div>
                            )}

                            {result.script_package && (
                                <div className="mb-4">
                                    <h3 className="font-medium mb-2">Script Package</h3>
                                    <pre className="p-3 bg-muted rounded text-sm overflow-auto max-h-64">
                                        {JSON.stringify(result.script_package, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {result.execution_metadata && Object.keys(result.execution_metadata).length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-medium mb-2">Execution Details</h3>
                                    <pre className="p-3 bg-muted rounded text-sm overflow-auto">
                                        {JSON.stringify(result.execution_metadata, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {result.errors?.length > 0 && (
                                <div>
                                    <h3 className="font-medium mb-2 text-red-600">Errors</h3>
                                    <ul className="list-disc list-inside text-red-600 text-sm">
                                        {result.errors.map((err, i) => (
                                            <li key={i}>{err}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
