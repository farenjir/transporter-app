import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Layout, Spin, theme } from "antd";

import { useSelector } from "react-redux";
import { authSelector } from "store/auth";

import { INIT_APP } from "utils/constance";
import { getFromStorage } from "utils/storage";
import { useAppContext } from "hooks";

const { Content } = Layout;

const AuthLayout = () => {
	const { direction } = useAppContext();
	const { token } = theme.useToken();
	const { pathname } = useLocation();
	const { user, loading } = useSelector(authSelector);
	// return
	const appInitialize = getFromStorage(INIT_APP);
	return (
		<Layout dir={direction} className="h-screen" style={{ background: token.colorBgBase }}>
			<Content className="mx-auto px-2">
				{/* children */}
				{loading ? (
					<Spin spinning fullscreen size="large" />
				) : !appInitialize && pathname !== "/" ? (
					<Navigate to={{ pathname: "/" }} />
				) : user ? (
					<Navigate to={{ pathname: "/main" }} />
				) : appInitialize && pathname === "/" ? (
					<Navigate to={{ pathname: "/login" }} />
				) : (
					<Outlet key={"main-layout"} />
				)}
				{/* children */}
			</Content>
		</Layout>
	);
};

export default AuthLayout;
