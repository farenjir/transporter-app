import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";

import { useAppContext } from "hooks";

const { Content } = Layout;

// const checkToken = getFromCookie(TOKEN_NAME);

const MainLayout = () => {
	const { direction } = useAppContext();
	const { token } = theme.useToken();
	// let navigate = useNavigate();
	// init
	// if (checkToken) return navigate("/user", { replace: true });
	// return
	return (
		<Layout dir={direction} className="h-screen" style={{ background: token.colorBgBase }}>
			<Content className="mx-auto px-2">
				{/* children */}
				<Outlet key={"main-layout"} />
				{/* children */}
			</Content>
		</Layout>
	);
};

export default MainLayout;
