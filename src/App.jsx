import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Welcome from './pages/paciente/Welcome'
import PacienteId from './pages/Historial/PacienteId'
import Examenes from './pages/Examenes/Examenes'
import UpdatePassword from './pages/UpdatePassword/UpdatePassword'

function App() {

  
  
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/welcome' element={<Welcome/>}/>
      <Route path='/update/:code/:terapeutaId' element={<UpdatePassword/>}/>
      <Route path='/historia/:pacienteId' element={<PacienteId/>}/>
      <Route path='/historia/examenes/:pacienteId' element={<Examenes/>}/>
     </Routes>
    </>
  )
}

export default App
