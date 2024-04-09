import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import store from "../store/store";
import i18n from "../langs/i18n";

import ContextApi from "context/ContextApi";
// layout
import { Loadings } from "components";
import UserLayout from "layout/UserLayouts";
// pages
import Authentication from "pages/main/auth";

const mainRoutes = {
	path: "/",
	element: <Authentication />,
};

const userRoutes = {
	path: "/user",
	element: <UserLayout />,
	children: [
		{
			index: true,
			id: "user",
			// element: <HomePage />,
			// 	lazy: async () => ({ Component: (await import("../pages/main/search")).default }),
		},
		// {
		// 	path: "search",
		// 	id: "search",
		// 	lazy: async () => ({ Component: (await import("../pages/main/search")).default }),
		// },
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
