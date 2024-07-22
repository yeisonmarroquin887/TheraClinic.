import { createSlice } from '@reduxjs/toolkit';

// Creamos el slice 'pacienteone'
export const pacienteone = createSlice({
    name: 'pacienteone', // Nombre del slice
    initialState: null, // Estado inicial, puede ser null si aún no tienes datos
    reducers: {
        setPacienteOne: (state, action) => action.payload // Acción para actualizar el estado con los datos del paciente
    }
});

// Exportamos las acciones creadas por createSlice
export const { setPacienteOne } = pacienteone.actions;

// Exportamos el reductor de pacienteone para conectarlo con el store de Redux
export default pacienteone.reducer;
