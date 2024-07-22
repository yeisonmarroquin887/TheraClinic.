import React from 'react'
import './Medicamentos.css'

const Medicamento = ({medicamento}) => {
  return (
	<div className='Medicamento'>
		<h3>Medicamentos...</h3>
		<div className='Medicamento__info'>
			{
				medicamento?.map(res => (
					<div>
						<h3>💊</h3>
						<h4> {res.NombreMedicamento}</h4>
						<p><b>Descripcion:</b> {res.Descripcion} </p>
						<p><b>Fecha:</b> {res.Fecha} </p>
					</div>
				))
			}
		</div>
	</div>
  )
}

export default Medicamento