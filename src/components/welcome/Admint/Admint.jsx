import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import './Adimt.css'

const Api = import.meta.env.VITE_REACT_APP_URL;

const Admint = ({setad}) => {
	const {register, handleSubmit, reset, setValue} = useForm();
	const id = localStorage.getItem("authId")
	const [Admin, setAdmin] = useState()
    const api = `${Api}/terapeutas/${id}`
	useEffect(() => {
		axios.get(api)
		.then(res => {
			setAdmin(res.data)
		    setad(res.data)
		})
		.catch(err => console.log(err))
	},[])

	useEffect(() => {
        if (Admin) {
            for (const key in Admin) {
                setValue(key, Admin[key]);
            }
        }
    }, [Admin, setValue]);
	const submit = (data) => {
		data.Rol = "Administrador"
		axios.put(`${Api}/terapeutas/${id}`, data)
		.then(res => {
			alert(`${res.data.message}`)
			console.log(res.data)
		})
		.catch(err => {
			alert("error")
			console.log(err)
		})
	}

  return (
	<div className='Admint'>
		<h1>Actualizate</h1>
		<form action="" onSubmit={(handleSubmit(submit))}>
			<div>
				<label htmlFor="">Nombres:</label>
				<input type="text" defaultValue={Admin?.Nombres} {...register("Nombres")}/>
			</div>
			<div>
				<label htmlFor="">Apellidos:</label>
				<input type="text" defaultValue={Admin?.Apellidos} {...register("Apellidos")}/>
			</div>
			<div>
				<label htmlFor="">Correo:</label>
				<input type="text" defaultValue={Admin?.Correo} {...register("Correo")}/>
			</div>
			<div>
				<label htmlFor="">Identificacion:</label>
				<input type="text" defaultValue={Admin?.Identificacion} {...register("Identificacion")}/>
			</div>
			<button>Actualizar</button>
		</form>
	</div>
  )
}

export default Admint