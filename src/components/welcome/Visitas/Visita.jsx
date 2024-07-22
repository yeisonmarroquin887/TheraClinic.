import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Visita.css';
import useAplication from '../../../Hooks/useAplication';

const Api = import.meta.env.VITE_REACT_APP_URL;
const Visita = ({pacienteId, onNew, option}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {AddCrud} = useAplication()
const url = `${Api}/visitas`
  const onSubmit = async (data) => {
	const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    data.FechaAdd = today;
	data.pacienteId = pacienteId;
	const message = "La visita ha sido creada"
	AddCrud(url, data, message, onNew, option)
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registro de Visita</h2> 
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
		<div>

        <div className="form-group">
          <label className="form-label">Sistólica</label>
          <input className="form-input" type="number" {...register('Sistolica', { required: true })} />
          {errors.Sistolica && <span className="form-error">Sistólica es requerida</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Diastólica</label>
          <input className="form-input" type="number" {...register('Diastolica', { required: true })} />
          {errors.Diastolica && <span className="form-error">Diastólica es requerida</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Pulsaciones</label>
          <input className="form-input" type="number" {...register('Pulsaciones', { required: true })} />
          {errors.Pulsaciones && <span className="form-error">Pulsaciones son requeridas</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Glucosa</label>
          <input className="form-input" type="text" {...register('Glucosa', { required: true })} />
          {errors.Glucosa && <span className="form-error">Glucosa es requerida</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Digestión</label>
          <input className="form-input" type="text" {...register('Digestion', { required: true })} />
          {errors.Digestion && <span className="form-error">Digestión es requerida</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Observación</label>
          <input className="form-input" type="text" {...register('Observacion', { required: true })} />
          {errors.Observacion && <span className="form-error">Observación es requerida</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Problemas de Equilibrio</label>
          <select className="form-input" {...register('ProblemasEquilibrio', { required: true })}>
            <option value="">Seleccione</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
          {errors.ProblemasEquilibrio && <span className="form-error">Problemas de equilibrio es requerido</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Dolor de Cabeza</label>
          <select className="form-input" {...register('DolorCabeza', { required: true })}>
            <option value="">Seleccione</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
          {errors.DolorCabeza && <span className="form-error">Dolor de cabeza es requerido</span>}
        </div>

		</div>
        
        <button className="form-button" type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Visita;
