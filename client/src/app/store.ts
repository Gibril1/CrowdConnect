import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from '../services/auth/AuthSlice'
import eventReducer from '../services/event/EventSlice'


export const store = configureStore({
    reducer:{
        auth: authReducer,
        event: eventReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;