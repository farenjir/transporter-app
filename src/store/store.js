import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth";
import { modeReducer } from "./mode";
import { basesReducer } from "./base";

const isNotProduction = import.meta.env.NODE_ENV !== "production";

const additionalMiddleware = [];
if (isNotProduction) {
	additionalMiddleware.push(logger);
}

const reducers = combineReducers({
	auth: authReducer,
	mode: modeReducer,
	bases: basesReducer,
});

const persistedReducer = persistReducer(
	{
		key: "root",
		storage,
		blacklist: ["auth"],
	},
	reducers,
);

export default configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(additionalMiddleware),
	devTools: isNotProduction,
});
