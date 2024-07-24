import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { useForm } from 'react-hook-form';
import './PacienteId.css';
import './Print.css';
import Header from '../../components/welcome/header/Header';
import axios from 'axios';
import Enfermedades from '../../components/HistorialAdd/Enfermedades/Enfermedades';
import Alergias from '../../components/HistorialAdd/Alergias/Alergia';
import Chekeo from '../../components/HistorialAdd/Chekeo/Chekeo';
import Malestar from '../../components/HistorialAdd/Malestares/Malestar';
import Add from '../../components/HistorialAdd/Add/Add';
import getConfingToken from '../../utils/getConfingToken';
import Acompanante from '../../components/HistorialAdd/Acompañante/Acompanante';
import AddDeuda from '../../components/HistorialAdd/Add/AddDeuda';
import { useDispatch, useSelector } from 'react-redux';
import {  setPacienteOne } from '../../store/slice/pacienteone.slice';
const Api = import.meta.env.VITE_REACT_APP_URL;

const PacienteId = () => {
    const { pacienteId } = useParams();
    const dispatch = useDispatch();
    const PacienteOne = useSelector((state) => state.pacienteone); // Accede al estado global de Redux

    useEffect(() => {
        axios.get(`${Api}/pacientes/${pacienteId}`)
            .then(res => {
                dispatch(setPacienteOne(res.data)); // Actualiza el estado global con los datos del paciente
            })
            .catch(err => console.log(err))
    }, [dispatch, pacienteId]);

    const paciente = PacienteOne
    const { register, handleSubmit, setValue } = useForm();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (paciente) {
            Object.keys(paciente).forEach(key => {
                setValue(key, paciente[key]);
            });
        }
    }, [paciente, setValue]);


    const onSubmit = (data) => {
        console.log(data);
        axios.put(`${Api}/pacientes/${pacienteId}`, data, getConfingToken())
            .then((res) => {
                alert("Paciente actualizado")
                setEditMode(false);
            })
            .catch(err => {
                alert("Error al actualizar el paciente")
                console.log(err)
            })
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const navigate = useNavigate()
    const volver = () => {
        navigate("/welcome")
    }
    const printRef = useRef();

    const addNewEnfermedad = (newEnfermedad) => {
        dispatch(setPacienteOne({
            ...paciente,
            enfermedads: [...paciente.enfermedads, newEnfermedad]
        }));
    };

    const addNewAlergias = (newAlergias) => {
        dispatch(setPacienteOne({
            ...paciente,
            alergias: [...paciente.alergias, newAlergias]
        }));
    };

    const addNewmalestars = (newMalestars) => {
        dispatch(setPacienteOne({
            ...paciente,
            malestars: [...paciente.malestars, newMalestars]
        }));
    };

    const addNewmedicamentos = (newMedicamento) => {
        dispatch(setPacienteOne({
            ...paciente,
            medicamentos: [...paciente.medicamentos, newMedicamento]
        }));
    };

    const addNewvisita = (newVisita) => {
        dispatch(setPacienteOne({
            ...paciente,
            visitas: [...paciente.visitas, newVisita]
        }));
    };

    const addNewAcompañante = (newAcompañante) => {
        dispatch(setPacienteOne({
            ...paciente,
            acompañantes: [...paciente.acompañantes, newAcompañante]
        }));
    };

    const addNewDeuda = (newDeudas) => {
        dispatch(setPacienteOne({
            ...paciente,
            deudas: [...paciente.deudas, newDeudas]
        }));
    };

    const addNewArchivos = (newArchivos) => {
        dispatch(setPacienteOne({
            ...paciente,
            archivos: [...paciente.archivos, newArchivos]
        }));
    };


    const RemoveEnfermedad = (id) => {
        const api = `${Api}/enfermedades/${id}`;
        if (window.confirm("¿Estás seguro de que deseas eliminar esta enfermedad?")) {
            axios.delete(api)
                .then(response => {
                    alert("Eliminada con éxito");
                    dispatch(setPacienteOne({
                        ...PacienteOne,
                        enfermedads: PacienteOne.enfermedads.filter(enfermedad => enfermedad.id !== id)
                    }));
                })
                .catch(error => {
                    console.error("Error al eliminar:", error);
                });
        } else {
            console.log("Eliminación cancelada por el usuario.");
        }
    };
    const RemoveAlergia = (id) => {
        const api = `${Api}/alergias/${id}`;
        if (window.confirm("¿Estás seguro de que deseas eliminar esta alergia?")) {
            axios.delete(api)
                .then(response => {
                    alert("Eliminada con éxito");
                    dispatch(setPacienteOne({
                        ...PacienteOne,
                        alergias: PacienteOne.alergias.filter(alergia => alergia.id !== id)
                    }));
                })
                .catch(error => {
                    console.error("Error al eliminar:", error);
                });
        } else {
            console.log("Eliminación cancelada por el usuario.");
        }
    };

    const RemoveVisita = (id) => {
        const api = `${Api}/visitas/${id}`;
        if (window.confirm("¿Estás seguro de que deseas eliminar esta visita?")) {
            axios.delete(api)
                .then(response => {
                    alert("Eliminado con éxito");
                    dispatch(setPacienteOne({
                        ...PacienteOne,
                        visitas: PacienteOne.visitas.filter(visitas => visitas.id !== id)
                    }));
                })
                .catch(error => {
                    console.error("Error al eliminar:", error);
                });
        } else {
            console.log("Eliminación cancelada por el usuario.");
        }
    };
    
    const RemoveMalestar = (id) => {
        const api = `${Api}/malestares/${id}`;
        if (window.confirm("¿Estás seguro de que deseas eliminar este malestar?")) {
            axios.delete(api)
                .then(response => {
                    alert("Eliminado con éxito");
                    dispatch(setPacienteOne({
                        ...PacienteOne,
                        malestars: PacienteOne.malestars.filter(malestar => malestar.id !== id)
                    }));
                })
                .catch(error => {
                    console.error("Error al eliminar:", error);
                });
        } else {
            console.log("Eliminación cancelada por el usuario.");
        }
    };
    
    const RemoveMedicamento = (id) => {
        const api = `${Api}/medicamentos/${id}`;
        if (window.confirm("¿Estás seguro de que deseas eliminar este medicamento?")) {
            axios.delete(api)
                .then(response => {
                    alert("Eliminado con éxito");
                    dispatch(setPacienteOne({
                        ...PacienteOne,
                        medicamentos: PacienteOne.medicamentos.filter(medicamento => medicamento.id !== id)
                    }));
                })
                .catch(error => {
                    console.error("Error al eliminar:", error);
                });
        } else {
            console.log("Eliminación cancelada por el usuario.");
        }
    };
    const cerrar = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("IdPaciente")
        localStorage.removeItem("i18nextLng")
        localStorage.removeItem("authId")
        navigate("/")
      }


    return (
        <div className='PacienteId'>
            <div className='PacienteId__Header'>
                <Header cerrar={cerrar} />
            </div>
            <button onClick={volver} className='Volver'>Volver</button>
            <div className='AddDeuda'>
              <AddDeuda paciente={paciente} onNew={addNewDeuda} setPacienteOne={setPacienteOne} onNew1={addNewArchivos}/>
            </div>
            <div className="PacienteId__Info pdf-export" id="PacienteIdContent" ref={printRef}>
                <div className='PacienteId__form '>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <h1 className='PacienteId__Title'>Datos de {paciente?.Nombres}</h1>
                        <div className='PacienteId__form-info'>
                            <div className="PacienteId__form-group">
                                <label htmlFor="Nombre">Nombres:</label>
                                <input id="Nombre" type="text" {...register('Nombres')} defaultValue={paciente?.Nombres} readOnly={!editMode} />
                            </div>
                            <div className="PacienteId__form-group">
                                <label htmlFor="Nombre">Apellidos:</label>
                                <input id="Nombre" type="text" {...register('Apellidos')} defaultValue={paciente?.Apellidos} readOnly={!editMode} />
                            </div>                            
                            <div className="PacienteId__form-group">
                                <label htmlFor="Cedula">Cédula:</label>
                                <input id="Cedula" type="text" {...register('Identificacion')} defaultValue={paciente?.Identificacion} readOnly={!editMode} />
                            </div>
                            <div className="PacienteId__form-group">
                                <label htmlFor="Telefono">Teléfono:</label>
                                <input id="Telefono" type="text" {...register('Telefono')} defaultValue={paciente?.Telefono} readOnly={!editMode} />
                            </div>
                            <div className="PacienteId__form-group">
                                <label htmlFor="Edad">Edad:</label>
                                <input id="Edad" type="text" {...register('Edad')} defaultValue={paciente?.Edad} readOnly={!editMode} />
                            </div>
                            <div className="PacienteId__form-group">
                                <label htmlFor="Estado">Estado:</label>
                                <select id="Estado" {...register('Estado')} defaultValue={paciente?.Estado} disabled={!editMode}>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                            <div className="PacienteId__form-group">
                                <label htmlFor="">Sexo</label>
                                <select {...register("Sexo")} defaultValue={paciente?.Sexo} disabled={!editMode} required>
                                    <option value="">Selecciona el sexo</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                            <div className="PacienteId__form-group">
                                <label htmlFor="Fecha">Fecha de registro:</label>
                                <input id="Fecha" type="date" {...register('FechaIngreso')} defaultValue={paciente?.FechaIngreso}  readOnly={!editMode}    />
                            </div>
                            <div className="PacienteId__form-group">
                                <label htmlFor="Localidad">Dirección:</label>
                                <input id="Localidad" type="text" {...register('Localidad')} defaultValue={paciente?.Localidad}  disabled={!editMode}  readOnly={!editMode} />
                            </div>
                            <div className="PacienteId__form-group">
                                <label htmlFor="EstadoCivil">Estado civil:</label>
                                <select {...register("EstadoCivil")} defaultValue={paciente?.EstadoCivil} disabled={!editMode} readOnly={!editMode} required>
                                    <option value="">Selecciona su estado civil</option>
                                    <option value="Solter@">Solter@</option>
                                    <option value="Union libre">Union libre</option>
                                    <option value="Casado">Casado</option>
                                    <option value="viud@">Viud@</option>
                                </select>
                            </div>
                            <div className="PacienteId__form-group">
                                <label htmlFor="Referido">Referido:</label>
                                <input id="Referido" type="text" {...register('Referido')} defaultValue={paciente?.Referido}  readOnly={!editMode} />
                            </div>
                            <div className="PacienteId__form-group">
                                <label htmlFor="Alcoholismo">Alcoholismo:</label>
                                <select {...register("Alcoholismo")} defaultValue={paciente?.Alcoholismo} disabled={!editMode} required>
                                    <option value="">Selecciona su estado civil</option>
                                    <option value="Si">Si</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="PacienteId__form-group">
                                <label htmlFor="QUEASER">Queaser laboral:</label>
                                <textarea id="QUEASER" type="text" {...register('Queaser')} defaultValue={paciente?.Queaser} disabled={!editMode}   readOnly={!editMode} />
                            </div>

  
                        </div>
                        <div className="PacienteId__buttons">
                            {!editMode && (
                                <button type="button" className="btn-edit" onClick={handleEditClick}>Editar</button>
                            )}
                            {editMode && (
                                <button type="submit" className="btn-save" onClick={handleSubmit(onSubmit)}>Guardar cambios</button>
                            )}
                        </div>
                    </form>
                    <Acompanante setPacienteOne={setPacienteOne} paciente={paciente} onNew={addNewAcompañante}/>
                    <div className='PacienteId__Info2'>
                    <h1>Informacion medica</h1>
                    <Add pacienteId={pacienteId} onNewE={addNewEnfermedad} onNewA={addNewAlergias} onNewMa={addNewmalestars} onNewMe={addNewmedicamentos} onNewV={addNewvisita}/>
                    <Enfermedades enfermedades={paciente} RemoveEnfermedad={RemoveEnfermedad}/>
                    <Alergias alergias={paciente?.alergias} RemoveAlergia={RemoveAlergia}/>
                    <Chekeo chekeo={paciente?.visitas} RemoveVisita={RemoveVisita} PacienteOne={PacienteOne}/>
                    <Malestar malestar={paciente?.malestars} RemoveMalestar={RemoveMalestar} setPacienteOne={setPacienteOne} PacienteOne={PacienteOne} />                   
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PacienteId;
