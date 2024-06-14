import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Typography } from "antd";
import { Icons } from "components";

const { Paragraph } = Typography;

const links = [
	{ title: "home", to: "/", icon: "HomeOutlined" },
	{
		title: "orders",
		icon: "FileDoneOutlined",
		children: [
			{ to: "/history", title: "send", icon: "LogoutOutlined", state: { defaultType: "send" } },
			{ to: "/history", title: "get", icon: "LoginOutlined", state: { defaultType: "get" } },
		],
	},
];

const Sidebar = ({ token = {} }) => {
	const { t } = useTranslation();
	return (
		<div className={`flex flex-col`}>
			{links.map(({ title, to, icon, children }) => {
				return (
					<>
						{children ? (
							<>
								<Paragraph key={title}>
									<Icons type={icon} classes="text-lg" />
									<span className="mx-2 text-base"> {t(`layouts.sidebar.${title}`)}</span>
								</Paragraph>
								<ul className="mx-8" key={`children-${title}`}>
									{children.map((child) => {
										return (
											<li key={`li-${child.title}`}>
												<NavLink to={child.to} state={child.state}>
													<Paragraph className={`hover:text-[${token?.colorPrimary}]`}>
														<Icons type={child.icon} />
														<span className="mx-2 text-sm">
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
									<Icons type={icon} classes="text-lg" />
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
