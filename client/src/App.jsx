import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import SellItem from './components/SellItem'
import SellVehicles from './components/SellVehicles'
import SellHome from './components/SellHome'
import ProfilePage from './pages/ProfilePage'
import About from './pages/AboutPage'
import Header from './components/Header'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import PageNotFound from './components/PageNotFound'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LocationPage from './pages/LocationPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
      <Routes>

<Route path='/' element={ <HomePage/>} />
<Route path='/sell/items' element={ <SellItem/>} />
<Route path='/sell/vehicles' element={ <SellVehicles/>} />
<Route path='/sell/homes' element={ <SellHome/>} />
<Route path='/location' element={ <LocationPage/>} />
<Route path='/user-profile' element={ <ProfilePage/>} />
<Route path='/about' element={ <About/>} />
<Route path='*' element={ <PageNotFound/>} />

      </Routes>
  

    </>
  )
}

export default App
