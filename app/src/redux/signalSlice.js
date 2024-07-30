import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Endpoint URL
const getAllSignalsUrl = 'https://gtcaptain-be.mtechub.com/signal/getallsignals?page=1&limit=100';
const searchSignalByNameUrl = 'https://gtcaptain-be.mtechub.com/signal/search_signal_byname';
const addToWishlistUrl = 'https://gtcaptain-be.mtechub.com/wishlist/createwishlist';
const removeFromWishlistUrl = 'https://gtcaptain-be.mtechub.com/wishlist/removesignalbyuserID';
const getallwishlistUrl = 'https://gtcaptain-be.mtechub.com/wishlist/getallwishlist';
const getSignalByUserIdUrl = 'https://gtcaptain-be.mtechub.com/wishlist/getSignalsByUserId';
const checkSaveItemUrl = 'https://gtcaptain-be.mtechub.com/wishlist/check_save_item';

export const getAllSignals = createAsyncThunk('signal/getAllSignals', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(getAllSignalsUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const searchSignalByName = createAsyncThunk('signal/searchSignalByName', async (name, { rejectWithValue }) => {
    try {
        const response = await axios.post(searchSignalByNameUrl, { name }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async ({ user_id, signal_id }, { rejectWithValue }) => {
    try {
        const response = await axios.post(addToWishlistUrl, { user_id, signal_id }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // console.log('signals added to wish list', response.data);
        return response.data;

        // return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const removeFromWishlist = createAsyncThunk(
    'wishlist/removeFromWishlist',
    async ({ user_id, signal_id }, { rejectWithValue }) => {
        // console.log('user id to be removed', user_id);
        // console.log('signal id in thunk to be removed', signal_id);
        try {
            const response = await axios.delete(
                removeFromWishlistUrl,
                { headers: { 'Content-Type': 'application/json' }, data: { user_id, signal_id } }
            );
            console.log('Signal removed from wishlist:', response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllWishlist = createAsyncThunk('wishlist/getAllWishlist', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(getallwishlistUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // console.log('All wishlist data: ', response.data);

        // Extract and return only the signals from each wishlist item
        const signals = response.data.flatMap(item => item.signals);
        // console.log('all wishlist signals: ', signals);
        return signals;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const getSignalsByUserId = createAsyncThunk('signal/getSignalsByUserId', async (userId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${getSignalByUserIdUrl}/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.signals;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const checkSaveItem = createAsyncThunk('wishlist/checkSaveItem', async ({ user_id, signal_id }, { rejectWithValue }) => {
    try {
        const response = await axios.post(checkSaveItemUrl, { user_id, signal_id }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Initial State
const initialState = {
    signals: [],
    searchSignals: [],
    wishlist: [],
    userSignals: [],
    checkSaveItemStatus: 'idle',
    checkSaveItemResult: null,
    getAllSignalsStatus: 'idle',
    searchStatus: 'idle',
    wishlistStatus: 'idle',
    userSignalsStatus: 'idle',
    error: null,
};

// Slice
const signalSlice = createSlice({
    name: 'signal',
    initialState,
    reducers: {
        resetSignalStatus(state) {
            state.getAllSignalsStatus = 'idle';
            state.searchStatus = 'idle';
            state.wishlistStatus = 'idle';
            state.userSignalsStatus = 'idle';
            state.checkSaveItemStatus = 'idle';
            state.checkSaveItemResult = null;
            state.error = null;
        },
        clearSearchSignals(state) {
            state.searchSignals = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSignals.pending, (state) => {
                state.getAllSignalsStatus = 'loading';
            })
            .addCase(getAllSignals.fulfilled, (state, action) => {
                state.getAllSignalsStatus = 'succeeded';
                state.signals = action.payload;
            })
            .addCase(getAllSignals.rejected, (state, action) => {
                state.getAllSignalsStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(searchSignalByName.pending, (state) => {
                state.searchStatus = 'loading';
            })
            .addCase(searchSignalByName.fulfilled, (state, action) => {
                state.searchStatus = 'succeeded';
                state.searchSignals = action.payload;
            })
            .addCase(searchSignalByName.rejected, (state, action) => {
                state.searchStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.wishlistStatus = 'succeeded';
                if (!state.wishlist.some(item => item.signal_id === action.payload.signal_id)) {
                    state.wishlist.push(action.payload);
                }
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.wishlistStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(removeFromWishlist.pending, (state) => {
                state.wishlistStatus = 'loading';
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.wishlistStatus = 'succeeded';
                // Handle removing from wishlist state if needed
                // Remove signal from wishlist
                state.wishlist = state.wishlist.filter(item => item.signal_id !== action.payload.signal_id);
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.wishlistStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(getAllWishlist.pending, (state) => {
                state.wishlistStatus = 'loading';
            })
            .addCase(getAllWishlist.fulfilled, (state, action) => {
                state.wishlistStatus = 'succeeded';
                state.signals = action.payload;
            })
            .addCase(getAllWishlist.rejected, (state, action) => {
                state.wishlistStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(getSignalsByUserId.pending, (state) => {
                state.userSignalsStatus = 'loading';
            })
            .addCase(getSignalsByUserId.fulfilled, (state, action) => {
                state.userSignalsStatus = 'succeeded';
                state.userSignals = action.payload;
            })
            .addCase(getSignalsByUserId.rejected, (state, action) => {
                state.userSignalsStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(checkSaveItem.pending, (state) => {
                state.checkSaveItemStatus = 'loading';
            })
            .addCase(checkSaveItem.fulfilled, (state, action) => {
                state.checkSaveItemStatus = 'succeeded';
                state.checkSaveItemResult = action.payload;
            })
            .addCase(checkSaveItem.rejected, (state, action) => {
                state.checkSaveItemStatus = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { resetSignalStatus, clearSearchSignals } = signalSlice.actions;
export default signalSlice.reducer;
