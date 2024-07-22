import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es'; // Importar localización español
import './Citas.css';
import useAplication from '../../../Hooks/useAplication';
import axios from 'axios';
import WechCitas from './WechCitas';

const Api = import.meta.env.VITE_REACT_APP_URL;

const Citas = () => {
  const [listCitas, setlistCitas] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const [eventData, setEventData] = useState([]);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [selectedDayName, setSelectedDayName] = useState(''); // Nueva variable de estado
  const api = `${Api}/citas`;
  const { AddCrud } = useAplication();

  useEffect(() => {
    fetchEvents(); // Cargar eventos al cargar la página
  }, []);

  const fetchEvents = () => {
    axios.get(api)
      .then(res => setEventData(res.data.map(event => ({
        id: event.id,
        tite: event.Titulo,
        start: event.Fecha + 'T' + event.Hora,
        name: event.Paciente,
        phoneNumber: event.Phone,
        hours: event.Hora,
      }))))
      .catch(err => console.log(err));
  };

  const onSubmit = (data) => {
    const message = "La cita ha sido creada";
    AddCrud(api, data, message, reset,  fetchEvents);
  };

  const handleEventClick = (clickInfo) => {
    setlistCitas(false);
    const clickedDate = clickInfo.event.startStr.split('T')[0];
    const eventsForDay = eventData.filter(event => event.start.startsWith(clickedDate));
    setSelectedDayEvents(eventsForDay);

    // Obtener el nombre del día de la semana
    const date = new Date(clickedDate + 'T00:00:00'); // Asegurarse de que la hora sea 00:00:00
    const options = { weekday: 'long' };
    const dayName = date.toLocaleDateString('es-ES', options);
    setSelectedDayName(dayName);
  };

  const handleWhatsAppReminder = (event) => {
    const { tite, name, phoneNumber, hours } = event;
    const eventDate = new Date(event.start);
    const eventTime = new Date(`1970-01-01T${hours}`);
    const formattedTime = eventTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const message = `Hola ${name}, te recordamos tu cita ${tite} para el día ${eventDate.toLocaleDateString()} a las ${formattedTime}.`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=+57${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };

  const handleDelete = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar la cita?`)) {
      axios.delete(`${api}/${id}`)
        .then(() => {
          setEventData(eventData.filter((event) => event.id !== id));
          setSelectedDayEvents(selectedDayEvents.filter((event) => event.id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const cerrarList = () => {
    setlistCitas(true);
  };

  return (
    <div className="Citas">
      {
        listCitas
        ?(
          <div className="container">
          <div className="calendar-container">
            <h2>Calendario de Citas</h2>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={eventData}
              locale={esLocale} // Establecer la localización
              eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                meridiem: 'short'
              }}
              eventClick={handleEventClick}
            />
          </div>
          <div className="new-event-container">
            <h2>Nueva Cita</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="title">Título:</label>
                <input id="title" type="text" {...register('Titulo', { required: true })} />
              </div>
              <div className="form-group">
                <label htmlFor="name">Nombre del paciente:</label>
                <input id="name" type="text" {...register('Paciente', { required: true })} />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Número de Celular:</label>
                <input id="phoneNumber" type="tel" {...register('Phone', { required: true })} />
              </div>
              <div className="form-group">
                <label htmlFor="date">Fecha:</label>
                <input id="date" type="date" {...register('Fecha', { required: true })} />
              </div>
              <div className="form-group">
                <label htmlFor="time">Hora:</label>
                <input id="time" type="time" {...register('Hora', { required: true })} />
              </div>
              <button className='AddCite' type="submit">Agregar Cita</button>
            </form>
          </div>
        </div>
        ):(
          <div className= "EventList">
          <button className='Volver-add' onClick={cerrarList}>Volver</button>
          <h2>🏥Citas del {selectedDayName}</h2> {/* Actualizado para mostrar el nombre del día */}
          {selectedDayEvents.length === 0 ? (
            <p>No hay citas para este día.</p>
          ) : (
           <WechCitas handleDelete={handleDelete} handleWhatsAppReminder={handleWhatsAppReminder} selectedDayEvents={selectedDayEvents} formatTime={formatTime} setEventData={setEventData} setSelectedDayEvents={setSelectedDayEvents} eventData={eventData}/>
          )}
        </div>
        )
      }
    </div>
  );
};

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const hourInt = parseInt(hours, 10);
  const ampm = hourInt >= 12 ? 'PM' : 'AM';
  const formattedHours = hourInt % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
}

export default Citas;
