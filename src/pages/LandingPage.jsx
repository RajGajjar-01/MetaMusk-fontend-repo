import { useNavigate } from 'react-router-dom'
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'

export default function LandingPage() {
    const navigate = useNavigate()

    const handleTryNow = () => {
        navigate('/chat')
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-white dark:bg-neutral-950">
            <Header />
            <Hero onTryNow={handleTryNow} />
        </div>
    )
}
