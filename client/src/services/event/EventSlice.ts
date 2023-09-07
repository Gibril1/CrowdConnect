import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "./EventService";
import {
    IEditEventCard, IEventCard, IEventInterface, IToken
} from '../../interfaces'
export interface EventState {
    events: IEventCard[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: any
}

const initialState = {
    events: [],
    isError: true,
    isSuccess: false,
    isLoading: false,
    message: ''
} as EventState

export const create = createAsyncThunk('event/create', async(event:IEventInterface, thunkAPI) => {
    try {
        const tokenString = localStorage.getItem('user')  || '{}'
        const token:IToken = JSON.parse(tokenString) 
        return await eventService.createEvent(event, token.access_token)
    } catch (error:any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message)||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAll = createAsyncThunk('events/get', async(_, thunkAPI) =>{
    try {
        const tokenString = localStorage.getItem('user') || '{}'
        const token:IToken = JSON.parse(tokenString)
        return await eventService.getEvents(token.access_token)
    } catch (error:any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message)||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getOne = createAsyncThunk('event/get', async(id:number, thunkAPI) =>{
    try {
        const tokenString = localStorage.getItem('user') || '{}'
        const token:IToken = JSON.parse(tokenString)
        return await eventService.getEvent(id, token.access_token)
    } catch (error:any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message)||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const edit = createAsyncThunk('events/update', async(eventData:IEditEventCard, thunkAPI) => {
    try {
        const tokenString = localStorage.getItem('user') || '{}'
        const token:IToken = JSON.parse(tokenString)
        return await eventService.editEventDetails(eventData,token.access_token)
    } catch (error:any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message)||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers:{
        reset:(state) => {
            state.events = []
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(create.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                state.events = []
            })
            .addCase(create.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.events.push(action.payload)
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.events = action.payload
            })
            .addCase(getAll.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.events = []
                state.message = action.payload
            })
            .addCase(getOne.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.events = [action.payload]
            })
            .addCase(getOne.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOne.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.events = []
                state.message = action.payload
            })
            .addCase(edit.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                const { id, ...updatedEvent } = action.payload;
                const index = state.events.findIndex(event => event.id === id);
                if (index !== -1) {
                    state.events[index] = { ...state.events[index], ...updatedEvent };
                }
            })
            .addCase(edit.pending, (state) => {
                state.isLoading = true
            })
            .addCase(edit.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.events = []
                state.message = action.payload
            })
    }
})

export const { reset } = eventSlice.actions
export default eventSlice.reducer