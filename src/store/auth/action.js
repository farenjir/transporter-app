import { createAsyncThunk } from "@reduxjs/toolkit";

import { TOKEN_NAME } from "utils/constance";
import { getFromCookie, setToCookie } from "utils/storage";

export const getCurrentUser = createAsyncThunk("auth/currentUser", async ({ callApi, token: loginToken }) => {
	let token = "";
	if (loginToken) {
		token = loginToken;
		setToCookie(TOKEN_NAME, loginToken);
	} else {
		token = getFromCookie(TOKEN_NAME);
	}
	// check token
	if (!token) return null;
	// get user
	return await callApi({ url: "UserProflie/GetMyProfile", updateToken: loginToken })
		.then((response) => response)
		.catch(() => null);
});
