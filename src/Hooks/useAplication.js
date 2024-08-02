import axios from "axios";
import { useState } from "react"
import getConfingToken from "../utils/getConfingToken";
import { useNavigate } from "react-router-dom";
const Api = import.meta.env.VITE_REACT_APP_URL;

const useAplication = () => {
    const navigate = useNavigate()
	const [Pacientes, setPacientes] = useState(null)
	const GetPacientes = () => {
			axios.get(`${Api}/pacientes`, getConfingToken())
			.then((res) => {setPacientes(res.data)})
			.catch(err => console.log(err))
	}

	const CreatePaciente = (data, reset, setAddAcom) => {
		console.log(data)
		axios.post(`${Api}/pacientes`, data, getConfingToken())
		.then((res) => {
			
			reset()
			localStorage.setItem("IdPaciente", res.data.Usuario.id)
			console.log(res.data)
			const userChoice = window.confirm(`Paciente creado exitosamente. ¿Deseas agregar el acompañante? Si no, serás redirigido a la historia clínica.`);
			if(userChoice){
				setAddAcom(false)
			}else{
				let id = localStorage.getItem("IdPaciente")
				navigate(`/historia/${id}`)
			}
		})
		.catch(err => {
			alert("Lo siento pero el Usuario no se pudo crear")
			console.log(err)
			reset()
			setAddAcom(true)
		})
	}

	const CreateAcompañante = (data, reset, onNew, setAdd) => {
		if(!localStorage.getItem("IdPaciente")) return "no se puede crear"
		data.pacienteId = localStorage.getItem("IdPaciente");
		console.log(data)
		axios.post(`${Api}/acompanantes`, data, reset, getConfingToken())
		.then(res => {
			alert("Acompañante asociacdo");			
			reset();
			setAdd(true)
			let id = localStorage.getItem("IdPaciente")
				navigate(`/historia/${id}`)
			localStorage.removeItem("authToken")
			if (onNew) {
				onNew(res.data.Usuario);
			}
		})
		.catch(err => {
			alert("Error al crear el acompañamte")
			reset()
			console.log(err)
			localStorage.removeItem("authToken")
		})
	}

	const AddCrud = (url, data, message, reset, onNew) => {
		axios.post(url, data, getConfingToken())
		.then(res => {
			alert(`${message}`)
			reset()
			if (onNew) {
				onNew(res.data.Usuario);
			}
			
		})
		.catch(err => {
			alert("Error al hacer el registros")
			console.log(err)
		})
	}
	return {GetPacientes, Pacientes, CreatePaciente, AddCrud, CreateAcompañante}
}

export default useAplication