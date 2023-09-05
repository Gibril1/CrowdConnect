import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IComment  } from '../../interfaces/CommentInterface'
import commentService from "./CommentService";

interface CommentState {
    comments: IComment []
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: any
}

const initialState = {
    comments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
} as CommentState



export const create = createAsyncThunk('comment/create', async(comment:IComment, thunkAPI) => {
    try {
        return await commentService.createComment(comment)
    } catch (error:any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message)||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers:{
        reset:(state) => {
            state.comments = []
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
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
            })
            .addCase(create.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.comments.push(action.payload)
            })
    }
})

export const { reset } = commentSlice.actions
export default commentSlice.reducer