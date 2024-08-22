import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { setAppMode, modeSelector, setFormMode } from "store/mode";

import { FileDoneOutlined, FileSearchOutlined } from "@ant-design/icons";
import { AppTabs } from "components";

import SearchRequest from "./components/searching";
import RequestSection from "./components/requests";

const imagesList = {
	get: "domestic-banner.webp",
	send: "international-banner.webp",
};

const HomePage = () => {
	const { appMode } = useSelector(modeSelector);
	// hooks
	const { t } = useTranslation();
	const dispatch = useDispatch();
	// handles
	const onChangeType = (keyAsTypes) => {
		const [formMode, appMode] = keyAsTypes.split("-");
		dispatch(setAppMode(appMode));
		dispatch(setFormMode(formMode));
	};
	// tabs
	const appTabOptions = [
		{
			key: "search-send",
			label: (
				<div className="flex flex-col gap-1 justify-center align-middle items-center">
					<FileSearchOutlined className="text-lg font-extrabold" />
					<span className="hidden md:block">{t("home.search")}</span>
					<polygon className="text-xs">{t("home.searchingIt")}</polygon>
				</div>
			),
			children: <SearchRequest {...{ appMode }} />,
		},
		{
			key: "search-get",
			label: (
				<div className="flex flex-col gap-1 justify-center align-middle items-center">
					<FileSearchOutlined className="text-lg font-extrabold" />
					<span className="hidden md:block">{t("home.search")}</span>
					<p className="text-xs">{t("home.requestIt")}</p>
				</div>
			),
			children: <SearchRequest {...{ appMode }} />,
		},
		{
			key: "request-send",
			label: (
				<div className="flex flex-col gap-1 justify-center align-middle items-center">
					<FileDoneOutlined className="text-lg font-extrabold" />
					<span className="hidden md:block">{t("home.save")}</span>
					<p className="text-xs">{t("home.searchingIt")}</p>
				</div>
			),
			children: <RequestSection {...{ appMode }} />,
		},
		{
			key: "request-get",
			label: (
				<div className="flex flex-col gap-1 justify-center align-middle items-center">
					<FileDoneOutlined className="text-lg font-extrabold" />
					<span className="hidden md:block">{t("home.save")}</span>
					<p className="text-xs">{t("home.requestIt")}</p>
				</div>
			),
			children: <RequestSection {...{ appMode }} />,
		},
	];
	// returnJSX
	return (
		<>
			<img
				src={`/assets/images/${imagesList[appMode]}`}
				alt="bg-banner"
				loading="lazy"
				height={320}
				className="-mt-12 lg:min-h-[320px]"
			/>
			<AppTabs items={appTabOptions} centered classes="md:-mt-40 backdrop-blur-md" onChange={onChangeType} size="small" />
		</>
	);
};

export default HomePage;
