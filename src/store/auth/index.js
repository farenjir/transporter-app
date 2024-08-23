import { createSlice } from "@reduxjs/toolkit";

import { TOKEN_NAME } from "utils/constance";

import { getCurrentUser } from "./action";
import { removeFromCookie } from "utils/storage";

const initialState = {
	user: null,
	loading: true,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearUser: (state) => {
			removeFromCookie(TOKEN_NAME, { path: "/" });
			state.user = null;
		},
	},
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
				const { firstName, lastName, ...info } = action.payload || {};
				state.user = action.payload ? { fullName: `${firstName} ${lastName}`, lastName, firstName, ...info } : null;
				state.loading = false;
			});
	},
});

export const {
	reducer: authReducer,
	actions: { clearUser },
} = authSlice;

export const authSelector = (state) => state?.auth || {};
