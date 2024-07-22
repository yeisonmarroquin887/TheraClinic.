import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
const Api = import.meta.env.VITE_REACT_APP_URL;

const Actualizar = ({ dataActualizar, Update, setUpdate }) => {
    const { register, handleSubmit, reset, setValue } = useForm();

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
                    <label htmlFor="glucosa">Glucosa</label>
                    <input type="number" {...register("Glucosa")} id="glucosa" required />
                </div>
                <div className="Update-group">
                    <label htmlFor="digestion">Digestión</label>
                    <input type="text" {...register("Digestion")} id="digestion" required />
                </div>
                <div className="Update-group">
                    <label htmlFor="observacion">Observación</label>
                    <input type="text" {...register("Observacion")} id="observacion" required />
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
                    <input type="text" {...register("Malestar")} id="malestar" required />
                </div>
                <div className="Update-group">
                    <label htmlFor="recomendacion">Recomendación</label>
                    <input type="text" {...register("Recomendacion")} id="recomendacion" required />
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
