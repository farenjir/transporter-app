import { createAsyncThunk } from "@reduxjs/toolkit";

import { TOKEN_NAME } from "utils/constance";
import { getFromCookie } from "utils/storage";

export const getCurrentUser = createAsyncThunk(
	"auth/currentUser",
	async ({ callApi, updateUser = false }, { getState }) => {
		// check token
		const token = getFromCookie(TOKEN_NAME);
		if (!token && !updateUser) return null;
		// reload cache user data
		const {
			auth: { user },
		} = getState();
		if (user && !updateUser) return user;
		// get user
		return await callApi({ url: "UserProflie/GetMyProfile" })
			.then((response) => response)
			.catch(() => null);
	},
);
