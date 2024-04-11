import { Outlet } from "react-router-dom";

import { Layout, theme } from "antd";
import { useAppContext } from "hooks";

// layoutModules
const { Content } = Layout;

const MainLayout = () => {
	const { direction } = useAppContext();
	const { token } = theme.useToken();
	// return
	return (
		<Layout dir={direction} className="h-screen" style={{ background: token.colorBgBase }}>
			<Content className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				{/* children */}
				<Outlet key={"main-layout"} />
				{/* children */}
			</Content>
		</Layout>
	);
};

export default MainLayout;
