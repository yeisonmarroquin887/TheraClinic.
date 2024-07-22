import React from 'react'
import { useForm } from 'react-hook-form'
import useAplication from '../../../Hooks/useAplication'
const Api = import.meta.env.VITE_REACT_APP_URL;

const AddMedicamento = ({pacienteId, onNew}) => {
	const {register, handleSubmit,reset} = useForm()
const { AddCrud } = useAplication()
	const createMedicamento = (data) => {
		const api = `${Api}/medicamentos`
		const message = "el medicamento ha sido asociado"
		data.pacienteId = pacienteId;
        AddCrud(api, data, message, reset, onNew)
    }
	return (
		<form className='Add__form' action="" onSubmit={handleSubmit(createMedicamento)}>
			<div>
				<label htmlFor="">Nombre del medicamento resetado:</label>
				<input {...register("NombreMedicamento")} type="text" required />
			</div>
			<div>
				<label htmlFor="">Descripcion:</label>
				<input {...register("Descripcion")} type="text" required />
			</div>
			<article className='Add__btn'>
			<button>Agregar</button>
			<button>Cancelar</button>
			</article>
		</form>
	)
}

export default AddMedicamento