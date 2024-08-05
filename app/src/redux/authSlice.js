// src/redux/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        authenticate: (state) => {
            state.isAuthenticated = true;
        },
        unauthenticate: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { authenticate, unauthenticate } = authSlice.actions;
export default authSlice.reducer;
