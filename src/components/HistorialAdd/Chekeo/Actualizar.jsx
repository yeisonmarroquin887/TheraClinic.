import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
const Api = import.meta.env.VITE_REACT_APP_URL;

const Actualizar = ({ dataActualizar, Update, setUpdate }) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    
    const [malestars, setmalestars] = useState()

    useEffect(() => {
        // Establecer valores del formulario cuando dataActualizar cambie
        if (dataActualizar) {
            for (const key in dataActualizar) {
                setValue(key, dataActualizar[key]);
            }
        }
    }, [dataActualizar, setValue]);

    const onSubmit = (data) => {
        console.log(data);
        data.Malestar = data.malestarId
        // Aquí puedes hacer la petición de actualización usando axios
        axios.put(`${Api}/visitas/${dataActualizar.id}`, data)
            .then(response => {
                alert(response.data.message);
                setUpdate(false); // Cerrar el formulario después de la actualización
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        axios.get(`${Api}/malestares`)
        .then(res => setmalestars(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <form className={Update ? 'Update' : 'Update__close'} onSubmit={handleSubmit(onSubmit)}>
            <div className='Update_chekeo'>
                <div className="Update-group">
                    <label htmlFor="sistolica">Sistólica</label>
                    <input {...register("Sistolica")} type="number" id="sistolica" required />
                </div>
                <div className="Update-group">
                    <label htmlFor="diastolica">Diastólica</label>
                    <input type="number" {...register("Diastolica")} id="diastolica" required />
                </div>
                <div className="Update-group">
                    <label htmlFor="pulsaciones">Pulsaciones</label>
                    <input type="number" {...register("Pulsaciones")} id="pulsaciones" required />
                </div>
                <div className="Update-group">
            <label htmlFor="">Altura</label>
            <input {...register("Altura")} type="number" step="0.01" min="0" max="3" required />
          </div>
          <div className="Update-group">
            <label htmlFor="">Peso</label>
            <input {...register("Peso")} type="number" required />
          </div>
                <div className="Update-group">
                    <label htmlFor="glucosa">Glucosa</label>
                    <input type="number" {...register("Glucosa")} id="glucosa" required />
                </div>
                <div className="Update-group">
                    <label htmlFor="digestion">Digestión</label>
                    <input type="text" {...register("Digestion")} id="digestion" required />
                </div>
                <div className="Update-group">
                    <label htmlFor="Cirugias">Cirugias</label>
                    <textarea type="text" {...register("Cirugias")} id="Cirugias"  required />
                </div>
                <div className="Update-group">
                    <label htmlFor="observacion">Observación</label>
                    <textarea type="text" {...register("Observacion")} id="observacion" required />
                </div>
                <div className="Update-group">
                    <label htmlFor="problemasEquilibrio">Problemas de Equilibrio</label>
                    <select {...register("ProblemasEquilibrio")} id="problemasEquilibrio" required>
                        <option value="">Seleccione una opción</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="Update-group">
                    <label htmlFor="dolorCabeza">Dolor de cabeza</label>
                    <select {...register("DolorCabeza")} id="dolorCabeza" required>
                        <option value="">Seleccione una opción</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="Update-group">
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
                <div className="Update-group">
                    <label htmlFor="recomendacion">Recomendación</label>
                    <textarea type="text" {...register("Recomendacion")} id="recomendacion" required />
                </div>
            </div>

            <div className="Update-buttons">
                <button type="submit">Actualizar</button>
                <button type="button" onClick={() => setUpdate(false)}>Cancelar</button>
            </div>
        </form>
    );
};

export default Actualizar;
