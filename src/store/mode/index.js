import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	appMode: "send", // "send" ,  "get"
	formMode: "search", // "search" , "request"
	loading: true,
};

const modeSlice = createSlice({
	name: "mode",
	initialState,
	reducers: {
		setAppMode(state, action) {
			state.appMode = action.payload;
		},
		setFormMode(state, action) {
			state.formMode = action.payload;
		},
	},
});

export const {
	reducer: modeReducer,
	actions: { setAppMode, setFormMode },
} = modeSlice;

export const modeSelector = (state) => state?.mode || {}