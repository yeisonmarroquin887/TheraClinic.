import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './Add.css'
import useAplication from '../../../Hooks/useAplication'
import axios from 'axios';
const Api = import.meta.env.VITE_REACT_APP_URL;

const Addchekeo = ({pacienteId, onNew, setAddnew}) => {
    const { handleSubmit, reset, register } = useForm()
    const { AddCrud } = useAplication();
    const [malestars, setmalestars] = useState()

    const submit = async (data) => {
        const api = `${Api}/visitas`
        const message = "chekeo asociado"
		data.pacienteId = pacienteId;
        data.FechaAdd = new Date().toISOString().split('T')[0]; 
		data.HoraAdd = new Date().toTimeString().split(' ')[0];
        data.Malestar = data.malestarId
		console.log(data)
		AddCrud(api, data, message, reset, onNew)
    }

    useEffect(() => {
        axios.get(`${Api}/malestares`)
        .then(res => setmalestars(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <form className='Add__form-chekeo' onSubmit={handleSubmit(submit)} action="">
            <div>
                <div>
                    <label htmlFor="sistolica">Sistólica</label>
                    <input {...register("Sistolica")} type="number" id="sistolica"  required />
                </div>
                <div>
                    <label htmlFor="diastolica">Diastólica</label>
                    <input type="numero" {...register("Diastolica")} id="diastolica"  required />
                </div>
                <div>
                    <label htmlFor="pulsaciones">Pulsaciones</label>
                    <input type="numero" {...register("Pulsaciones")} id="pulsaciones"  required />
                </div>
                <div>
                    <label htmlFor="glucosa">Glucosa</label>
                    <input type="numero" {...register("Glucosa")} id="glucosa"   required/>
                </div>
                <div>
            <label htmlFor="">Altura</label>
            <input {...register("Altura")} type="number" step="0.01" min="0" max="3" required />
          </div>
          <div>
            <label htmlFor="">Peso</label>
            <input {...register("Peso")} type="number" required />
          </div>
                <div>
                    <label htmlFor="digestion">Digestión</label>
                    <input type="text" {...register("Digestion")} id="digestion"  required />
                </div>
                <div>
                    <label htmlFor="Cirugias">Cirugias</label>
                    <textarea type="text" {...register("Cirugias")} id="Cirugias"  required />
                </div>
                <div>
                    <label htmlFor="observacion">Observación</label>
                    <textarea type="text" {...register("Observacion")} id="observacion"   required/>
                </div>
                <div>
                    <label htmlFor="problemasEquilibrio">Problemas de Equilibrio</label>
                   <select name="" id="" {...register("ProblemasEquilibrio")}>
					<option value="nada"> Seleccione una opcion</option>
					<option value="si">Si</option>
					<option value="no">No</option>
				   </select>
                </div>
                <div>
                    <label htmlFor="DolorCabeza">Dolor de cabeza</label>
                   <select name="" id="" {...register("DolorCabeza")}>
					<option value="nada"> Seleccione una opcion</option>
					<option value="si">Si</option>
					<option value="no">No</option>
				   </select>
                </div>
                <div>
                    <label htmlFor="malestar">Malestar</label>
                    <select name="" id="" {...register("malestarId")}>
                        <option value="">Selecciona un malestar</option>
                        {
                            malestars?.map(res => (
                                <option value={res.id}>{res.NombreMalestar}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="Recomendacion">Recomendacion</label>
                    <textarea type="text" {...register("Recomendacion")} id="Recomendacion"  required />
                </div>
            </div>
            
            <article className='Add__btn-chekeo'>
                <button type="submit">Agregar</button>
                <button type="button" onClick={() => setAddnew(true)}>Cancelar</button>
            </article>
        </form>
    )
}

export default Addchekeo
