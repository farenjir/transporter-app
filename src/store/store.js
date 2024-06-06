import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth";
import { basesReducer } from "./base";

const additionalMiddleware = [];
if (import.meta.env.NODE_ENV !== "production") {
	additionalMiddleware.push(logger);
}

const reducers = combineReducers({
	auth: authReducer,
	bases: basesReducer,
});

const persistedReducer = persistReducer(
	{
		key: "root:sc",
		storage,
		blacklist: ["auth"]
	},
	reducers,
);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(additionalMiddleware),
	devTools: import.meta.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
