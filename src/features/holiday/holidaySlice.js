import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookies";
import { axiosInstance } from "../../config/axios.config";

export const getHolidays = createAsyncThunk(
    "getall/holiday",
    async () => {
        try {
            const url = "holidays";
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

export const getHoliday = createAsyncThunk(
    "get/holiday",
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

export const deleteHoliday = createAsyncThunk(
    "delete/holiday",
    async (payload) => {
        try {
            const url = "holidays/"+ payload;
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



export const postHoliday= createAsyncThunk(
    "post/holiday",
    async (payload) => {
        try {
            const url = "holidays";
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


export const patchHoliday = createAsyncThunk(
    "patch/holiday",
    async (payload) => {
        try {
            const { holidayId } = payload
            const data = payload.data
            const url = "holidays/" + holidayId;
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






const initialState = {
    allHolidayData: [],
    holidayResult: {},
    loading: false,
    error: {},
}

const holidaySlice = createSlice({
    name: "holiday",
    initialState,
    reducers: {

    },
    extraReducers: {
        [getHolidays.pending]: (state, action) => {
            state.loading = true;
        },
        [getHolidays.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.allHolidayData = result.data;
            } else {
                state.error = error;
            }
        },
        [getHolidays.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getHoliday.pending]: (state, action) => {
            state.loading = true;
        },
        [getHoliday.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.requestResult = result.data;
            } else {
                state.error = error;
            }
        },
        [getHoliday.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [postHoliday.pending]: (state, action) => {
            state.loading = true;
        },
        [postHoliday.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.holidayResult= (result.data);
            } else {
                state.error = error;
            }
        },
        [postHoliday.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [patchHoliday.pending]: (state, action) => {
            state.loading = true;
        },
        [patchHoliday.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.holidayResult = result.data;
            } else {
                state.error = error;
            }
        },
        [patchHoliday.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteHoliday.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteHoliday.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (!error) {
                state.requestResult = result.data;
            } else {
                state.error = error;
            }
        },
        [deleteHoliday.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

const { reducer, actions } = holidaySlice;
export default reducer;