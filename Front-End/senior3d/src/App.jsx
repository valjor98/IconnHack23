import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chat from './components/chat/Chat'

export const App = () => {

  return (
    <div style={{height: "100vh", width:"100vw", position:"relative", backgroundColor:"#ffffff"}}>
    <Chat/>
    </div>
  )
}

export default App
