import React from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import Home from './components/Home'
import Checkout from './components/Checkout'

function App() {
  return (
    <>
      <Routes>
        < Route index element={ <Home/>}/>
        < Route path='checkout' element={ <Checkout/>}/>
      </Routes>
    </>
  )
}

export default App
