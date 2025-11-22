import React from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import Home from './components/Home'
import Checkout from './components/Checkout'
import Orders from './components/Orders'

function App() {
  return (
    <>
      <Routes>
        < Route index element={ <Home/>}/>
        < Route path='checkout' element={ <Checkout/>}/>
        < Route path='orders' element={ <Orders/>}/>
      </Routes>
    </>
  )
}

export default App
