import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Sell from './components/Sell'
import Profile from './components/Profile'
import About from './pages/AboutPage'
import Header from './components/Header'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import PageNotFound from './components/PageNotFound'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
      <Routes>

<Route path='/' element={ <Home/>} />
<Route path='/sell' element={ <Sell/>} />
<Route path='/profile' element={ <Profile/>} />
<Route path='/about' element={ <About/>} />
<Route path='*' element={ <PageNotFound/>} />

      </Routes>
  

    </>
  )
}

export default App
