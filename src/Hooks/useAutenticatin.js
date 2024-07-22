import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Api = import.meta.env.VITE_REACT_APP_URL;

const useAutentication = () => {
	const navigate = useNavigate()
	const Autentication = (datos, setErrorDatos, reset, setLoding) => {
		axios.post(`${Api}/terapeutas/login`, datos)
		.then(res => {
			localStorage.setItem("authToken", res.data.token)
			localStorage.setItem("authId", res.data.user.id)
			if(localStorage.getItem("authToken")){
				navigate("/welcome")
				setLoding(true)
			}else {
				navigate("/")
			}
		})
		.catch(err => {
			setErrorDatos(false)
			setLoding(true)
			reset()
			console.log(err)
		})
	}

	return {Autentication}
}

export default useAutentication;