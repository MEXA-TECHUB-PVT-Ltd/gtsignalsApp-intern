import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import userReducer from './userSlice';
import signalReducer from './signalSlice';

const store = configureStore({
    reducer: {
        admin: adminReducer,
        user: userReducer,
        signal: signalReducer,
    },
});

export default store;