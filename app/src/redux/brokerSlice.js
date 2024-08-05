import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllBrokersUrl = 'https://gtcaptain-be.mtechub.com/broker/getallbrokers';

export const fetchBrokers = createAsyncThunk(
    'brokers/fetchBrokers',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${getAllBrokersUrl}?page=${page}&limit=${limit}`);
            return response.data.data;
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
        error: null,
        page: 1,
        limit: 6,
    },
    reducers: {
        incrementPage: (state) => {
            state.page += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrokers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBrokers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Avoid duplicating brokers
                const newBrokers = action.payload.filter(
                    (newBroker) => !state.brokers.some((broker) => broker.broker_id === newBroker.broker_id)
                );
                state.brokers = [...state.brokers, ...newBrokers];
            })
            .addCase(fetchBrokers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // .addCase(fetchBrokers.pending, (state) => {
            //     state.status = 'loading';
            // })
            // .addCase(fetchBrokers.fulfilled, (state, action) => {
            //     state.status = 'succeeded';
            //     state.brokers = action.payload.data;
            // })
            // .addCase(fetchBrokers.rejected, (state, action) => {
            //     state.status = 'failed';
            //     state.error = action.payload;
            // });
    }
});

export const { incrementPage } = brokerSlice.actions;

export default brokerSlice.reducer;