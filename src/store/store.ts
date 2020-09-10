import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
export const rootReducer = combineReducers({
    //    expImpKycListCount: expImpKycListCountAction.reducer,
});

export interface TERootState {
    // expImpKycListCount: TEApi<number>;
}

export const store = configureStore({
    reducer: rootReducer,
});
