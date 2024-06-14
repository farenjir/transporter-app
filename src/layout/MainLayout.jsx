import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SettingOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, theme, Typography } from "antd";
import { useAppContext } from "hooks";

import { Drawers } from "components";
import { SettingDrawer } from "components/App";

import Sidebar from "./components/Sidebar";
import FloatLabel from "./components/Float";

const { Text } = Typography;
// layoutModules
const { Header, Content, Footer } = Layout;

const MainLayout = () => {
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
				<Link to={"/user"}>
					<img src="/assets/icons/vite.svg" alt="logo" height={25} width={25} />
				</Link>
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
			<Content style={{ background: token?.colorPrimaryLighter }} className="px-2">
				<FloatLabel />
				{/* children */}
				<Outlet key={"user-layout"} />
				{/* children */}
			</Content>
			<Footer style={{ background: token?.colorPrimaryLighter }}>
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

export default MainLayout;
