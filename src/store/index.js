import { configureStore } from '@reduxjs/toolkit';
import pacienteoneReducer from './slice/pacienteone.slice';

const store = configureStore({
  reducer: {
    pacienteone: pacienteoneReducer,
    // Aquí puedes agregar otros reducers si los tienes
  },
});

export default store;
