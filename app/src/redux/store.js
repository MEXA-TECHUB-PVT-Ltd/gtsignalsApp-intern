import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import userReducer from './userSlice';
import signalReducer from './signalSlice';
import brokerReducer from './brokerSlice';
import appShareReducer from './appShareSlice';

const store = configureStore({
    reducer: {
        admin: adminReducer,
        user: userReducer,
        signal: signalReducer,
        brokers: brokerReducer,
        appShare: appShareReducer,
    },
});

export default store;