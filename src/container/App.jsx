import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import store from "../store/store";
import i18n from "../langs/i18n";

import ContextApi from "context/ContextApi";
// layout
import { Loadings } from "components";
import MainLayout from "layout/MainLayout";
import UserLayout from "layout/UserLayout";
// pages
import Authentication from "pages/main/auth";

const authRoutes = {
	path: "/auth",
	element: <MainLayout />,
	children: [
		{
			index: true,
			id: "auth",
			element: <Authentication />,
		},
		{
			path: "register",
			id: "register",
			lazy: async () => ({ Component: (await import("../pages/main/register")).default }),
		},
	],
};

const mainRoutes = {
	path: "/",
	element: <UserLayout />,
	children: [
		{
			index: true,
			id: "user",
			lazy: async () => ({ Component: (await import("../pages/main/home")).default }),
		},
		{
			path: "search",
			id: "search",
			lazy: async () => ({ Component: (await import("../pages/main/search")).default }),
		},
		{
			path: "history",
			id: "history",
			lazy: async () => ({ Component: (await import("../pages/main/history")).default }),
		},
	],
};

const userRoutes = {};

const adminRoutes = {};

const router = createBrowserRouter([mainRoutes,authRoutes, userRoutes, adminRoutes]);

const persistor = persistStore(store);

const App = () => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<I18nextProvider i18n={i18n}>
				<ContextApi>
					<RouterProvider router={router} fallbackElement={<Loadings />} />
				</ContextApi>
			</I18nextProvider>
		</PersistGate>
	</Provider>
);

export default App;
