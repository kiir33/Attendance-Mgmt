import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axios.config";

export const postEmail = createAsyncThunk(
    'post/email',
    async (payload, rejectWithValue) => {
        try {
            const url = "/forgot_password";
            const result = await axiosInstance.post(url, payload);
            return [result.data, null]
        } catch (error) {
            const err = error.response.data;
            return ([null, err])
        }
    }
)



export const patchPassword = createAsyncThunk(
    'patch/password',
    async (payload, { rejectWithValue }) => {
        try {
            const url = "reset_password";
            const result = await axiosInstance.post(url, payload);
            return [result, null]
        }
        catch (error) {
            const err = error.response.data;
            return ([null, err])
        }
    }
)


const initialState = {
    loading: false,
    result: {},
    error: {}
}

const ForgotPasswordSlice = createSlice({
    initialState,
    name: "resetPassword",
    reducers: {

    },
    extraReducers: {
        [postEmail.pending]: (state, action) => {
            state.loading = true;
        },
        [postEmail.fulfilled]: (state, action) => {
            const [result, error] = action.payload;
            state.loading = false;
            if (error) {
                state.error = error;
            } else {
                state.result = result;
            }
        },
        [postEmail.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [patchPassword.pending]: (state, action) => {
            state.loading = true;
        },
        [patchPassword.fulfilled]: (state, action) => {
            state.loading = false
            const [result, error] = action.payload;
            if (error) {
                state.error = error;
            } else {
                state.result = result;
            }
        },
        [patchPassword.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})


const { reducer, actions } = ForgotPasswordSlice;
export default reducer;