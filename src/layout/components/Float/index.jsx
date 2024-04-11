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
				tooltip={"فیلتر پیشرفته"}
				style={{
					direction: "ltr",
					right: 50,
					bottom: 150,
				}}
				icon={
					<Link to={"/user/search"} className="text-white">
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
					<Link to={"/user/search"} className="text-white">
						<PhoneOutlined />
					</Link>
				}
			/>
			<FloatButton
				type="primary"
				tooltip={<span>درباره ما</span>}
				style={{
					direction: "ltr",
					right: 50,
					bottom: 50,
				}}
				icon={
					<Link to={"/user/search"} className="text-white">
						<InfoCircleOutlined />
					</Link>
				}
			/>
			<FloatButton.BackTop
				tooltip={"بازگشت به بالا"}
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
