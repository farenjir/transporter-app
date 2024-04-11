import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SettingOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, theme, Typography } from "antd";
import { useAppContext } from "hooks";

import { Drawers, SettingDrawer } from "components";
import Sidebar from "./components/Sidebar";

const { Text } = Typography;
// layoutModules
const { Header, Content, Footer } = Layout;

const UserLayout = () => {
	const [open, setOpen] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	// theme
	const { direction, placement, ...otherParams } = useAppContext();
	// handles
	const onClose = () => {
		setOpen(false);
		setOpenMenu(false);
	};
	const onOpen = (isMenu) => {
		if (isMenu) {
			setOpenMenu(true);
		} else {
			setOpen(true);
		}
	};
	// return
	return (
		<Layout dir={direction} className="min-h-screen">
			<Header
				className="relative flex h-12 items-center justify-between"
				style={{ background: token?.colorPrimaryLight }}
			>
				<MenuOutlined className={`text-[${token?.colorPrimary}] text-xl pt-1`} onClick={() => onOpen("menu")} />
				<img src="/assets/icons/vite.svg" alt="logo" height={25} width={25} />
				<SettingOutlined className={`text-[${token?.colorPrimary}] text-xl pt-1`} onClick={() => onOpen()} />
				<Drawers
					title={t("layouts.sidebar.menu")}
					open={openMenu}
					onClose={onClose}
					placement={placement === "left" ? "right" : "left"}
					content={<Sidebar {...{ token }} />}
				/>
				<Drawers
					title={t("layouts.drawerTitle")}
					open={open}
					onClose={onClose}
					placement={placement}
					content={<SettingDrawer {...otherParams} />}
				/>
			</Header>
			<Content>
				{/* children */}
				<Outlet key={"user-layout"} />
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
