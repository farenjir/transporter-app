import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Menu } from "antd";
import { FileDoneOutlined, DashboardOutlined, CommentOutlined, IdcardOutlined } from "@ant-design/icons";
import ProfileCard from "../Card/Profile";

const UserMenu = ({ user = {} }) => {
	// hooks
	const { t } = useTranslation();
	// option
	const items = [
		{ label: t("user.dashboard"), icon: DashboardOutlined, path: "/user" },
		{ label: t("user.myInfo"), icon: IdcardOutlined, path: "/user/profile" },
		{ label: t("user.myHistorySend"), icon: FileDoneOutlined, path: "/user/history/send", type: "send" },
		{ label: t("user.myHistoryGet"), icon: FileDoneOutlined, path: "/user/history/get", type: "get" },
		{ label: t("user.myHistorySendComment"), icon: CommentOutlined, path: "/user/history/send/comment", type: "send" },
		{ label: t("user.myHistoryGetComment"), icon: CommentOutlined, path: "/user/history/get/comment", type: "get" },
	];
	const [defaultSelectedKeys] = items;
	// return
	return (
		<>
			<ProfileCard {...(user || {})} />
			<Menu className="max-w-screen-sm bg-transparent" defaultSelectedKeys={defaultSelectedKeys.label} mode="inline">
				{items.map(({ label, icon, path, type }) => (
					<Menu.Item key={label} icon={React.createElement(icon, { style: { fontSize: "20px" } })}>
						<Link to={path} state={{ type }}>
							{label}
						</Link>
					</Menu.Item>
				))}
			</Menu>
		</>
	);
};

export default UserMenu;
