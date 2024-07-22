import React from 'react'
import './Loading.css'

const Loading = () => {
  return (
	<div class="loader-container">
	<div class="loader">
		<div class="loading-circle"></div>
		<div class="loading-circle"></div>
		<div class="loading-circle"></div>
	</div>
	<h1 class="loading-text">Cargando...</h1>
	<p class="subtitle">TheraClinic - Cuidando tu salud</p>
</div>
  )
}

export default Loading