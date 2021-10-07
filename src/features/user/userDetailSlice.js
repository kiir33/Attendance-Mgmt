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
            return [null, JSON.parse(error)]
        }

    }
)

export const postNewUser = createAsyncThunk(
    "post/users",
    async (payload,{rejectWithValue}) => {
        try {
            const url = "/users"
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const userData = await axiosInstance.post(url, payload);
            return [userData.data, null];
        }
        catch (error) {
            const err = rejectWithValue(error).payload.response.data;
            return ([null, err])
        }
    }
)

export const updateExistingUser = createAsyncThunk(
    "patch/user",
    async (payload,{rejectWithValue}) => {
        try {
            const url = "/users"
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const userData = await axiosInstance.patch(url, payload);
            return [userData.data, null];
        }
        catch (error) {
            const err = rejectWithValue(error).payload.response.data;
            return ([null, err])        }
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
                state.data = userData.user;
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
    }
})

const { reducer, actions } = userDetailSlice;

export const { } = actions;
export default reducer;