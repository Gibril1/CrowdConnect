import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from '../services/auth/AuthSlice'
import eventReducer from '../services/event/EventSlice'
import conversationReducer from "../services/conversation/ConversationSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        event: eventReducer,
        conversation: conversationReducer
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