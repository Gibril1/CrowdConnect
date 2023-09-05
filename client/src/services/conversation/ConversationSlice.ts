import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEventCard, IEventID } from '../../interfaces/EventInterface'
import { IComment } from '../../interfaces/CommentInterface'
import conversationService from "./ConversationService";

interface Conversation {
    event: IEventCard
    comments: IComment[]
}

interface ConversationState {
    conversations: Conversation | null
    isError: boolean
    isLoading: boolean
    isSuccess: boolean
    message: any
}

const initialState = {
    conversations: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
} as ConversationState

export const checkEventAvailability = createAsyncThunk('event/availability', async(eventId:IEventID, thunkAPI) => {
    try {
        return await conversationService.checkEvent(eventId)
    } catch (error:any) {
        const message: string = (error.response &&
            error.response.data &&
            error.response.data.message)||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})


export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        reset:(state) => {
            state.conversations = null
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(checkEventAvailability.pending, (state) => {
                state.isLoading = true
            })
            .addCase(checkEventAvailability.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(checkEventAvailability.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.conversations = action.payload
            })
    }
})


export const { reset } = conversationSlice.actions
export default conversationSlice.reducer