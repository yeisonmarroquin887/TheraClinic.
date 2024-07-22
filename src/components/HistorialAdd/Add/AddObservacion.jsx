import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useAplication from '../../Hooks/useAplication';
import axios from 'axios';
import '../../pages/Historial/PacienteId.css'

const Api = import.meta.env.VITE_REACT_APP_URL;

const AddObservacion = ({ pacienteId, onNew, setAddObservaciones }) => {
    const { handleSubmit, register, reset, setValue } = useForm();
    const { AddCrud } = useAplication();
    const api = `${Api}/observaciones`;

    const submit = (data) => {
        const message = "La observación ha sido asociada";
        data.pacienteId = pacienteId;
        AddCrud(api, data, message, reset, onNew);
    };

const AddCerrar = () => {
    setAddObservaciones(false)
}
   

    return (
        <form onSubmit={handleSubmit(submit)} className='Paciente__observacion'>
            <label htmlFor="observaciones">Agregar observacion</label>
            <div>
                <input type="text" {...register("text")} />
				<input type="date"  {...register("fecha")}/>
            </div>
            <nav className='buttons-add'>
            <button className='Obrvaciom-btn'>Ingresar</button>
            <p onClick={AddCerrar} className='Obrvaciom-btn'>Cancelar</p>
            </nav>

        </form>
    );
}

export default AddObservacion;
