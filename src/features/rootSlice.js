import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        role: 3
    }
}

const root = createSlice({
    initialState,
    name: "root",
    reducers: {
        setState: (state, action) => {
            state.data =  action.payload;
        }
    }
})

const {reducer, actions} = root;
export const {setState} = actions;
export default reducer;