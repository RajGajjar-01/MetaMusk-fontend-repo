import { useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">shadcn/ui Installation Test</h1>
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
