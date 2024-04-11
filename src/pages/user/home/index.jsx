import { useState } from "react";
import { useTranslation } from "react-i18next";

import { theme, Form } from "antd";

import { RadioGroup, DomesticSearch, AppTabs, InternationalSearch } from "components";
import { FlightIcon, FlightIntIcon } from "components/icon/custom";
import SupportSection from "./components/Support";

const imagesList = {
	Domestic: "domestic-banner.webp",
	International: "international-banner.webp",
};

const HomePage = () => {
	const [activeKey, setActiveKey] = useState("International");
	// hooks
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const { token } = theme.useToken();
	// handles
	const onSubmit = (formValues) => {};
	const onChangeTab = (tabKey) => {
		setActiveKey(tabKey);
	};
	// options
	const requestType = [
		{
			label: t("home.send"),
			value: "1",
		},
		{
			label: t("home.get"),
			value: "2",
		},
	];
	// tabs
	const tabItems = [
		{
			key: "International",
			label: t("home.International"),
			children: <InternationalSearch />,
			icon: <FlightIntIcon />,
			className: "mt-8",
		},
		{
			key: "Domestic",
			label: t("home.Domestic"),
			children: <DomesticSearch />,
			icon: <FlightIcon />,
			className: "mt-8",
		},
	];
	return (
		<>
			<img src={`/assets/images/${imagesList[activeKey]}`} alt="bg-banner" height={320} className="-mt-16" />
			<section
				className={`responsive-layout md:-mt-28 sticky mx-auto p-8 rounded-3xl shadow-2xl border`}
				style={{ background: token?.colorBgBase }}
			>
				<RadioGroup plainOptions={requestType} name="requestType" initialValue={"1"} required={true} />
				<Form name={"name"} form={form} className="search-form" layout="vertical" onFinish={onSubmit}>
					<AppTabs items={tabItems} onChange={onChangeTab} defaultActiveKey={activeKey} centered />
				</Form>
			</section>
			<SupportSection background={token?.colorBgBase} />
		</>
	);
};

export default HomePage;
