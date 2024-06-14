import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Dropdown } from "antd";
import { HomeOutlined, MenuOutlined } from "@ant-design/icons";

export default function NavbarMobileMenu({ user }) {
	const { t } = useTranslation();
	// links
	const links = [{ to: "/", title: t("layouts.sidebar.home"), key: "1", icon: <HomeOutlined /> }];
	// MenuProps
	const items = links.map(({ key, icon, title, to }) => ({
		key,
		icon,
		label: (
			<NavLink key={key} to={to}>
				{t(title)}
			</NavLink>
		),
	}));
	// return
	return (
		<Dropdown menu={{ items: items.splice(0, user ? 5 : 6) }}>
			<MenuOutlined className="text-xl" />
		</Dropdown>
	);
}
