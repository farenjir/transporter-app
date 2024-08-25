import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";

import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "langs/i18n";

import store from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

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
			id: "dashboard",
			lazy: async () => ({ Component: (await import("../pages/user/dashboard")).default }),
		},
		{
			path: "profile",
			id: "history/profile",
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
		<I18nextProvider i18n={i18n}>
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
		</I18nextProvider>
	);
};

export default App;
