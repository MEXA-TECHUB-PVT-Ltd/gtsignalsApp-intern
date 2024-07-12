import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Endpoint URL
const getAllSignalsUrl = 'https://gtcaptain-be.mtechub.com/signal/getallsignals?page=1&limit=10';

// Async Thunks for API Calls
export const getAllSignals = createAsyncThunk('signal/getAllSignals', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(getAllSignalsUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.data; // Assuming `response.data.data` is the array of signals
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Initial State
const initialState = {
    signals: [], // Initialize signals as an empty array
    getAllSignalsStatus: 'idle',
    error: null,
};

// Slice
const signalSlice = createSlice({
    name: 'signal',
    initialState,
    reducers: {
        resetSignalStatus(state) {
            state.getAllSignalsStatus = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSignals.pending, (state) => {
                state.getAllSignalsStatus = 'loading';
            })
            .addCase(getAllSignals.fulfilled, (state, action) => {
                state.getAllSignalsStatus = 'succeeded';
                state.signals = action.payload; // Update signals state with the fetched data
            })
            .addCase(getAllSignals.rejected, (state, action) => {
                state.getAllSignalsStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetSignalStatus } = signalSlice.actions;
export default signalSlice.reducer;
