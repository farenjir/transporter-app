import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Menu } from "antd";
import { FileDoneOutlined, IdcardOutlined } from "@ant-design/icons";
import ProfileCard from "../Card/Profile";

const UserMenu = ({ user = {} }) => {
	// hooks
	const { t } = useTranslation();
	// option
	const items = [
		{ label: t("user.myInfo"), icon: IdcardOutlined, path: "/user" },
		{ label: t("user.myHistory"), icon: FileDoneOutlined, path: "/user/history" },
	];
	const [defaultSelectedKeys] = items;
	// return
	return (
		<>
			<ProfileCard {...(user || {})} />
			<Menu
				className="max-w-screen-sm bg-transparent"
				defaultSelectedKeys={defaultSelectedKeys.label}
				mode="inline"
			>
				{items.map(({ label, icon, path }) => (
					<Menu.Item key={label} icon={React.createElement(icon, { style: { fontSize: "20px" } })}>
						<Link to={path}>{label}</Link>
					</Menu.Item>
				))}
			</Menu>
		</>
	);
};

export default UserMenu;
