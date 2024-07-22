import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
const Api = import.meta.env.VITE_REACT_APP_URL;
import './UpdateClave.css'

const UpdatePassword = () => {
const {handleSubmit, register, reset} = useForm()
const {terapeutaId} = useParams()
const navigate = useNavigate()
const submit = (data) => {
	data.terapeutaId = terapeutaId;
	axios.post(`${Api}/terapeutas/update-password`, data)
	.then(res => {
		alert("Contraseña actualizada")
		navigate("/")
	})
	.catch(err => {
		alert("Error al actualizar la contraseña")
	})
}

  return (
	<div>
		<header className='Login__header  View__Email'>
			<h1>TheraClinic</h1>
			<h2>Terapias Alternativas</h2>
		</header>
		<div className="form-Update-clave">
		
            <form  onSubmit={handleSubmit(submit)} >
                <div>
                    <label htmlFor="password">Nueva contraseña</label>
                    <input {...register("Contraseña")} type="text" id="password" required />
                </div>
                <button>Enviar</button>
            </form>
        </div>
	</div>
	
  )
}

export default UpdatePassword