import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import Navbar from './components/Navbar'
import Doctor from './pages/Doctor'
import Login from './pages/Login'
import About from './pages/About'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctor/>} />
        <Route path='/doctors/:speciality' element={<Doctor/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
        <Route path='/appointment/:docId' element={<Appointment/>} />
       </Routes>
       <Footer/>

    </div>
  )
}

export default App
