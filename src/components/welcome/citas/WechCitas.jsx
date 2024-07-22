import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
const Api = import.meta.env.VITE_REACT_APP_URL;

const WechCitas = ({ handleDelete, handleWhatsAppReminder, selectedDayEvents, formatTime, setEventData, setSelectedDayEvents, eventData }) => {
  const { handleSubmit, register, reset, setValue } = useForm();
const [Update, setUpdate] = useState(false)
const [Data, setData] = useState(null)
  const handleUpdate = (event) => {
	setUpdate(true)
    setValue('Titulo', event.tite);
    setValue('Paciente', event.name);
    setValue('Phone', event.phoneNumber);
    setValue('Fecha', event.start.split('T')[0]);
    setValue('Hora', event.hours);
	setData(event)
  };

  const actualizar = (data) => {
	const url = `${Api}/citas/${Data.id}`
	axios.put(url, data)
	  .then(res => {
		// Construye el nuevo evento actualizado
		const updatedEvent = {
		  id: Data.id,
		  tite: data.Titulo,
		  start: data.Fecha + 'T' + data.Hora,
		  name: data.Paciente,
		  phoneNumber: data.Phone,
		  hours: data.Hora,
		};
  
		// Actualiza el estado eventData y selectedDayEvents
		setEventData(prevEventData => prevEventData.map(event => event.id === Data.id ? updatedEvent : event));
		setSelectedDayEvents(prevSelectedDayEvents => prevSelectedDayEvents.map(event => event.id === Data.id ? updatedEvent : event));
  
		alert(res.data.message);
		setUpdate(false);
		reset();
	  })
	  .catch(err => {
		alert("Error al actualizar la cita");
	  });
  }
  
  const cerrarform = () => {
	setUpdate(false)
  }

  return (
    <ul className="List">
		<div className={Update ? 'Cita-Update' : "update-close"}>
      <form  className='Cita-Update-form' onSubmit={handleSubmit(actualizar)}>
		<div className='cerrarr'>
			<h1>Actualizar cita</h1>
		<i onClick={cerrarform} className='bx bx-x'></i>
		</div>
        <div className="form-group-update">
          <label htmlFor="title">Título:</label>
          <input id="title" type="text" {...register('Titulo', { required: true })} />
        </div>
        <div className="form-group-update">
          <label htmlFor="name">Nombre:</label>
          <input id="name" type="text" {...register('Paciente', { required: true })} />
        </div>
        <div className="form-group-update">
          <label htmlFor="phoneNumber">Número de Celular:</label>
          <input id="phoneNumber" type="tel" {...register('Phone', { required: true })} />
        </div>
        <div className="form-group-update">
          <label htmlFor="date">Fecha:</label>
          <input id="date" type="date" {...register('Fecha', { required: true })} />
        </div>
        <div className="form-group-update">
          <label htmlFor="time">Hora:</label>
          <input id="time" type="time" {...register('Hora', { required: true })} />
        </div>
        <button className='AddCite' type="submit">Actualizar Cita</button>
      </form>			
		</div>


      {selectedDayEvents?.map(event => (
        <li key={event.id} className="ListItem">
          <div className="ListItemContent">
            <strong className="ListItemTitle">{event.tite}</strong> {formatTime(event.hours)}<br />
            <span className="ListItemDetails">{event.name} - {event.phoneNumber}</span><br />
            <div className="ListItemActions">
              <button className="ActionButton whatsapp" onClick={() => handleWhatsAppReminder(event)}>Enviar WhatsApp</button>
              <button className="ActionButton update" onClick={() => handleUpdate(event)}>Actualizar Cita</button>
              <button className="ActionButton delete" onClick={() => handleDelete(event.id)}>Eliminar Cita</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WechCitas;
