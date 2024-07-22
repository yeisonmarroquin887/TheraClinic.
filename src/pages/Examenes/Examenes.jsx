import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setPacienteOne } from '../../store/slice/pacienteone.slice';
import axios from 'axios';
import Header from '../../components/welcome/header/Header';
import './Examenes.css'

const Api = import.meta.env.VITE_REACT_APP_URL;

const Examenes = () => {
    const { pacienteId } = useParams();
    const dispatch = useDispatch();
    const PacienteOne = useSelector((state) => state.pacienteone);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${Api}/pacientes/${pacienteId}`)
            .then(res => {
                dispatch(setPacienteOne(res.data)); // Actualiza el estado global con los datos del paciente
            })
            .catch(err => console.log(err));
    }, [dispatch, pacienteId]);

    console.log(PacienteOne);

    const volver = () => {
        navigate(`/historia/${pacienteId}`)
    }

    const cerrar = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("IdPaciente")
        localStorage.removeItem("i18nextLng")
        localStorage.removeItem("authId")
        navigate("/")
      }

    return (
        <div className='Examenes'>
            <div className='Examenes__Header'>
                <Header cerrar={cerrar}/>
            </div>
            <button onClick={volver} className='Volver'>Volver</button>
            <div className='Examenes__info'>
                <h2>Archivos del Paciente</h2>
                {PacienteOne?.archivos && PacienteOne?.archivos.length > 0 ? (
                    <table className='Examenes__table'>
                        <thead className='Examenes__thead'>
                            <tr>
                                <th>Nombre</th>
                                <th>Fecha</th>
                                <th>Ver</th>
                            </tr>
                        </thead>
                        <tbody className='Examenes__tbody'>
                        {PacienteOne?.archivos.map((archivo) => (
                            <tr>
                                <td>{archivo.Nombre}</td>
                                <td>{archivo.fecha}</td>
                                <td><a 
                                    href={`http://localhost:8080/uploads/${archivo.ruta.split('\\').pop()}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Visualización
                                </a></td>
                            </tr>
                        ))}                            
                        </tbody>

                    </table>
                ) : (
                    <p>No hay archivos disponibles</p>
                )}
            </div>
        </div>
    );
};

export default Examenes;
