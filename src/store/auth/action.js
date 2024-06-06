import { createAsyncThunk } from "@reduxjs/toolkit";

import { setToCookie, getFromCookie } from "utils/storage";

export const getCurrentUser = createAsyncThunk("auth/currentUser", async ({ callApi }) => {
	const token = getFromCookie("access_token")
	if (!token) return { user: null }
	return await callApi({ url: `artist/${"id"}` })
		.then(({ token, ...response }) => {
			setToCookie("access_token", token);
			return { user: response };
		})
		.catch(() => ({ user: null }));
});
