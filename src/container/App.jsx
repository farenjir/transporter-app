import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import store from "../store/store";
import i18n from "../langs/i18n";

import ContextApi from "context/ContextApi";
// layout
import { Loadings } from "components";
import MainLayout from "layout/MainLayout";
import UserLayout from "layout/UserLayout";
// pages
import Authentication from "pages/main/auth";

const mainRoutes = {
	path: "/",
	element: <MainLayout />,
	children: [
		{
			index: true,
			id: "auth",
			element: <Authentication />,
		},
	],
};

const userRoutes = {
	path: "/user",
	element: <UserLayout />,
	children: [
		{
			index: true,
			id: "user",
			lazy: async () => ({ Component: (await import("../pages/user/home")).default }),
		},
	],
};

const adminRoutes = {};

const router = createBrowserRouter([mainRoutes, userRoutes, adminRoutes]);

const App = () => (
	<Provider store={store}>
		<I18nextProvider i18n={i18n}>
			<ContextApi>
				<RouterProvider router={router} fallbackElement={<Loadings />} />
			</ContextApi>
		</I18nextProvider>
	</Provider>
);

export default App;
