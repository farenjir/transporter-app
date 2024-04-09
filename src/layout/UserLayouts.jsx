import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAppContext } from "@/hooks";

import { Layout, theme, Typography } from "antd";
import { Drawers, SettingDrawer } from "@/components";
import MainNavbar from "./components/Navbar";

const { Text } = Typography;
// layoutModules
const { Header, Content, Footer } = Layout;

const UserLayout = () => {
	const [open, setOpen] = useState(false);
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	// theme
	const { direction, placement, ...otherParams } = useAppContext();
	// handles
	const onCloseDrawer = useCallback((navAction) => {
		setOpen(navAction ? (perValue) => !perValue : false);
	}, []);
	// return
	return (
		<Layout dir={direction} className="h-screen">
			<Header style={{ background: token?.colorPrimaryLight, height: 50 }}>
				<MainNavbar {...{ onCloseDrawer, token }} />
				<Drawers
					title={t("layouts.drawerTitle")}
					open={open}
					onClose={onCloseDrawer}
					placement={placement}
					content={<SettingDrawer {...otherParams} />}
				/>
			</Header>
			<Content className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				{/* children */}
				<Outlet key={"main-layout"} />
				{/* children */}
			</Content>
			<Footer>
				<div
					style={{ background: token?.colorPrimaryLight, border: "1px solid", height: 50 }}
					className="grid place-content-center rounded-lg mt-3"
				>
					<Text>{t("layouts.footer.copyWrite")}</Text>
				</div>
			</Footer>
		</Layout>
	);
};

export default UserLayout;
