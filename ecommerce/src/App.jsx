import React from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import Home from './components/Home'
import Checkout from './components/Checkout'
import Orders from './components/Orders'
import Tracking from './components/Tracking'

function App() {
  return (
    <>
      <Routes>
        < Route index element={ <Home/>}/>
        < Route path='checkout' element={ <Checkout/>}/>
        < Route path='orders' element={ <Orders/>}/>
        < Route path='tracking' element={ <Tracking/>}/>
      </Routes>
    </>
  )
}

export default App
