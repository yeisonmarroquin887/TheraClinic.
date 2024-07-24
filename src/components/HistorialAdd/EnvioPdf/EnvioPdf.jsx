import React, { useState, useEffect } from 'react';
import './Envio.css';

const EnvioPdf = ({ PacienteOne, IdChekeo, componentRef }) => {
  const [Checkeo, setCheckeo] = useState();

  useEffect(() => {
    if (PacienteOne && IdChekeo) {
      const checkeo = PacienteOne.visitas?.find(res => res.id === IdChekeo);
      setCheckeo(checkeo);
    }
  }, [PacienteOne, IdChekeo]);

  console.log(PacienteOne)


  return (
    <div>
      <div className="pdf-container" ref={componentRef}>
        <div className="patient-info">
          <h1>{PacienteOne?.Nombres} {PacienteOne?.Apellidos}</h1>
          <ul>
            <li><b>Identificación:</b> {PacienteOne?.Identificacion}</li>
            <li><b>Edad:</b> {PacienteOne?.Edad}</li>
            <li><b>Altura:</b> {PacienteOne?.Altura}</li>
            <li><b>Localidad:</b> {PacienteOne?.Localidad}</li>
            <li><b>Sexo:</b> {PacienteOne?.Sexo}</li>
          </ul>
        </div>
        <hr className="divider" />
        <div className="checkup-info">
          {Checkeo && (
            <ul>
              <li><b>Fecha de creación:</b> {Checkeo?.FechaAdd}</li>
              <li><b>Malestar:</b> {Checkeo?.malestar.NombreMalestar}</li>
              <li><b>Nivel de sistólica:</b> {Checkeo?.Sistolica}</li>
              <li><b>Nivel de diastólica:</b> {Checkeo?.Diastolica}</li>
              <li><b>Nivel de glucosa:</b> {Checkeo?.Glucosa}</li>
              <li><b>Pulsaciones:</b> {Checkeo?.Pulsaciones}</li>
              <li><b>Peso:</b> {Checkeo?.Peso}</li>
              <li><b>Altura:</b> {Checkeo?.Altura}</li>
              <li><b>Digestión:</b> {Checkeo?.Digestion}</li>
              <li><b>Recomendación médica:</b> {Checkeo?.Recomendacion}</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnvioPdf;
