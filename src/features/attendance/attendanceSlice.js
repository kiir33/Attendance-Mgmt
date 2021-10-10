import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookies";
import { axiosInstance } from "../../config/axios.config";

export const getAllAttendance = createAsyncThunk(
        "get/allAttendance",
        async (payload) => {
            try {
                const url = "all_attendances";
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


export const getAttendance = createAsyncThunk(
    "get/myAttendance",
    async () => {
        try {
            const url = "attendances";
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

export const getUserAttendance = createAsyncThunk(
    "get/userAttendance",
    async (payload) => {
        try {
            const url = "user_attendances/" + payload;
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const attendance = await axiosInstance.get(url);
            return [attendance.data, null];
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

export const postAttendance = createAsyncThunk(
    "post/attendance",
    async (payload = {}) => {
        try {
            const url = "attendances";
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


export const patchAttendance = createAsyncThunk(
    "patch/attendance",
    async (payload = {}) => {
        try {
            const { attId } = payload
            const data = payload.data || {}
            const url = "attendances/" + attId;
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

export const deleteAttendance = createAsyncThunk(
    "delete/attendance",
    async (payload) => {
        try {
            const { attId } = payload
            const url = "attendances/" + attId;
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const result = await axiosInstance.delete(url);
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
    allAttendanceData: [],
    attendanceResult: {},
    loading: false,
    error: {},
    clockout: false,
}

const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {

    },
    extraReducers: {
        [getAllAttendance.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllAttendance.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.allAttendanceData = result.data;
            } else {
                state.error = error;
            }
        },
        [getAllAttendance.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getAttendance.pending]: (state, action) => {
            state.loading = true;
        },
        [getAttendance.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.allAttendanceData = result.data;
            } else {
                state.error = error;
            }
        },
        [getAttendance.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getUserAttendance.pending]: (state, action) => {
            state.loading = true;
        },
        [getUserAttendance.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.allAttendanceData = result.data;
            } else {
                state.error = error;
            }
        },
        [getUserAttendance.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [postAttendance.pending]: (state, action) => {
            state.loading = true;
        },
        [postAttendance.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.attendanceResult = result.data;
                state.allAttendanceData[state.allAttendanceData.length - 1] = result.data;
            } else {
                state.error = error;
            }
        },
        [postAttendance.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [patchAttendance.pending]: (state, action) => {
            state.loading = true;
        },
        [patchAttendance.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.attendanceResult = result.data;
                state.allAttendanceData[state.allAttendanceData.length - 1] = result.data
            } else {
                state.error = error;
            }
        },
        [patchAttendance.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

const { reducer } = attendanceSlice;
export default reducer;