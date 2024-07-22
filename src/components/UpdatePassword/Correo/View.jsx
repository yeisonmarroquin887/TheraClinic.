import React from 'react'
import Header from '../../welcome/header/Header'
import './View.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Api = import.meta.env.VITE_REACT_APP_URL;

const View = ({setUpdatePassword}) => {
	const {handleSubmit, register, reset} = useForm();
	const volver = () => {
        setUpdatePassword(true)
    }

	const submit = (data) => {
		const urlfront = "http://localhost:5173"
		data.urlfront = urlfront;
		axios.post(`${Api}/terapeutas/verify`, data)
		.then(res => {
			alert(res.data.message)
			setUpdatePassword(true)
		})
		.catch(err => {
			alert("Tu correo no existe lo siento")
		})
	}

  return (
	<div>
		<button onClick={volver} className='Volver'>Volver</button>
		<header className='Login__header  View__Email'>
			<h1>TheraClinic</h1>
			<h2>Terapias Alternativas</h2>
		</header>
		<form className='View__Email-form' onSubmit={handleSubmit(submit)}>
			<h1>Envia el correo con el cual estas registrado...</h1>
			<div>
				<label htmlFor="">correo:</label>
				<input {...register("Correo")} type="text" />
			</div>
			<button>Enviar</button>
		</form>
	</div>
  )
}

export default View