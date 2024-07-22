import React from 'react'
import './Enfermedad.css'

const Enfermedades = ({enfermedades, RemoveEnfermedad}) => {
  return (
	<div className='Enfermedades'>
		<h3>Patologias...</h3>
		{
			enfermedades?.enfermedads?.map(res => (
				<div key={res.id}>
				<li key={res.id}> 🧬{res.NombreEnfermedad}</li>
				<i onClick={() => RemoveEnfermedad(res.id)} className='bx bxs-trash Cancelar-deuda'></i>
				</div>
			))
		}
	</div>
  )
}

export default Enfermedades