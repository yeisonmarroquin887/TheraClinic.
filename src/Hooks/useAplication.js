import axios from "axios";
import { useState } from "react"
import getConfingToken from "../utils/getConfingToken";
const Api = import.meta.env.VITE_REACT_APP_URL;

const useAplication = () => {

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
			alert(`${res.data.message}`)
			reset()
			setAddAcom(false)
			localStorage.setItem("IdPaciente", res.data.Usuario.id)
			console.log(res.data)
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