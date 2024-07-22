import React, { useState } from 'react'
import './Menu.css'
import Admint from '../Admint/Admint'

const Menu = ({option, cerrar, Active, ActiveCita, ActiveAdmin}) => {

	const [ad, setad] = useState()

	const closhet = () => {
		cerrar(false)
	}

  return (
	<section className='Menu'>
		<div className='Menu__exit'>
			<i onClick={closhet} className='bx bx-x'></i>
		</div>
		<header className='Menu__header'>
			<div>
			<figure>
			<i className='bx bxs-user'></i>
			</figure>
			<div>
			<h1>{ad?.Nombres}</h1>
			<h3>Admin</h3>						
			</div>
		<div className='adddcuh'>
			<Admint setad={setad}/>
		</div>
			</div>
			<i onClick={() => option(3)} className={ActiveAdmin ? 'Active-Admin bx bxs-down-arrow' : 'Off-Admin bx bxs-down-arrow'}></i>
		</header>
		<div className='Menu__buttons'>
			<button className={Active ? 'Pacientes___Button-active' : 'Pacientes___Button'} onClick={() => option(0)} ><span><i className='bx bxs-user'></i>Pacientes </span><i className='bx bxs-down-arrow'></i></button>
			<button  className={ActiveCita ?'Citas___Button' : 'Citas___Button-active'} onClick={() => option(2)} ><span><i className='bx bxs-layer'></i> Citas</span><i className='bx bxs-down-arrow'></i></button>
		</div>
	</section>
  )
}

export default Menu