import React, { useState } from 'react'
import './Add.css'
import { useForm } from 'react-hook-form'
import useAplication from '../../../Hooks/useAplication'
import axios from 'axios';
import AddNewPdf from './AddNewPdf';
import { useNavigate } from 'react-router-dom';
const Api = import.meta.env.VITE_REACT_APP_URL;

const AddDeuda = ({paciente, onNew, setPacienteOne, onNew1}) => {
const [AddDeudaNew, setAddDeudaNew] = useState(false)
const [AddnewPdf, setAddnewPdf] = useState(false)
const [VerDeuda, setVerDeuda] = useState(false)
const {handleSubmit, register, reset} = useForm()
const {AddCrud} = useAplication()
const url = `${Api}/deudas`

const navigate = useNavigate();

const irexamen = () => {
	navigate(`/historia/examenes/${paciente.id}`)
}

const abrirAdd = () => {
	setAddDeudaNew(true)
}
const submit = (data) => {
	const message = "Deuda agregada"
	data.fecha = new Date().toISOString().split('T')[0];
	data.pacienteId = paciente.id;
	AddCrud(url, data, message, reset, onNew)
}

const remove = (id) => {
	console.log(id)
	axios.delete(`${url}/${id}`)
	.then(res => {
		alert(`${res.data.message}`)
		setPacienteOne(prevPaciente => ({
			...prevPaciente,
			deudas: prevPaciente.deudas.filter(deudas => deudas.id !== id)
		}));
	})
	.catch(err => {
		console.log(err)
		alert("error al eliminar la deuda")
	})
}
const ar = [];
const array = paciente?.deudas.forEach(element => {
	const montoSinPunto = Number(element.Monto.replace(/\./g, ''));
	ar.push(montoSinPunto)
});
const sumaTotal = ar.reduce((acc, curr) => acc + curr, 0);
const res = sumaTotal.toLocaleString('de-DE');
  return (
	<div className='AddDeuda__info'>
		<div className={AddDeudaNew ? "AddNewDeuda" : "AddNewDeuda__close"}>
		<form onSubmit={handleSubmit(submit)}>
			<h3>Agregar deuda</h3>
			<div>
				<label htmlFor="">Nombre de la deuda:</label>
				<input {...register("title")} type="text"required placeholder='Consulta externa'/>
			</div>
			<div>
				<label htmlFor="">Cuanto:</label>
				<input {...register("Monto")} type="number" step="0.01" required placeholder='Ejemplo: 50.000'/>
			</div>
			<article>
			<button className='btn1'>Agregar</button>
			<button onClick={() => setAddDeudaNew(false)} className='btn2'>Cancelar</button>
			</article>
		</form>
		</div>

		<div className={AddnewPdf ? "AddnewPdf" : "AddnewPdf__close"}>
			<AddNewPdf pacienteId={paciente} onNew={onNew1} setAddnewPdf={setAddnewPdf}/>
		</div>

		
		<div className={VerDeuda ? "AddNewDeuda" : "AddNewDeuda__close"}>
			<section className='Deudas'>
			<i onClick={() => setVerDeuda(false)} className='bx bx-x volver-deuda'></i>
				<h1>Lista de deudas</h1>
				<article>
				{
                paciente?.deudas?.length > 0 ? (
					<table className="table-deudas">
                        <thead>
                            <tr className="table-row">
                                <th className="table-header-deuda">ID</th>
                                <th className="table-header-deuda">Título</th>
                                <th className="table-header-deuda">Monto</th>
                                <th className="table-header-deuda">Fecha</th>
                                <th className="table-header-deuda">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paciente.deudas.map((res, index) => (
                                <tr key={index} className="table-row">
                                    <td className="table-data">{res.id}</td>
                                    <td className="table-data">{res.title}</td>
                                    <td className="table-data">💸{res.Monto}</td>
                                    <td className="table-data">{res.fecha}</td>
                                    <td className="table-data ">
                                        <i onClick={() => remove(res.id)} className='bx bxs-trash Cancelar-deuda'></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className='message-deuda'> Paciente {paciente?.Nombres} {paciente?.Apellidos} no tiene ninguan deuda...</p>
                )
            }
				</article>
				<footer className='deuda-footer'>
					<p> <b>Total a pagar:</b> {res} pesos</p>
				</footer>
			</section>
		</div>

		<article>
		<button onClick={irexamen}>Ver examenes</button>
		<button onClick={() => setVerDeuda(true)}>Ver deudas</button>
		<button onClick={abrirAdd}>Agregar deuda</button>
		<button onClick={() => setAddnewPdf(true)}>Agregar pdf</button>
		</article>
	</div>
  )
}

export default AddDeuda