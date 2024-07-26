import React, { useEffect, useState } from 'react';
import './Paciente.css';
import { useNavigate } from 'react-router-dom';
import useAplication from '../../../Hooks/useAplication';
import axios from 'axios';
const Api = import.meta.env.VITE_REACT_APP_URL;

const Paciente = ({ option }) => {
  const { GetPacientes, Pacientes } = useAplication();
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [searchCedula, setSearchCedula] = useState('');
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    GetPacientes();
  }, []);

  useEffect(() => {
    setFilteredPacientes(Pacientes);
  }, [Pacientes]);

  useEffect(() => {
    filterPacientes();
  }, [searchCedula, searchName]);

  const navigate = useNavigate();

  const Historial = (id) => {
    navigate(`/historia/${id}`);
  };

  const filterPacientes = () => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = Pacientes.filter(user =>
        user.Identificacion.toString().includes(searchCedula) &&
        user.Nombres.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredPacientes(filtered);
      setIsLoading(false);
    }, 500);
  };

  const RemovePaciente = (id) => {
    const api = `${Api}/pacientes/${id}`;
    if (window.confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
      axios.delete(api)
        .then(response => {
          alert("Eliminado con éxito");
          setFilteredPacientes(prevPacientes => prevPacientes.filter(paciente => paciente.id !== id));
        })
        .catch(error => {
          console.error("Error al eliminar:", error);
        });
    } else {
      console.log("Eliminación cancelada por el usuario.");
    }
  };

  return (
    <div className='Pacientes'>
      <h1>Pacientes</h1>
      <section className='Paciente'>
        <header className="table-header">
          <div className="search-bar"> 
            <label htmlFor="buscar">Buscar:</label>
            <div>
              <input 
                type="number" 
                id="buscar" 
                placeholder="Buscar por cédula..." 
                onChange={(e) => setSearchCedula(e.target.value)} 
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder='Busca por nombres' 
                onChange={(e) => setSearchName(e.target.value)} 
              />
            </div>
          </div>
          <button onClick={() => option(1)} className="add-button">
            <i className='bx bx-user-plus'></i>
            <span>Nuevo</span>
          </button>
        </header>
        
          <table className="patient-table">
            <thead>
              <tr>
                <th className="column-id">Id</th>
                <th>Nombre</th>
                <th className="column-cedula">Cédula</th>
                <th className="column-telefono">Teléfono</th>
                <th className="column-estado">Estado</th>
                <th className="column-fecha">Fecha</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredPacientes?.map((user, index) => (
                <tr key={user.id}>
                  <td className="column-id">{index}</td>
                  <td>{user.Nombres}</td>
                  <td className="column-cedula">{user.Identificacion}</td>
                  <td className="column-telefono">{user.Telefono}</td>
                  <td className="column-estado">{user.Estado}</td>
                  <td className="column-fecha">{user.FechaIngreso}</td>
                  <td className='Accion'>
                    <button onClick={() => Historial(user?.id)} className="action-button"><i className='bx bx-clipboard'></i></button>
                    <button onClick={() => RemovePaciente(user.id)} className="action-button-delete"><i className='bx bx-trash'></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
     
      </section>
    </div>
  );
};

export default Paciente;
