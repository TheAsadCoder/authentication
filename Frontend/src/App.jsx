import React from 'react'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify'
import Test from './pages/Test'

const App = () => {
  return (
    <div className=''>
        <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </div>
  )
}

export default App