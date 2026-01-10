import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error('Error fetching data:', err))
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">shadcn/ui Installation Test</h1>

        {message && (
          <div className="p-4 bg-green-100 text-green-800 rounded-md">
            API Message: {message}
          </div>
        )}

        <p className="text-muted-foreground">Click the buttons below to test shadcn/ui components</p>

        <div className="flex gap-2">
          <Button onClick={() => setCount(count + 1)}>
            Count: {count}
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
    </div>
  )
}

export default App
