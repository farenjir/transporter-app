import { Navigate, Outlet } from "react-router-dom";
import { Layout, Spin, theme } from "antd";

import { useSelector } from "react-redux";
import { authSelector } from "store/selector";

import { useAppContext } from "hooks";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

const AuthLayout = () => {
	const { t } = useTranslation();
	const { direction } = useAppContext();
	const { token } = theme.useToken();
	const { user, loading } = useSelector(authSelector);
	// return
	return (
		<Layout dir={direction} className="h-screen" style={{ background: token.colorBgBase }}>
			<Content className="mx-auto px-2">
				{/* children */}
				{loading ? (
					<Spin spinning fullscreen tip={t("commons.loading")} size="large" />
				) : user ? (
					<Navigate to={{ pathname: "/user" }} />
				) : (
					<Outlet key={"main-layout"} />
				)}
				{/* children */}
			</Content>
		</Layout>
	);
};

export default AuthLayout;
