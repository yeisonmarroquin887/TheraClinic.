import React, { useRef, useState } from 'react'
import './Chekeo.css'
import axios from 'axios';
import Actualizar from './Actualizar';
import EnvioPdf from '../EnvioPdf/EnvioPdf';
import { useReactToPrint } from 'react-to-print';
const Api = import.meta.env.VITE_REACT_APP_URL;

const Chekeo = ({chekeo, RemoveVisita, PacienteOne}) => {
	const [visita, setvisita] = useState(null)
	const [chekeoabri, setchekeoabri] = useState(false)
    const [Update, setUpdate] = useState(false)
	const [IdChekeo, setIdChekeo] = useState()

	const chekeoId = (id) => {
		const api = `${Api}/visitas/${id}`
		axios.get(api)
		.then(res => {
			setvisita(res.data)
			setchekeoabri(true)
		})
		.catch(err => console.log(err))
	}

	const [dataActualizar, setdataActualizar] = useState()

	const data = (visita) => {
		setdataActualizar(visita)
		setUpdate(true)
	}

	const componentRef = useRef();
	
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: 'Receta Médica',
	  });
	
	  const impri = (id) => {
		setIdChekeo(id);
		if(IdChekeo){
		handlePrint();
		}
	  };
  return (
	<div className='Chekeo'>
		<h3>Chekeos de visitas...</h3>
		<span className='TotalVisitas'><b >Total de visitas: {chekeo?.length} </b></span>
		{
			chekeo?.map(res => (
				<div className='list'key={res.ia} >
					<li className='btn-chekeo' onClick={() => chekeoId(res.id)} key={res.id}>🏥 {res.FechaAdd}</li>
					<i className='bx bxs-download download' onClick={() => impri(res.id)}></i>
					<i className='bx bxs-edit list_edit' onClick={() => data(res)}></i>
					<i onClick={() => RemoveVisita(res.id)} className='bx bxs-trash Cancelar-deuda'></i>
				</div>
			))
		}
		<div className='impri'>
			<EnvioPdf PacienteOne={PacienteOne} IdChekeo={IdChekeo} componentRef={componentRef}/>
		</div>
		<Actualizar dataActualizar={dataActualizar} Update={Update} setUpdate={setUpdate}/>

		<article className={chekeoabri ?'Container__visitas' : 'Container__visitas-close'}>
			
			<div>
				<h1>Visitas</h1>
				<i onClick={() => setchekeoabri(false)} className='volver-visita bx bx-x'></i>
			</div>
			
			<li><b>Fecha de vista del paciente: </b><span>{visita?.FechaAdd}</span></li>
			<li><b>Malestar</b> {visita?.malestar?.NombreMalestar || 'No disponible'} </li>
			<li><b>Sistolica:</b> {visita?.Sistolica}</li>
			<li><b>Diastolica:</b> {visita?.Diastolica} </li>
			<li><b>Pulsaciones:</b> {visita?.Pulsaciones} </li>
			<li><b>Peso:</b> {visita?.Peso} </li>
			<li><b>Altura:</b> {visita?.Altura} </li>
			<li><b>Dolor de cabeza</b> {visita?.DolorCabeza} </li>
			<li><b>Problema de eqilibrio</b> {visita?.ProblemasEquilibrio} </li>
			<li><b>Cirugias</b> {visita?.Cirugias} </li>
			<li><b>Observacion</b> {visita?.Observacion} </li>
			<li><b>Recomendacion:</b> {visita?.Recomendacion} </li>
		</article>
	</div>
  )
}

export default Chekeo