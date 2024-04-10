import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import * as Icons from "@ant-design/icons";
import { Typography } from "antd";

const { Paragraph } = Typography;

const links = [
	{ title: "home", to: "/user", icon: "HomeOutlined" },
	{
		title: "orders",
		icon: "FileDoneOutlined",
		children: [
			{ to: "/", title: "send", key: "2-1", icon: "LogoutOutlined" },
			{ to: "/", title: "get", key: "2-2", icon: "LoginOutlined" },
		],
	},
];

const Sidebar = ({ token }) => {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col">
			{links.map(({ title, to, icon, children }) => {
				const Icon = Icons[icon];
				return (
					<>
						{children ? (
							<>
								<Paragraph key={title}>
									<Icon />
									<span className="mx-2 text-base"> {t(`layouts.sidebar.${title}`)}</span>
								</Paragraph>
								<ul className="mx-8" key={`children-${title}`}>
									{children.map((child) => {
										const ChildIcon = Icons[child.icon];
										return (
											<li key={`li-${child.title}`}>
												<NavLink to={child.to}>
													<Paragraph className={`hover:text-[${token?.colorPrimary}]`}>
														<ChildIcon />
														<span className="mx-2 text-base">
															{t(`layouts.sidebar.${child.title}`)}
														</span>
													</Paragraph>
												</NavLink>
											</li>
										);
									})}
								</ul>
							</>
						) : (
							<NavLink key={title} to={to}>
								<Paragraph className={`hover:text-[${token?.colorPrimary}]`}>
									<Icon />
									<span className="mx-2 text-base">{t(`layouts.sidebar.${title}`)}</span>
								</Paragraph>
							</NavLink>
						)}
					</>
				);
			})}
			{/* loadColorSection */}
			<div className="hidden hover:text-[#1677ff] text-[#1677ff]" />
			<div className="hidden hover:text-[#1c4e80] text-[#1c4e80]" />
			<div className="hidden hover:text-[#1dc362] text-[#1dc362]" />
			<div className="hidden hover:text-[#d32d41] text-[#d32d41]" />
			<div className="hidden hover:text-[#1c4e80] text-[#1c4e80]" />
		</div>
	);
};

export default Sidebar;
