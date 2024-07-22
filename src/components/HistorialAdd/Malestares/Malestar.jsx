import React, { useState } from 'react'
import './Malestar.css'
import { useForm } from 'react-hook-form'
import ActualizarMalestar from './ActualizarMalestar'

const Malestar = ({ malestar, RemoveMalestar, setPacienteOne, PacienteOne }) => {

    const [update, setUpdate] = useState(false);
  const [dataActualizar, setDataActualizar] = useState(null);
	const { handleSubmit, register, reset } = useForm()

	const updateMalestar = (data) => {
		setDataActualizar(data);
		setUpdate(true);
	}

	const submit = () => {

	}

	return (
		<div className='Malestar'>
			<h3>Malestares principales...</h3>
			<div>
				{
					malestar?.map(res => (
						<div className='Malestar__info'>
							<h4>🤕</h4>
							<p>{res.NombreMalestar}</p>
							<li><b>Zona:</b> {res.Zona} </li>
							<li><b>Desde:</b> {res.Desde} </li>
							<div>
								<button onClick={() => updateMalestar(res)} className='btn1'>Actualizar</button>
								<button onClick={() => RemoveMalestar(res.id)} className='btn2'>Eliminar</button>
							</div>
						</div>
					))
				}
			</div>
			{update && (
                <ActualizarMalestar
                    dataActualizar={dataActualizar}
                    setUpdate={setUpdate}
					setPacienteOne={setPacienteOne}
					PacienteOne={PacienteOne}
                />
            )}

		</div>
	)
}

export default Malestar