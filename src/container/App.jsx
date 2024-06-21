import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import store from "../store/store";
import ContextApi from "context/ContextApi";
// layout
import AuthLayout from "layout/AuthLayout";
import MainLayout from "layout/MainLayout";
import UserLayout from "layout/UserLayout";
// pages
import HomePage from "pages/main/home";

const authRoutes = {
	path: "/auth",
	element: <AuthLayout />,
	children: [
		{
			index: true,
			id: "auth",
			lazy: async () => ({ Component: (await import("../pages/main/auth/login")).default }),
		},
		{
			path: "register",
			id: "register",
			lazy: async () => ({ Component: (await import("../pages/main/auth/register")).default }),
		},
	],
};

const mainRoutes = {
	path: "/",
	element: <MainLayout />,
	children: [
		{
			index: true,
			id: "home",
			element: <HomePage />,
		},
		{
			path: "request",
			id: "request",
			lazy: async () => ({ Component: (await import("../pages/main/request")).default }),
		},
		{
			path: "request/:Id",
			id: "request/:Id",
			lazy: async () => ({ Component: (await import("../pages/main/request/_preview")).default }),
		},
	],
};

const userRoutes = {
	path: "/user",
	element: <UserLayout />,
	children: [
		{
			index: true,
			id: "profile",
			lazy: async () => ({ Component: (await import("../pages/user/profile")).default }),
		},
		{
			path: "history",
			id: "history",
			lazy: async () => ({ Component: (await import("../pages/user/history")).default }),
		},
	],
};

const adminRoutes = {};

const router = createBrowserRouter([mainRoutes, authRoutes, userRoutes, adminRoutes]);

const persistor = persistStore(store);

const App = () => {
	const { t } = useTranslation();
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ContextApi>
					<RouterProvider
						router={router}
						fallbackElement={<Spin size="large" tip={t("commons.loading")} fullscreen />}
					/>
				</ContextApi>
			</PersistGate>
		</Provider>
	);
};

export default App;
