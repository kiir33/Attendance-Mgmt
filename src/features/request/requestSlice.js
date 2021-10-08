import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookies";
import { axiosInstance } from "../../config/axios.config";

export const getAllRequest = createAsyncThunk(
    "getall/request",
    async () => {
        try {
            const url = "all_requests";
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const allAttendance = await axiosInstance.get(url);
            return [allAttendance.data, null];
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

export const getRequest = createAsyncThunk(
    "get/request",
    async (payload) => {
        try {
            const url = "requests/"+ payload;
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const allAttendance = await axiosInstance.get(url);
            return [allAttendance.data, null];
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


export const getMyRequest = createAsyncThunk(
    "get/myRequest",
    async () => {
        try {
            const url = "requests";
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const allAttendance = await axiosInstance.get(url);
            return [allAttendance.data, null];
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

export const getUserRequest = createAsyncThunk(
    "get/userRequest",
    async (payload) => {
        try {
            const url = "user_requests/" + payload;
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const request = await axiosInstance.get(url);
            return [request.data, null];
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

export const postRequest = createAsyncThunk(
    "post/request",
    async (payload) => {
        try {
            const url = "requests";
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const result = await axiosInstance.post(url, payload);
            return [result.data, null];
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


export const patchRequest = createAsyncThunk(
    "patch/request",
    async (payload) => {
        try {
            const { requestId } = payload
            const data = payload.data
            const url = "requests/" + requestId;
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const result = await axiosInstance.patch(url, data);
            return [result.data, null];
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


export const approveRequest = createAsyncThunk(
    "approve/request",
    async (payload) => {
        try {
            const url = "approve_request/" + payload;
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const result = await axiosInstance.get(url);
            return [result.data, null];
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

export const rejectRequest = createAsyncThunk(
    "reject/request",
    async (payload) => {
        try {
            const url = "reject_request/" + payload;
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const result = await axiosInstance.get(url);
            return [result.data, null];
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



const initialState = {
    allRequestData: [],
    requestresult: {},
    myRequestData: [],
    loading: false,
    error: {},
}

const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {

    },
    extraReducers: {
        [getAllRequest.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllRequest.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.allRequestData = result.data;
            } else {
                state.error = error;
            }
        },
        [getAllRequest.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getRequest.pending]: (state, action) => {
            state.loading = true;
        },
        [getRequest.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.requestResult = result.data;
            } else {
                state.error = error;
            }
        },
        [getRequest.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getMyRequest.pending]: (state, action) => {
            state.loading = true;
        },
        [getMyRequest.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.myRequestData = result.data;
            } else {
                state.error = error;
            }
        },
        [getMyRequest.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getUserRequest.pending]: (state, action) => {
            state.loading = true;
        },
        [getUserRequest.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.allRequestData = result.data;
            } else {
                state.error = error;
            }
        },
        [getUserRequest.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [postRequest.pending]: (state, action) => {
            state.loading = true;
        },
        [postRequest.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.requestResult = result.data;
                state.allRequestData.push(result.data);
            } else {
                state.error = error;
            }
        },
        [postRequest.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [patchRequest.pending]: (state, action) => {
            state.loading = true;
        },
        [patchRequest.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.requestResult = result.data;
            } else {
                state.error = error;
            }
        },
        [patchRequest.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

const { reducer, actions } = requestSlice;
export default reducer;