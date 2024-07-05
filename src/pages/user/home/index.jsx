import { useState } from "react";
import { useTranslation } from "react-i18next";

import { theme } from "antd";
import { FileDoneOutlined, SecurityScanOutlined } from "@ant-design/icons";
import { AppTabs } from "components";

import SearchRequest from "./components/searching";
import RequestSection from "./components/requests";
import SupportSection from "./components/Support";
import RequeuedSend from "./components/RequeuedSend";
import RequeuedGet from "./components/RequeuedGet";

const imagesList = {
	get: "domestic-banner.webp",
	send: "international-banner.webp",
};

const HomePage = () => {
	const [activeTab, setActiveTab] = useState("search");
	const [activeType, setActiveType] = useState("send");
	// list
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pgn, setPgn] = useState(1);
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	// handles
	const onChangeType = (e) => {
		setActiveType(e);
	};
	const onChangeActiveType = (e) => {
		setActiveTab(e);
	};
	const setArrayList = (arrayList) => {
		setList(arrayList);
	};
	// tabs
	const appTabOptions = [
		{
			key: "search",
			label: (
				<div className="flex flex-col gap-1 justify-center align-middle items-center">
					<SecurityScanOutlined className="text-xl" />
					<span>{t("home.searching")}</span>
				</div>
			),
			children: <SearchRequest {...{ onChangeActiveType, setArrayList, loading, setLoading, pgn }} />,
		},
		{
			key: "request",
			label: (
				<div className="flex flex-col gap-1 justify-center align-middle items-center">
					<FileDoneOutlined className="text-xl" />
					<span>{t("home.request")}</span>
				</div>
			),
			children: <RequestSection {...{ onChangeActiveType, setArrayList, loading, setLoading, pgn }} />,
		},
	];
	const optionList = {
		send: <RequeuedSend {...{ list, pgn, onChangeList: undefined, loading }} />,
		get: <RequeuedGet {...{ list, pgn, onChangeList: undefined, loading }} />,
	};
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
			<section
				className={`responsive-layout md:-mt-44 sticky mx-auto p-8 rounded-3xl shadow-2xl border`}
				style={{ background: token?.colorBgBase }}
			>
				<AppTabs items={appTabOptions} centered onChange={onChangeActiveType} />
			</section>
			<SupportSection background={token?.colorBgBase} />
			{activeTab === "search" && optionList[activeType]}
		</>
	);
};

export default HomePage;
