import React from 'react'
import './Alergia.css'

const Alergia = ({alergias, RemoveAlergia}) => {
  return (
		<div className='Alergia'>
		<h3>Alergias...</h3>
		{
			alergias?.map(res => (
				<div key={res.id}>
				<li key={res.id}>🦠 {res.NombreAlergia}</li>
				<i onClick={() => RemoveAlergia(res.id)} className='bx bxs-trash Cancelar-deuda'></i>
				</div>
			))
		}
	</div>
  )
}

export default Alergia