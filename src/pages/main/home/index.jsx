import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";

import { theme, Spin } from "antd";
import { RadioGroup } from "components";

import RequestContextApi from "./components/forms/context";
import International from "./components/forms/International";
import InternationalGet from "./components/forms/InternationalGet";

import SupportSection from "./components/Support";
import RequeuedSend from "./components/RequeuedSend";
import RequeuedGet from "./components/RequeuedGet";

const imagesList = {
	get: "domestic-banner.webp",
	send: "international-banner.webp",
};

const Loading = () => (
	<div className="grid place-content-center min-h-[350px]">
		<Spin spinning size="large" />
	</div>
);

const HomePage = () => {
	const [activeType, setActiveType] = useState("send");
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	// handles
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
		send: <International />,
		get: <InternationalGet />,
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
				<RequestContextApi>
					<RadioGroup
						plainOptions={requestType}
						name="requestType"
						initialValue={activeType}
						required={true}
						onChange={onChangeType}
					/>
					{tabItems[activeType]}
				</RequestContextApi>
			</section>
			<SupportSection background={token?.colorBgBase} />
			<Suspense fallback={<Loading />}>
				<RequeuedSend />
			</Suspense>
			<Suspense fallback={<Loading />}>
				<RequeuedGet />
			</Suspense>
		</>
	);
};

export default HomePage;
