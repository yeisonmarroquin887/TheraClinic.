import React, { useState } from 'react'
import './Welcome.css'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/welcome/header/Header'
import Menu from '../../components/welcome/menu/Menu'
import Paciente from '../../components/welcome/pacientes/Paciente'
import AddPaciente from '../../components/welcome/addpacientes/AddPaciente'
import Citas from '../../components/welcome/citas/Citas'
import Admint from '../../components/welcome/Admint/Admint'

const Welcome = () => {
  const navigate = useNavigate()
const [Active, setActive] = useState(true)
const [ActiveCita, setActiveCita] = useState(true)
const [ActiveAdmin, setActiveAdmin] = useState(false)

  const cerrar = () => {
    localStorage.removeItem("authToken")
        localStorage.removeItem("IdPaciente")
        localStorage.removeItem("i18nextLng")
        localStorage.removeItem("authId")
    navigate("/")
  }
  const [Num, setNum] = useState(null)

  const option = (n) => {
    switch (n) {
      case 0:
        setNum(0)
        setActive(true)
        setActiveCita(true)
        setActiveAdmin(false)
        break;
      case 1:
        setNum(1)
        setActive(true)
        setActiveCita(true)
        setActiveAdmin(false)
        break;
        case 2:
          setNum(2)
          setActive(false)
          setActiveCita(false)
          setActiveAdmin(false)
          break;

          case 3:
            setNum(3)
            setActiveAdmin(true)
            setActive(false)
            setActiveCita(true)
            break
    
      default:
        break;
    }
  }
  const [MenuA, setMenuA] = useState(false)

  const AbrirMenu = () => {
    setMenuA(true)
  }


  return (
	<div className='Welcome'>
    <header className='Welcome__header'>
      <Header cerrar={cerrar}/>
    </header>

    <section className='Welcome__Info'>
    <div className='menu'>
      <i onClick={AbrirMenu} className='bx bx-menu-alt-left' ></i>
      </div>
      <article className={MenuA ? "Welcome__Menu" : "Menu__clochet"}>
        <Menu cerrar={setMenuA} option={option} Active={Active} ActiveCita={ActiveCita} ActiveAdmin={ActiveAdmin}/>
      </article>
      <article className='Welcome__Information'>
        {
          Num === 0 ?(
            <Paciente option={option} cerrar={cerrar}/>
          ):
          Num === 1 ? (
            <AddPaciente option={option}/>
          ) : Num === 2 ?(
            <Citas/>
          ): Num === 3?(
          <Admint/>
          ):( 
          <Paciente option={option}/>
        )
        }
      </article>
    </section>

  </div>
  )
}

export default Welcome