import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { authSelector } from "store/selector";

import {
	SettingOutlined,
	MenuOutlined,
	RocketOutlined,
	UserOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Skeleton, theme, Tooltip, Typography } from "antd";
import { useAppContext } from "hooks";

import { Drawers } from "components";
import { SettingDrawer } from "components/App";

import Sidebar from "./components/Menu/MainMenu";
import FloatLabel from "./components/Float";

const { Text } = Typography;
// layoutModules
const { Header, Content, Footer } = Layout;

const MainLayout = () => {
	const [open, setOpen] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	// hooks
	let navigate = useNavigate();
	const { t } = useTranslation();
	const { token } = theme.useToken();
	const { user, loading } = useSelector(authSelector);
	const { direction, placement, logout, ...otherParams } = useAppContext();
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
	const handleLogout = () => {
		logout();
		navigate("/", { replace: true });
	};
	// return
	return (
		<Layout dir={direction} className="min-h-screen">
			<Header
				className="flex h-12 items-center justify-between sticky top-0"
				style={{ background: token?.colorPrimaryLight }}
			>
				<div className={`flex items-center gap-5 text-[${token?.colorPrimary}] text-xl`}>
					<MenuOutlined
						className={`text-[${token?.colorPrimary}] text-xl`}
						onClick={() => onOpen("menu")}
					/>
					{loading ? (
						<Skeleton active paragraph={{ rows: 1, width: 100 }} title={false} className="mx-1" />
					) : user ? (
						<Link to={"/user"} className="pt-2">
							<span className="text-sm uppercase mx-1">{user?.fullName}</span>
						</Link>
					) : (
						<div className="mx-10"></div>
					)}
				</div>
				<Link to={"/"}>
					<img src="/assets/icons/vite.svg" alt="logo" height={25} width={25} />
				</Link>
				<div className={`flex items-center gap-5 text-[${token?.colorPrimary}] text-lg`}>
					{loading ? (
						<Skeleton active paragraph={{ rows: 1, width: 100 }} title={false} className="mx-1" />
					) : user ? (
						<Tooltip title={t("layouts.exit")}>
							<LogoutOutlined className="cursor-pointer" onClick={handleLogout} />
						</Tooltip>
					) : (
						<Link to={"/auth"} className="flex gap-1 items-center">
							<span className="!text-sm mx-1 pt-1"> {t("layouts.authToo")}</span>
							<UserOutlined />
						</Link>
					)}
					<SettingOutlined
						className={`text-[${token?.colorPrimary}] text-xl`}
						onClick={() => onOpen()}
					/>
				</div>
			</Header>
			<Content style={{ background: token?.colorPrimaryLighter }} className="px-2">
				<FloatLabel />
				{/* children */}
				<Outlet key={"user-layout"} />
				{/* children */}
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
