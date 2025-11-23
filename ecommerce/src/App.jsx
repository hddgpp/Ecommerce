import React from 'react'
import {Routes, Route} from 'react-router'
import axios from "axios";
import './App.css'
import Home from './components/Home'
import Checkout from './components/Checkout'
import Orders from './components/Orders'
import Tracking from './components/Tracking'

function App() {
    const [cart, setCart] = React.useState([])

  React.useEffect(() => {
     axios.get('/api/cart-items')
      .then((response) => {
        setCart(response.data)
      })
  }, [])

  return (
    <>
      <Routes>
        < Route index element={ <Home cart={cart}/>}/>
        < Route path='checkout' element={ <Checkout cart={cart}/>}/>
        < Route path='orders' element={ <Orders cart={cart}/>}/>
        < Route path='tracking' element={ <Tracking cart={cart}/>}/>
      </Routes>
    </>
  )
}

export default App
