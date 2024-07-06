import { useState } from "react";
import { useTranslation } from "react-i18next";

import { theme } from "antd";
import { RadioGroup } from "components";
import RequestContextApi from "./components/forms/context";
import International from "./components/forms/International";
import InternationalGet from "./components/forms/InternationalGet";

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
				<RadioGroup
					plainOptions={requestType}
					name="requestType"
					initialValue={activeType}
					required={true}
					onChange={onChangeType}
				/>
				{requestOptions[activeType]}
			</RequestContextApi>
		</section>
	);
};

export default RequestSection;
