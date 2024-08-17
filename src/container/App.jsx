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

const authRoutes = {
	path: "/",
	element: <AuthLayout />,
	children: [
		{
			index: true,
			id: "lang",
			lazy: async () => ({ Component: (await import("../pages/main/lang")).default }),
		},
		{
			path: "login",
			id: "login",
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
	path: "/main",
	element: <MainLayout />,
	children: [
		{
			index: true,
			id: "home",
			lazy: async () => ({ Component: (await import("../pages/user/home")).default }),
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
			path: "history/get",
			id: "history/get",
			lazy: async () => ({ Component: (await import("../pages/user/history")).default }),
		},
		{
			path: "history/send",
			id: "history/send",
			lazy: async () => ({ Component: (await import("../pages/user/history")).default }),
		},
		{
			path: "history/send/comment",
			id: "history/send/comment",
			lazy: async () => ({ Component: (await import("../pages/user/historyComment")).default }),
		},
		{
			path: "history/get/comment",
			id: "history/get/comment",
			lazy: async () => ({ Component: (await import("../pages/user/historyComment")).default }),
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
