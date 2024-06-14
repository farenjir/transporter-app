import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth";
import { basesReducer } from "./base";

// eslint-disable-next-line no-undef
const isNotProduction = process.env.NODE_ENV !== "production"

const additionalMiddleware = [];
if (isNotProduction) {
	additionalMiddleware.push(logger);
}

const reducers = combineReducers({
	auth: authReducer,
	bases: basesReducer,
});

const persistedReducer = persistReducer(
	{
		key: "root",
		storage,
		// blacklist: [""]
	},
	reducers,
);

export default configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(additionalMiddleware),
	devTools: isNotProduction,
});


