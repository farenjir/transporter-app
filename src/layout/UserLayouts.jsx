import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SettingOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, theme, Typography } from "antd";
import { useAppContext } from "hooks";

import { Drawers, SettingDrawer } from "components";

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
		<Layout dir={direction} className="h-screen">
			<Header style={{ background: token?.colorPrimaryLight, height: 50 }}>
				<div className="relative flex h-12 items-center justify-between">
					<MenuOutlined
						className={`text-[${token?.colorPrimary}] text-xl pt-1`}
						onClick={() => onOpen("menu")}
					/>
					<SettingOutlined
						className={`text-[${token?.colorPrimary}] text-xl pt-1`}
						onClick={() => onOpen()}
					/>
				</div>
				<Drawers
					title={t("layouts.menu")}
					open={openMenu}
					onClose={onClose}
					placement={placement === "left" ? "right" : "left"}
					content={"<MainNavbar {...{ onCloseDrawer: onClose, token }} />"}
				/>
				<Drawers
					title={t("layouts.drawerTitle")}
					open={open}
					onClose={onClose}
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
