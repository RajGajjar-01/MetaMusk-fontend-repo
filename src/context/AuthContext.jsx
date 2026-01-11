import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for saved user session
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const login = (email, password) => {
        // Simulate login - in production, this would call your API
        const userData = {
            id: '1',
            email: email,
            name: email.split('@')[0],
            avatar: null
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return Promise.resolve(userData)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const value = {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
