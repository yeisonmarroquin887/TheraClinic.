import React, { useState } from 'react'
import Error from './Error/Error'
import './login.css'
import useAutentication from '../../Hooks/useAutenticatin'
import { useForm } from 'react-hook-form'
import Loading from '../Loading/Loading'

const Login = ({setUpdatePassword}) => {
    const [Loding, setLoding] = useState(true);
	const [ErrorDatos, setErrorDatos] = useState(true)
	const {Autentication} = useAutentication()

	const {handleSubmit, register, reset} = useForm()
	const submit = (data) => {
		 data.Identificacion = parseInt(data.Identificacion)
		 const datos = data
		
		Autentication(datos, setErrorDatos, reset, setLoding) 
		setLoding(false)
	}

  return (
	<div className='Login'>
		<div className={ErrorDatos ? "error__oculto"  : "error"}>
			<Error volver={setErrorDatos}/>
		</div>
		<header className='Login__header'>
			<h1>TheraClinic</h1>
			<h2>Terapias Alternativas</h2>
		</header>
		<form className='Login__form' onSubmit={handleSubmit(submit)}>
			<figure className='Login__figure'>
				<img src="../../../images/Login.png" alt="imagen" />
			</figure>
			<div className='Login__datos'>
				<div>
					<label htmlFor="">Identificacion:</label>
					<input {...register("Identificacion")} type="number" required/>
				</div>
				<div>
					<label htmlFor="">Contraseña:</label>
					<input {...register("Contraseña")} type="password" required/>
				</div>
				<h3 onClick={() => setUpdatePassword(false)}>Olvido de contraseña</h3>
				<button>Ingresar</button>
			</div>
		</form>
		<div className={Loding ? "none" : "Loading"}> 
			<Loading/>
		</div>
	</div>
  )
}

export default Login