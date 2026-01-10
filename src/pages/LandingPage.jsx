import { useNavigate } from 'react-router-dom'
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import { useAuth } from '@/context/AuthContext'

export default function LandingPage() {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const handleTryNow = () => {
        if (isAuthenticated) {
            navigate('/chat')
        } else {
            navigate('/login')
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-white dark:bg-neutral-950">
            <Header />
            <Hero onTryNow={handleTryNow} />
        </div>
    )
}
