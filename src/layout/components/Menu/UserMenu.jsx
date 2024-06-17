import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import { FileDoneOutlined, IdcardOutlined } from "@ant-design/icons";
import ProfileCard from "../Card/Profile";

const UserMenu = ({ user = {} }) => {
	const items = [
		{ label: "مشخصات من", icon: IdcardOutlined, path: "/user" },
		{ label: "سوابق درخواست ها", icon: FileDoneOutlined, path: "/user/history" },
	];
	// option
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
