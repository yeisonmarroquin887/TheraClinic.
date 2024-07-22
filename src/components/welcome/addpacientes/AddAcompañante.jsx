import React from 'react'
import { useForm } from 'react-hook-form'
import useAplication from '../../../Hooks/useAplication';
import './Addpaciente.css'

const AddAcompañante = ({onNew, setAdd}) => {
  const {handleSubmit, register, reset} = useForm();
  const {CreateAcompañante} = useAplication();

  const submit = (data) => {
	CreateAcompañante(data, reset, onNew, setAdd)
  }

  return (
	<form className='AddAcompañante' onSubmit={handleSubmit(submit)}>
		 <h1 className='AddTitle'>Asociar acompañante</h1>
		 <div>
		<div>
			<label htmlFor="">Nombre y apellidos</label>
			<input {...register("Nombres")} type="text" required />
		</div>
		<div>
			<label htmlFor="">Telefono</label>
			<input {...register("Telefono")} type="number" required/>
		</div>			
		 </div>

		<button>Agregar</button>
	</form>
  )
}

export default AddAcompañante