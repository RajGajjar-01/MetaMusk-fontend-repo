import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Wifi, WifiOff } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { getHealth } from '@/services/api'

export default function Header() {
  const navigate = useNavigate()
  const [backendStatus, setBackendStatus] = useState(null)

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await getHealth()
        setBackendStatus('connected')
      } catch {
        setBackendStatus('disconnected')
      }
    }
    
    checkBackend()
    const interval = setInterval(checkBackend, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 flex items-center justify-center">
            <span className="text-white dark:text-black font-bold text-lg">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-neutral-900 dark:text-white">MetaMusk</span>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Backend Status */}
          {backendStatus && (
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${
              backendStatus === 'connected' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}>
              {backendStatus === 'connected' ? (
                <Wifi className="w-3 h-3" />
              ) : (
                <WifiOff className="w-3 h-3" />
              )}
              <span className="hidden sm:inline">{backendStatus === 'connected' ? 'API Connected' : 'API Offline'}</span>
            </div>
          )}
          
          <ThemeToggle />

          <Button
            className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black font-semibold"
            onClick={() => navigate('/chat')}
          >
            Open Chat
          </Button>
        </div>
      </div>
    </header>
  )
}
