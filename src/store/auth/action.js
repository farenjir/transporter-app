import { createAsyncThunk } from "@reduxjs/toolkit";

import { TOKEN_NAME } from "utils/constance";
import { setToCookie, getFromCookie } from "utils/storage";

export const getCurrentUser = createAsyncThunk("auth/currentUser", async ({ callApi }) => {
	const token = getFromCookie(TOKEN_NAME)
	return { user: null }
	// return await callApi({ url: `artist/${"id"}` })
	// 	.then(({ token, ...response }) => {
	// 		setToCookie(TOKEN_NAME, token);
	// 		return { user: response };
	// 	})
	// 	.catch(() => ({ user: null }));
});
