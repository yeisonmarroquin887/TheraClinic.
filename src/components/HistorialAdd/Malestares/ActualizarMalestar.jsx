import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import './Malestar.css'

const Api = import.meta.env.VITE_REACT_APP_URL;

const ActualizarMalestar = ({ dataActualizar, setUpdate, setPacienteOne, PacienteOne }) => {
    const { register, handleSubmit, reset, setValue } = useForm();
	const dispatch = useDispatch();

    useEffect(() => {
        if (dataActualizar) {
            for (const key in dataActualizar) {
                setValue(key, dataActualizar[key]);
            }
        }
    }, [dataActualizar, setValue]);

    const onSubmit = (data) => {
        console.log(data);
        // Aquí puedes hacer la petición de actualización usando axios
        axios.put(`${Api}/malestares/${dataActualizar.id}`, data)
            .then(response => {
                alert(response.data.message);
                setUpdate(false); 
				dispatch(setPacienteOne({
					...PacienteOne,
                    malestars: PacienteOne.malestars.map(malestar => 
                        malestar.id === dataActualizar.id ? { ...malestar, ...data } : malestar
                    )
                }));
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <form className="ActualizarMalestar" onSubmit={handleSubmit(onSubmit)}>
            <div className="ActualizarMalestar-group">
                <label htmlFor="NombreMalestar">Nombre del Malestar</label>
                <input {...register("NombreMalestar")} type="text" id="NombreMalestar" required />
            </div>
            <div className="ActualizarMalestar-group">
                <label htmlFor="Desde">Desde cuando lo tiene</label>
                <input {...register("Desde")} type="date" id="Desde" required />
            </div>
            <div className="ActualizarMalestar-group">
                <label htmlFor="Zona">Zona donde le duele</label>
                <input {...register("Zona")} type="text" id="Zona" required />
            </div>
            <div className="ActualizarMalestar-buttons">
                <button type="submit">Actualizar</button>
                <button type="button" onClick={() => setUpdate(false)}>Cancelar</button>
            </div>
        </form>
    );
};

export default ActualizarMalestar;
