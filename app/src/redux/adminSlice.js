import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const signupUrl = 'https://gtcaptain-be.mtechub.com/admin/signup';
const signinUrl = 'https://gtcaptain-be.mtechub.com/admin/signin';
const forgetPasswordUrl = 'https://gtcaptain-be.mtechub.com/admin/forgetpassword';

// Async Thunks for API Calls
export const signup = createAsyncThunk('admin/signup', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(signupUrl, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const signin = createAsyncThunk('admin/signin', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(signinUrl, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const forgetPassword = createAsyncThunk('admin/forgetPassword', async (email, { rejectWithValue }) => {
    try {
        const response = await axios.post(forgetPasswordUrl, { email }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Initial State
const initialState = {
    signupStatus: 'idle',
    signinStatus: 'idle',
    forgetPasswordStatus: 'idle',
    user: null,
    error: null,
};

// Slice
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetStatus(state) {
            state.signupStatus = 'idle';
            state.signinStatus = 'idle';
            state.forgetPasswordStatus = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.signupStatus = 'loading';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.signupStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.signupStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(signin.pending, (state) => {
                state.signinStatus = 'loading';
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.signinStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(signin.rejected, (state, action) => {
                state.signinStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(forgetPassword.pending, (state) => {
                state.forgetPasswordStatus = 'loading';
            })
            .addCase(forgetPassword.fulfilled, (state) => {
                state.forgetPasswordStatus = 'succeeded';
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.forgetPasswordStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetStatus } = adminSlice.actions;
export default adminSlice.reducer;