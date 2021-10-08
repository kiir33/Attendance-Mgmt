import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axios.config";
import { getCookie } from "../../utils/cookies";


export const fetchUserDetail = createAsyncThunk(
    "get/user/",
    async (payload) => {
        try {
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const userData = await axiosInstance.get(`users/${payload}`)
            return [userData.data, null];
        }
        catch (error) {
            if (error.response) {
                const { data, status, headers } = error.response;
                return [null, { data, status, headers }]
            } else if (error.request) {
                return [null, error.request]
            } else {
                return [null, error.message]
            }

        }

    }
)

export const postNewUser = createAsyncThunk(
    "post/users",
    async (payload, { rejectWithValue }) => {
        try {
            const url = "/users"
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const userData = await axiosInstance.post(url, payload);
            return [userData.data, null];
        }
        catch (error) {
            if (error.response) {
                const { data, status, headers } = error.response;
                return [null, { data, status, headers }]
            } else if (error.request) {
                return [null, error.request]
            } else {
                return [null, error.message]
            }
        }
    }
)

export const updateExistingUser = createAsyncThunk(
    "patch/user",
    async (payload) => {
        try {
            const url = `/users/${payload.user.id}`
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const userData = await axiosInstance.patch(url, payload.user);
            return [userData.data, null];
        }
        catch (error) {
            if (error.response) {
                const { data, status, headers } = error.response;
                return [null, { data, status, headers }]
            } else if (error.request) {
                return [null, error.request]
            } else {
                return [null, error.message]
            }
        }
    }
)

export const deleteUser = createAsyncThunk(
    "delete/user",
    async (payload) => {
        try {
            const url = `users/${payload}`
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const result = await axiosInstance.delete(url);
            return [result.data, null];
        }catch(error){
            if (error.response) {
                const { data, status, headers } = error.response;
                return [null, { data, status, headers }]
            } else if (error.request) {
                return [null, error.request]
            } else {
                return [null, error.message]
            }
        }
    }
)



const initialState = {
    data: {},
    loading: false,
    error: "",
}
const userDetailSlice = createSlice({
    initialState,
    name: "userDetail",
    reducers: {
        resetError: (state) => {
            state.error = "";
        }
    },
    extraReducers: {
        [fetchUserDetail.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUserDetail.fulfilled]: (state, action) => {
            state.loading = false;
            const [userData, error] = action.payload
            if (!error) {
                state.data = userData.data;
            } else {
                state.error = error.message;
            }
        },
        [fetchUserDetail.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        [postNewUser.pending]: (state, action) => {
            state.loading = true;
        },
        [postNewUser.fulfilled]: (state, action) => {
            state.loading = false;
            const [userData, error] = action.payload
            if (!error) {
                state.data = userData.user;
            } else {
                state.error = error;
            }
        },
        [postNewUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [updateExistingUser.pending]: (state, action) => {
            state.loading = true;
        },
        [updateExistingUser.fulfilled]: (state, action) => {
            state.loading = false;
            const [userData, error] = action.payload
            if (!error) {
                state.data = userData.user;
            } else {
                state.error = error;
            }
        },
        [updateExistingUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [deleteUser.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            const [userData, error] = action.payload
            if (!error) {
                state.data = userData.user;
            } else {
                state.error = error;
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

const { reducer, actions } = userDetailSlice;

export const { } = actions;
export default reducer;