import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axios.config";
import { getCookie } from "../../utils/cookies";

export const fetchAllUsers = createAsyncThunk(
    "get/users",
    async () => {
        try {
            const AUTHTOKEN = getCookie("token");
            axiosInstance.defaults.headers.common["Authorization"] = AUTHTOKEN;
            const allUsers = await axiosInstance.get("users")
            return [allUsers.data, null]
        }
        catch (error) {
            return [null, error.message];
        }
    }
)

const initialState = {
    data: [],
    mapIdToName: {}
}

const allUserSlice = createSlice({
    initialState,
    name: "employee",
    reducers: {

    },
    extraReducers: {
        [fetchAllUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchAllUsers.fulfilled]: (state, action) => {
            state.loading = false;
            const [result, error] = action.payload;
            if (error) {
                state.error = error;
            } else {
                state.data = [ ...result.data ];
                // state.mapIdToName = result.data.map((elem)=> {
                //     return {id: elem.id, name: elem.name};
                // })
                state.data.forEach(elem => {
                    state.mapIdToName[`${elem.id}`] = elem.name
                })
            }
        
        },
        [fetchAllUsers.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        }
    }
})

const { reducer } = allUserSlice;

export default reducer;
