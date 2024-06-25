import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Typography } from "antd";
import { useSelector } from "react-redux";
import { authSelector } from "store/selector";

import { Icons } from "components";

const { Paragraph } = Typography;

const Sidebar = ({ token = {} }) => {
	const { t } = useTranslation();
	const { user } = useSelector(authSelector);
	// options
	const links = [
		{ title: "home", to: "/main", icon: "HomeOutlined" },
		user && {
			title: "orders",
			icon: "FileDoneOutlined",
			children: [
				{ to: "/user/history", title: "send", icon: "LogoutOutlined", state: { type: "send" } },
				{ to: "/user/history", title: "get", icon: "LoginOutlined", state: { type: "get" } },
			],
		},
	].filter(Boolean);
	// return
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
													<Paragraph
														className={`hover:text-[${token?.colorPrimary}]`}
													>
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
