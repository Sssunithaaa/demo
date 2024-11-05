import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CountdownApp from './assets/screens/CountdownApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CountdownApp />
    </div>
  )
}

export default App
