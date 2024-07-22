import React from 'react'
import './Error.css'

const Error = ({volver}) => {
  const Intentar = () => {
    volver(true)
  }
  return (
	<div className='Login__error'>
    <h1>Error</h1>
    <p>Lo siento pero tus datos no son los correctos, intenta de nuevo o restablece una nueva contraseña</p>
    <button onClick={Intentar}>Intentar de nuevo</button>
  </div>
  )
}

export default Error