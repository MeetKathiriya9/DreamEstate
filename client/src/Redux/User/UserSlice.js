import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : null,
    loading : false
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        allError: (state) => {
            state.error = null
        },
        signInStart : (state) => {
            state.loading = true;
        },
        signInSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateInStart : (state) => {
            state.loading = true;
        },
        updateInSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        userOutStart : (state) => {
            state.loading = true;
        },
        userOutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        userOutFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const {signInStart, signInSuccess, signInFailure, allError, updateInStart, updateInSuccess, updateInFailure, userOutStart,userOutSuccess, userOutFailure} = userSlice.actions;
export default userSlice.reducer;