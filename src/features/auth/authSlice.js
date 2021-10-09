import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axios.config";

export const fetchAuth = createAsyncThunk(
    "post/login",
    async (payload) => {
        try {
            const url = "login";
            const userData = await axiosInstance.post(url, payload)
            return [{ ...userData.data["data"] }, null];
        }
        catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const { data, status, headers } = error.response;
                return [null, { data, status, headers }]
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                return [null, error.request]
            } else {
                // Something happened in setting up the request that triggered an Error
                return [null, error.message]
            }
        };
    }
)

const initialState = {
    loading: false,
    userData: {},
    errorMessage: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchAuth.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.loading = false;
            const [data, error] = action.payload;
            if (error) {
                state.errorMessage = error.data.errors[0].title;
            } else {
                state.userData = { ...data };
                state.errorMessage = "";
            }
        },
        [fetchAuth.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false;
        }
    }
})

const { reducer } = authSlice;
export default reducer;