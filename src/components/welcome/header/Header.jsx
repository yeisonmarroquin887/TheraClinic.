import React, { useEffect, useState } from 'react'
import './Header.css'

const Header = ({cerrar}) => {

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora 0 debe ser 12
    const strTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    return strTime;
  };

  return (
	<div className='Header'>
      <div>
        <figure>
          <img src="../../../../images/logo.png" alt="Logo" />
        </figure>
        <h1>Nufacol</h1>
      </div>
      <h1 className='Hora'>{formatTime(time)}</h1>
          <button className='Cerrar-Sesion' onClick={cerrar}>Cerrar sesión </button>
	</div>
  )
}

export default Header