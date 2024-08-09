import { useState } from "react";
import { useTranslation } from "react-i18next";

import { theme } from "antd";
import { RadioGroup } from "components";
import RequestContextApi from "./components/forms/context";
import International from "./components/forms/International";
import InternationalGet from "./components/forms/InternationalGet";
import { ImportOutlined, SelectOutlined } from "@ant-design/icons";

const RequestSection = ({ onChangeType: onChangeActiveType }) => {
	const [activeType, setActiveType] = useState("send");
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	// handles
	const onChangeType = (type) => {
		setActiveType(type);
		onChangeActiveType(type);
	};
	// options
	// options
	const requestType = [
		{
			label: (
				<span className="flex gap-3 items-center align-middle">
					<span> {t("search.send")}</span>
					<SelectOutlined className="pb-1" />
				</span>
			),
			value: "send",
		},
		{
			label: (
				<span className="flex gap-3 items-center align-middle">
					<span> {t("search.get")}</span>
					<ImportOutlined className="pb-1" />
				</span>
			),
			value: "get",
		},
	];
	// tabs
	const requestOptions = {
		send: <International />,
		get: <InternationalGet />,
	};
	// returnJSX
	return (
		<section
			className={`responsive-layout sticky mx-auto p-8 rounded-3xl shadow-2xl border`}
			style={{ background: token?.colorBgBase }}
		>
			<RequestContextApi>
				<div className="md:-mt-[90px] md:mb-14">
					<RadioGroup
						name="requestType"
						plainOptions={requestType}
						initialValue={activeType}
						onChange={onChangeType}
					/>
				</div>
				{requestOptions[activeType]}
			</RequestContextApi>
		</section>
	);
};

export default RequestSection;
