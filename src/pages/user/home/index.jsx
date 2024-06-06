import { useState } from "react";
import { useTranslation } from "react-i18next";

import { theme, Form } from "antd";

import { Domestic, International, DomesticGet, InternationalGet, RequestContextApi } from "components/App";

import { AppTabs, RadioGroup } from "components";
import { FlightIcon, FlightIntIcon } from "components/icon/custom";
import SupportSection from "./components/Support";
import RequeuedSend from "./components/RequeuedSend";
import RequeuedGet from "./components/RequeuedGet";

const imagesList = {
	get: "domestic-banner.webp",
	send: "international-banner.webp",
};

const HomePage = () => {
	const [activeType, setActiveType] = useState("send");
	// hooks
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const { token } = theme.useToken();
	// handles
	const onSubmit = (formValues) => {};
	const onChangeType = (type) => {
		setActiveType(type);
	};
	// options
	const requestType = [
		{
			label: t("home.send"),
			value: "send",
		},
		{
			label: t("home.get"),
			value: "get",
		},
	];
	// tabs
	const tabItems = {
		send: [
			{
				key: "International",
				label: t("home.International"),
				children: <International />,
				icon: <FlightIntIcon />,
				className: "mt-5",
			},
			{
				key: "Domestic",
				label: t("home.Domestic"),
				children: <Domestic />,
				icon: <FlightIcon />,
				className: "mt-5",
			},
		],
		get: [
			{
				key: "International",
				label: t("home.International"),
				children: <InternationalGet />,
				icon: <FlightIntIcon />,
				className: "mt-5",
			},
			{
				key: "Domestic",
				label: t("home.Domestic"),
				children: <DomesticGet />,
				icon: <FlightIcon />,
				className: "mt-5",
			},
		],
	};
	return (
		<>
			<img
				src={`/assets/images/${imagesList[activeType]}`}
				alt="bg-banner"
				loading="lazy"
				height={320}
				className="-mt-16 lg:min-h-[320px]"
			/>
			<section
				className={`responsive-layout md:-mt-44 sticky mx-auto p-8 rounded-3xl shadow-2xl border`}
				style={{ background: token?.colorBgBase }}
			>
				<RadioGroup
					plainOptions={requestType}
					name="requestType"
					initialValue={activeType}
					required={true}
					onChange={onChangeType}
				/>
				<Form name={"name"} form={form} className="search-form" layout="vertical" onFinish={onSubmit}>
					<RequestContextApi>
						<AppTabs items={tabItems[activeType]} centered />
					</RequestContextApi>
				</Form>
			</section>
			<SupportSection background={token?.colorBgBase} />
			<RequeuedSend />
			<RequeuedGet />
		</>
	);
};

export default HomePage;
