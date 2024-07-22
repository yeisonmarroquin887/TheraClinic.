import React from 'react'
import { useForm } from 'react-hook-form'
import useAplication from '../../../Hooks/useAplication';
const Api = import.meta.env.VITE_REACT_APP_URL;

const AddMalestares = ({pacienteId, onNew, setAddnew}) => {
	const {register, handleSubmit, reset} = useForm();
	const {AddCrud}  = useAplication()
	const createMalestar = (data) => {
		const api = `${Api}/malestares`
		const message = "Malestar asociado"
		data.pacienteId = pacienteId;
       AddCrud(api, data, message, reset, onNew)
    }
  return (
	<form className='Add__form' action="" onSubmit={handleSubmit(createMalestar)}>
	<div>
		<label htmlFor="">Nombre del Malestar:</label>
		<input {...register("NombreMalestar")} type="text" required />
	</div>
	<div>
		<label htmlFor="">Desde cuando lo tiene:</label>
		<input {...register("Desde")} type="date" required/>
	</div>
	<div>
		<label htmlFor="">Zona donde le duele:</label>
		<input {...register("Zona")} type="text" required/>
	</div>
	<article className='Add__btn'>
			<button>Agregar</button>
			<button onClick={() => setAddnew(true)}>Cancelar</button>
			</article>
</form>
  )
}

export default AddMalestares