import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import adminReducer from './adminSlice';
import userReducer from './userSlice';
import signalReducer from './signalSlice';
import brokerReducer from './brokerSlice';
import appShareReducer from './appShareSlice';
import authReducer from './authSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    admin: adminReducer,
    user: userReducer,
    signal: signalReducer,
    brokers: brokerReducer,
    appShare: appShareReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

// store.subscribe(() => {
//     console.log('Current state:', store.getState());
// });

export { store, persistor };
