import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: 3
}

const root = createSlice({
    initialState,
    name: "root",
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        }
    }
})

const {reducer, actions} = root;
export const {setRole} = actions;
export default reducer;