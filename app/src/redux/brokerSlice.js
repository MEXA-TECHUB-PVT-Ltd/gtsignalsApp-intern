import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllBrokersUrl = 'https://gtcaptain-be.mtechub.com/broker/getallbrokers?page=1&limit=10';

export const fetchBrokers = createAsyncThunk(
    'brokers/fetchBrokers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(getAllBrokersUrl);
            // Log the data part of the response
            // console.log('API Response Data:', response.data);
            return response.data;  
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const brokerSlice = createSlice({
    name: 'brokers',
    initialState: {
        brokers: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrokers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBrokers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brokers = action.payload.data;
            })
            .addCase(fetchBrokers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default brokerSlice.reducer;