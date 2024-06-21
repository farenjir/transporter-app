import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FloatButton } from "antd";
import { PhoneOutlined, SearchOutlined, InfoCircleOutlined } from "@ant-design/icons";

const FloatLabel = () => {
	const { t } = useTranslation();
	return (
		<section className="hidden md:inline-block">
			<FloatButton
				type="primary"
				tooltip={t("commons.search")}
				style={{
					direction: "ltr",
					right: 50,
					bottom: 150,
				}}
				icon={
					<Link to={"/request"} className="text-white">
						<SearchOutlined />
					</Link>
				}
			/>
			<FloatButton
				type="primary"
				tooltip={t("header.contactUs")}
				style={{
					direction: "ltr",
					right: 50,
					bottom: 100,
				}}
				icon={
					<Link to={"/request"} className="text-white">
						<PhoneOutlined />
					</Link>
				}
			/>
			<FloatButton
				type="primary"
				tooltip={t("layouts.sidebar.about")}
				style={{
					direction: "ltr",
					right: 50,
					bottom: 50,
				}}
				icon={
					<Link to={"/request"} className="text-white">
						<InfoCircleOutlined />
					</Link>
				}
			/>
			<FloatButton.BackTop
				tooltip={t("layouts.sidebar.top")}
				style={{
					direction: "ltr",
					right: 50,
					bottom: 200,
				}}
			/>
		</section>
	);
};

export default FloatLabel;
