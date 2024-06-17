import React from "react";
import { Link } from "react-router-dom";
import {
	AppstoreOutlined,
	CustomerServiceOutlined,
	FileDoneOutlined,
	IdcardOutlined,
	InfoCircleOutlined,
	SolutionOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Menu, theme } from "antd";
import ProfileCard from "../Card/Profile";

const UserMenu = () => {
	const { token } = theme.useToken();
	const items = [{ label: "سوابق درخواست ها", icon: UserOutlined, path: "/user/history" }];
	// option
	const [defaultSelectedKeys] = items;
	// return
	return (
		<>
			<ProfileCard />
			<Menu
				// style={{ background: token?.colorPrimaryLighter }}
				className="max-w-96 bg-transparent"
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
