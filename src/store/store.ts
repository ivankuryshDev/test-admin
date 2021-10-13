import { Action, AnyAction, CombinedState, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import trackReducer from './slices/trackSlice';
import {IInitialStateTrack} from "../types/generic";

const reducer = combineReducers({ track: trackReducer });

const persistConfig = {
    key: 'admin-test',
    storage
};

export const rootReducer = (state: RootState | undefined, action: AnyAction) => {
    return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.NODE_ENV === 'development'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = CombinedState<{ track: IInitialStateTrack }>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
