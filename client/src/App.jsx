import React from 'react'
import Header from './Components/Header'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Quiz from './Pages/Quiz'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TextExtractor from './Pages/Text_Extractor'
import Register from './AuthPages/Register'
import Login from './AuthPages/Login'
import VerifyEmail from './AuthPages/VerifyEmail'


function App() {
  return (
    <div className=''>
      <BrowserRouter >
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/text-extractor' element={<TextExtractor />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
