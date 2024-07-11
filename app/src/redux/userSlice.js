import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userRegisterUrl = 'https://gtcaptain-be.mtechub.com/user/usersignup';
const userSigninUrl = 'https://gtcaptain-be.mtechub.com/user/usersignin';
const updateProfileUrl = 'https://gtcaptain-be.mtechub.com/user/updateuser/userprofile/3';
const userForgetPasswordUrl = 'https://gtcaptain-be.mtechub.com/user/password/forgetpassword';

// Async Thunks for API Calls
export const userRegister = createAsyncThunk('users/userRegister', async (userData, { rejectWithValue }) => {
    const data = {
        email: userData.email,
        password: userData.password,
        signup_type: "email",
        device_id: "576765876",
    }
    try {
        const response = await axios.post(userRegisterUrl, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const userSignin = createAsyncThunk('users/userSignin', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(userSigninUrl, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateProfile = createAsyncThunk('users/updateProfile', async (profileData, { rejectWithValue }) => {
    try {
        const response = await axios.put(updateProfileUrl, profileData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const userForgetPassword = createAsyncThunk('users/forgetPassword', async (email, { rejectWithValue }) => {
    try {
        const response = await axios.post(userForgetPasswordUrl, { email }, {
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
    updateProfileStatus: 'idle',
    user: null,
    error: null,
};

// Slice
const userSlice = createSlice({
    name: 'user',
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
            .addCase(userRegister.pending, (state) => {
                state.signupStatus = 'loading';
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.signupStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.signupStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(userSignin.pending, (state) => {
                state.signinStatus = 'loading';
            })
            .addCase(userSignin.fulfilled, (state, action) => {
                state.signinStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(userSignin.rejected, (state, action) => {
                state.signinStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(userForgetPassword.pending, (state) => {
                state.forgetPasswordStatus = 'loading';
            })
            .addCase(userForgetPassword.fulfilled, (state) => {
                state.forgetPasswordStatus = 'succeeded';
            })
            .addCase(userForgetPassword.rejected, (state, action) => {
                state.forgetPasswordStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateProfile.pending, (state) => {
                state.updateProfileStatus = 'loading';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.updateProfileStatus = 'succeeded';
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.updateProfileStatus = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;
