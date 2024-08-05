import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    link: '',
    loading: false,
    error: null,
};

// Async thunk to fetch the link
export const fetchShareLink = createAsyncThunk('appShare/fetchLink', async () => {
    const response = await axios.get('https://gtcaptain-be.mtechub.com/applink/getapplink');
    return response.data.data[0].link; // Adjust based on which link you want to use
});

// Create slice
const appShareSlice = createSlice({
    name: 'appShare',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShareLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShareLink.fulfilled, (state, action) => {
                state.loading = false;
                state.link = action.payload;
            })
            .addCase(fetchShareLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default appShareSlice.reducer;
