import React from 'react'
import { useForm } from 'react-hook-form'
import useAplication from '../../../Hooks/useAplication';
const Api = import.meta.env.VITE_REACT_APP_URL;

const AddAlergia = ({pacienteId, onNew,  setAddnew}) => {
	const {register, handleSubmit, reset} = useForm()
	const {AddCrud}  = useAplication()
	const createAler = (data) => {
		const api = `${Api}/alergias`
		const message = "Alergia asociada"
		data.pacienteId = pacienteId;
       AddCrud(api, data, message, reset, onNew)
    }
  return (
	<form className='Add__form' action="" onSubmit={handleSubmit(createAler)}>
	<div>
		<label htmlFor="">Nombre de la alergia:</label>
		<input {...register("NombreAlergia")} type="text" required/>
	</div>
	<article className='Add__btn'>
			<button>Agregar</button>
			<button onClick={() => setAddnew(true)}>Cancelar</button>
			</article>
</form>
  )
}

export default AddAlergia