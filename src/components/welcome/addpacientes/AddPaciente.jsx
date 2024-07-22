import React, { useState } from 'react'
import './Addpaciente.css'
import { useForm } from 'react-hook-form'
import useAplication from '../../../Hooks/useAplication'
import AddAcompañante from './AddAcompañante'

const AddPaciente = ({option}) => {
  const { handleSubmit, register, reset } = useForm()
  const [AddAcom, setAddAcom] = useState(true)
  const {CreatePaciente} = useAplication()

  const submit = (data) => {
    data.Alcoholismo = data.Alcoholismo ? "Si" : "No"
    data.FechaIngreso = new Date().toISOString().split('T')[0];
   CreatePaciente(data, reset, setAddAcom)
  }

  return (
    <div className='AddPaciente'>
      <button className='VolverPacientes' onClick={() => option(0)}>Volver</button>
      
      {
        AddAcom
        ?(
      <form onSubmit={handleSubmit(submit)} className='AddPaciente__form'>
        <h1 className='AddTitle'>Nuevo Paciente</h1>
        <div>
          <div>
            <label htmlFor="">Nombres</label>
            <input {...register("Nombres")} type="text" required />
          </div>
          <div>
            <label htmlFor="">Apellidos</label>
            <input {...register("Apellidos")} type="text" required />
          </div>
          <div>
            <label htmlFor="">Telefono</label>
            <input {...register("Telefono")} type="number" required />
          </div>
          <div>
            <label htmlFor="">Edad</label>
            <input {...register("Edad")} type="number" required />
          </div>
          <div>
            <label htmlFor="">Sexo</label>
            <select {...register("Sexo")} required>
              <option value="">Selecciona el sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
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
            <label htmlFor="">Cedula</label>
            <input {...register("Identificacion")} type="number" required />
          </div>
          <div>
            <label htmlFor="">Estado</label>
            <select {...register("Estado")} required>
              <option value="">Selecciona su estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Dirección</label>
            <input {...register("Localidad")} type="text" required />
          </div>
          <div>
            <label htmlFor="">Estado civil</label>
            <select name="" id="" {...register("EstadoCivil")} required>
              <option value="">Selecciona una opcion</option>
              <option value="Solter@">Solter@</option>
              <option value="Union libre">Union libre</option>
              <option value="Casad@">Casad@</option>
              <option value="Viudo@">Viud@</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Referido</label>
            <input {...register("Referido")} type="text" required/>
          </div>
          <div>
            <label htmlFor="">Consumo de alhol</label>
            <select name="" id="" {...register("Alcoholismo")} required>
              <option value="">Selecciona una opcion</option>
              <option value="Si">si</option>
              <option value="">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Queaser laboral</label>
            <textarea {...register("Queaser")}  required></textarea>
          </div> 

        </div>
        <button className='AddPaciente__Register'>Registrar</button>
      </form>
        ):(
          <AddAcompañante setAdd={setAddAcom}/>
        )
      }

    </div>
  )
}

export default AddPaciente
