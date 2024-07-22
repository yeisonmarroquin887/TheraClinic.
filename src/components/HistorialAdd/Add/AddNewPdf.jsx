import React from 'react';
import { useForm } from 'react-hook-form';
import useAplication from '../../../Hooks/useAplication';
import axios from 'axios';
import './Add.css'

const Api = import.meta.env.VITE_REACT_APP_URL;

const AddNewPdf = ({ pacienteId, onNew, setAddnewPdf }) => {
  const { register, handleSubmit, reset } = useForm();
  const { AddCrud } = useAplication();
  const url = `${Api}/archivos`;

  const submit = async (data) => {
    const formData = new FormData();
    console.log(data)
    formData.append('pacienteId', pacienteId.id);
    formData.append('pdf', data.pdf[0]);
    formData.append('fecha', new Date().toISOString().split('T')[0]);
    formData.append('Nombre', data.Nombre);
console.log(formData)
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Archivo subido exitosamente');
      reset();
      if (onNew) {
        onNew(response.data.archivo);
      }
    } catch (error) {
      console.error('Error subiendo el archivo:', error);
    }
  };

  return (
    <div className='Add__Examenes'>
      <form className='Add__Examenes-Form' onSubmit={handleSubmit(submit)}>
        <div>
          <h1 className='Add__Examenes-title'>Subir examen en PDF</h1>
        </div>
        <div>
          <label  htmlFor="">Nombre del archivo</label>
          <input {...register("Nombre")} type="text" required/>
        </div>
        <div>
          <label htmlFor="pdf">Selecciona el archivo en PDF:</label>
          <input type="file" id="pdf" {...register('pdf', { required: true })} />
        </div>
        <article className='AddNewPdf__btn'>
			<button className='addnewPdf'>Agregar</button>
			<button className='addnone' onClick={() => setAddnewPdf(false)}>Cancelar</button>
			</article>
      </form>
    </div>
  );
};

export default AddNewPdf;
