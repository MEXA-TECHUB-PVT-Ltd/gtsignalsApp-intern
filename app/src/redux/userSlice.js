import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userRegisterUrl = 'https://gtcaptain-be.mtechub.com/user/usersignup';
const userSigninUrl = 'https://gtcaptain-be.mtechub.com/user/usersignin';
const updateProfileUrl = 'https://gtcaptain-be.mtechub.com/user/updateuser/userprofile';
const userForgetPasswordUrl = 'https://gtcaptain-be.mtechub.com/user/password/forgetpassword';
const resetPasswordUrl = 'https://gtcaptain-be.mtechub.com/user/password/resetpassword';
const changePasswordUrl = 'https://gtcaptain-be.mtechub.com/user/password/updatepassword';


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

export const userSignin = createAsyncThunk('users/userSignin', async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(userSigninUrl, { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // console.log('Backend Response in userSlice File:', response.data);
            return response.data;
        } catch (error) {
            // console.error('Backend Error in userSlice File:', error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'users/updateProfile',
    async ({ id, name, image, email }, { rejectWithValue }) => {
        try {
            const data = email ? { name, image, email } : { name, image };

            const response = await axios.put(`${updateProfileUrl}/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // console.log('Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.error('Response Data:', error.response.data);
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

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

export const resetPassword = createAsyncThunk('users/resetPassword', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.put(resetPasswordUrl, { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 60000,
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
            console.error('Response Headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request Error:', error.request);
        } else {
            console.error('Other Error:', error.message);
        }
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const changePassword = createAsyncThunk('users/changePassword', async ({ userId, email, newPassword }, { rejectWithValue }) => {
    try {
        const response = await axios.put(changePasswordUrl, { userId, email, password: newPassword }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    signupStatus: 'idle',
    signinStatus: 'idle',
    forgetPasswordStatus: 'idle',
    resetPasswordStatus: 'idle',
    updateProfileStatus: 'idle',
    changePasswordStatus: 'idle',
    user: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetStatus(state) {
            state.signupStatus = 'idle';
            state.signinStatus = 'idle';
            state.forgetPasswordStatus = 'idle';
            state.resetPasswordStatus = 'idle';
            state.updateProfileStatus = 'idle';
            state.changePasswordStatus = 'idle';
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
                console.log('User registered:', action.payload);
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
                console.log('User signed in:', action.payload);
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
            .addCase(resetPassword.pending, (state) => {
                state.resetPasswordStatus = 'loading';
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.resetPasswordStatus = 'succeeded';
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resetPasswordStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(changePassword.pending, (state) => {
                state.changePasswordStatus = 'loading';
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.changePasswordStatus = 'succeeded';
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.changePasswordStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;