import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";

import { authReducer } from "./auth";


const reducer = {
	auth: authReducer,
};

const additionalMiddleware = [];
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
	additionalMiddleware.push(logger);
}

// *** initialize redux store
export const store = configureStore({
	reducer,
	// eslint-disable-next-line no-undef
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(additionalMiddleware),
});

export default store;