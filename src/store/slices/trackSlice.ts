import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import fetchMimicAPI from './mimicAPI';

import { IInitialStateTrack, ITrackItem } from "../../types/generic";

const initialState: IInitialStateTrack = {
    loading: false,
    users: [],
    trackItems: []
};

export const getUsers = createAsyncThunk(
    'tracker/getUsers',
    async (_, thunkAPI) => {
        try {
            const response = axios.get(`https://jsonplaceholder.typicode.com/users`);
            return await response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ errors: error.response.data.errors });
        }
    }
);

export const submit = createAsyncThunk(
    'tracker/submit',
    async (
        { id, trackedUser, trackedTime, note }: ITrackItem,
        thunkAPI
    ) => {
        try {
            const response = await fetchMimicAPI(1, { id, trackedUser, trackedTime, note })
            return await response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ errors: error.response.data.errors });
        }
    }
);



export const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // GETUSERS
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action: AnyAction): void => {
                state.loading = false;
                state.users = action.payload.data;
            })
            .addCase(getUsers.rejected, (state) => {
                state.loading = false;
            });
        // SUBMIT
        builder
            .addCase(submit.pending, (state) => {
                state.loading = true;
            })
            .addCase(submit.fulfilled, (state, action: AnyAction): void => {
                const newTrackItems = state.trackItems
                newTrackItems.push(action.payload.data)
                state.loading = false;
                state.trackItems = newTrackItems;
            })
            .addCase(submit.rejected, (state) => {
                state.loading = false;
            });

    }
});

export default trackSlice.reducer;
