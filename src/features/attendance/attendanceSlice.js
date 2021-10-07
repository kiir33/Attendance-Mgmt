import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookies";
import { axiosInstance } from "../../config/axios.config";

export const getAllAttendance = createAsyncThunk(
    "getall/attendance",
    async (payload) => {
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

const initialState = {
    allAttendanceData: [],
    loading: false,
    error: {},
}

const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers:{

    },
    extraReducers: {
        [getAllAttendance.pending] : (state, action) => {
            state.loading = true;
        },
        [getAllAttendance.fulfilled] : (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if(!error){
                state.allAttendance = result;
            }else{
                state.error = error;
            }
        },
        [getAllAttendance.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

const {reducer, actions} = attendanceSlice;
export default reducer;