import { createSlice } from "@reduxjs/toolkit";

import { getCurrentUser } from "./action";

const initialState = {
	user: null,
	loading: true,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// getCurrentUser
			.addCase(getCurrentUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCurrentUser.rejected, (state) => {
				state.user = null;
				state.loading = false;
			})
			.addCase(getCurrentUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.loading = false;
			})
	},
});

export const { reducer: authReducer, actions: authActions } = authSlice;
