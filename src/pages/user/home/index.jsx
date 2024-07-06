import { useState } from "react";
import { useTranslation } from "react-i18next";

import { FileDoneOutlined, SecurityScanOutlined } from "@ant-design/icons";
import { AppTabs } from "components";

import SearchRequest from "./components/searching";
import RequestSection from "./components/requests";

const imagesList = {
	get: "domestic-banner.webp",
	send: "international-banner.webp",
};

const HomePage = () => {
	const [activeType, setActiveType] = useState("send");
	// hooks
	const { t } = useTranslation();
	// handles
	const onChangeType = (e) => {
		setActiveType(e);
	};
	// tabs
	const appTabOptions = [
		{
			key: "search",
			label: (
				<div className="flex flex-col gap-1 justify-center align-middle items-center">
					<SecurityScanOutlined className="text-2xl font-extrabold" />
					<span>{t("home.searching")}</span>
				</div>
			),
			children: <SearchRequest {...{ onChangeType }} />,
		},
		{
			key: "request",
			label: (
				<div className="flex flex-col gap-1 justify-center align-middle items-center">
					<FileDoneOutlined className="text-2xl font-extrabold" />
					<span>{t("home.request")}</span>
				</div>
			),
			children: <RequestSection {...{ onChangeType }} />,
		},
	];
	// returnJSX
	return (
		<>
			<img
				src={`/assets/images/${imagesList[activeType]}`}
				alt="bg-banner"
				loading="lazy"
				height={320}
				className="-mt-16 lg:min-h-[320px]"
			/>
			<AppTabs items={appTabOptions} centered  classes="md:-mt-40 backdrop-blur-sm"/>
		</>
	);
};

export default HomePage;
