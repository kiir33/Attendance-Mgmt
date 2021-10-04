import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import auth from "./auth";
import { setCookie } from "../../utils/cookies";

export const fetchAuth = createAsyncThunk(
    "post/user",
    async (payload) => {
        try {
            const url = "https://nameless-sands-43248.herokuapp.com/api/v1/login";
            const userData = await axios.post(url, payload)
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
    authenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        toggleAuthenticated: (state, action) => {
            return !state.authenticated
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.loading = false;
            const [data, error] = action.payload;
            if (error) {
                state.error = error.data.error;
                state.authenticated = false;
            } else {
                state.userData = { ...data };
                state.authenticated = true;
            }
        },
        [fetchAuth.rejected]: (state, action) => {
            state.loading = false;
            console.log("rejected")
        }
    }
})

const { reducer, actions } = authSlice;
export const { toggleAuthenticated } = actions;
export default reducer;