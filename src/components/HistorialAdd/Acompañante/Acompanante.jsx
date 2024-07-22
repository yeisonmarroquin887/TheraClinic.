import React, { useState } from 'react'
import './Acompañante.css'
import AddAcompañante from '../../welcome/addpacientes/AddAcompañante'
import axios from 'axios'
import getConfingToken from '../../../utils/getConfingToken';
import { useDispatch } from 'react-redux';
const Api = import.meta.env.VITE_REACT_APP_URL;

const Acompanante = ({paciente, onNew, setPacienteOne}) => {
	const dispatch = useDispatch(); 
	const [Add, setAdd] = useState(false)

	const idPaciente = () => {
		localStorage.setItem("IdPaciente", paciente.id)
		setAdd(true)
	}
	const cerrarAdd = () => {
		localStorage.removeItem("IdPaciente")
		setAdd(false)
	}

	const remove = (id) => {
		axios.delete(`${Api}/acompanantes/${id}`, getConfingToken())
		  .then(res => {
			alert(`${res.data.message}`);
			dispatch(setPacienteOne({
			  ...paciente,
			  acompañantes: paciente.acompañantes.filter(acompañante => acompañante.id !== id)
			}));
		  })
		  .catch(err => {
			console.log(err);
			alert('Error al eliminarlo');
		  });
	  };

  return (
	<div className='Acompañante'>
		<h3>Acompañante...  <span onClick={idPaciente}>Crear nuevo acompañante</span></h3>
		<div className={Add ?"ver" :"nover"}>
			<span onClick={cerrarAdd} className='cerrarAddA'>Cerrar</span>
			<AddAcompañante onNew={onNew} setAdd={setAdd}/>
		</div>
		{
		paciente?.acompañantes?.map(res => (
			<ul key={paciente?.id}>
			   <li><b>Nombres y apellidos:</b> {res.Nombres}</li>
			   <li><b>Telefono:</b> {res.Telefono}</li>
			   <div>
				<button>Mensage</button>
				<button onClick={() => remove(res.id)}>Eliminar</button>
			   </div>
	    	</ul>
		))			
		}

	</div>
  )
}

export default Acompanante