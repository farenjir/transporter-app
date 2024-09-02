import { useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "store/auth";
import { modeSelector, setAppMode } from "store/mode";

import { SettingOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Skeleton, Spin, theme, Tooltip, Typography } from "antd";
import { useAppContext } from "hooks";

import { Drawers } from "components";
import { SettingDrawer } from "components/App";

import AppTour from "./components/tour";
import { useTourStore } from "./components/tour/index.store";

import Sidebar from "./components/Menu/MainMenu";

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
	const dispatch = useDispatch();
	const { appMode } = useSelector(modeSelector);
	const { user, loading } = useSelector(authSelector);
	const { direction, placement, logout, ...otherParams } = useAppContext();
	const references = useTourStore((state) => state.references);
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
		navigate(0);
	};
	const handleChangeAppMode = (mode) => {
		dispatch(setAppMode(mode));
	};
	// return
	return (
		<Layout dir={direction} className="min-h-screen">
			<Header
				className="flex h-12 align-middle items-center justify-between sticky top-0 px-3 md:px-8"
				style={{ background: token?.colorPrimaryLight }}
			>
				<div className={`flex items-center align-middle gap-3 md:gap-5 text-[${token?.colorPrimary}]`}>
					{loading ? (
						<Skeleton active paragraph={{ rows: 1, width: 100 }} title={false} className="mx-1" />
					) : user ? (
						<>
							<Link to={"/main"} className="hidden md:block pb-2">
								<img src="/assets/icons/vite.svg" alt="logo" height={25} width={25} />
							</Link>
							<Link to={"/user"} className="pt-1">
								<UserOutlined
									className={`text-[${token?.colorPrimary}] text-base md:text-xl`}
									onClick={() => onOpen("menu")}
								/>
								<span className="text-xs md:text-base uppercase mx-1" ref={references.profileRef}>
									{user?.fullName}
								</span>
							</Link>
							<span
								className={`${appMode === "send" ? "underline" : "text-gray-500"} text-sm md:text-lg cursor-pointer`}
								onClick={() => handleChangeAppMode("send")}
								ref={references.sendTypeRef}
							>
								{t("home.send")}
							</span>
							<span
								className={`${appMode === "get" ? "underline" : "text-gray-500"} text-sm md:text-lg cursor-pointer`}
								onClick={() => handleChangeAppMode("get")}
								ref={references.getTypeRef}
							>
								{t("home.get")}
							</span>
						</>
					) : (
						<div className="mx-10"></div>
					)}
				</div>
				<div className={`flex items-center align-middle gap-3 md:gap-5 text-[${token?.colorPrimary}] text-lg`}>
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
						ref={references.settingRef}
					/>
				</div>
			</Header>
			<Content style={{ background: token?.colorPrimaryLighter }} className="px-2">
				{/* <FloatLabel /> */}
				<AppTour />
				{/* children */}
				{loading ? (
					<Spin spinning fullscreen tip={t("messages.noAccess")} size="large" />
				) : user ? (
					<Outlet key={"user-layout"} />
				) : (
					<Navigate to={{ pathname: "/login" }} />
				)}
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
