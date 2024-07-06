import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { theme } from "antd";
import { RadioGroup } from "components";

import { useAppContext } from "hooks";
import { getCarrierAnnonce, getRequestForCarrier } from "service/main";

import SupportSection from "../Support";
import RequeuedSend from "./components/RequeuedSend";
import RequeuedGet from "./components/RequeuedGet";

import SearchContextApi from "./components/forms/context";
import InternationalSearch from "./components/forms/InternationalSearch";
import InternationalGetSearch from "./components/forms/InternationalGetSearch";

const SearchRequest = ({ onChangeType: onChangeActiveType }) => {
	const [activeType, setActiveType] = useState("send");
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pgn, setPgn] = useState(1);
	// hooks
	const { t } = useTranslation();
	const { callApi } = useAppContext();
	const { token } = theme.useToken();
	// onFinish
	const onFinish = useCallback(
		async (formValues) => {
			setLoading(true);
			const { requestType, dateRange, ...value } = formValues;
			const queries = {
				fromDate: dateRange?.[0]?.toISOString(),
				toDate: dateRange?.[1]?.toISOString(),
				pgn: pgn,
				pgs: 9,
				...value,
			};
			switch (requestType) {
				case "send": {
					let { content: carrierList } = await getRequestForCarrier(callApi, queries);
					setList(carrierList || []);
					break;
				}
				case "get": {
					let { content: annonceList } = await getCarrierAnnonce(callApi, queries);
					setList(annonceList || []);
					break;
				}
				default:
					setList([]);
					break;
			}
			setLoading(false);
		},
		[callApi, pgn],
	);
	const onChangeType = (type) => {
		onFinish({ requestType: type, pgn: 1 });
		setActiveType(type);
		onChangeActiveType(type);
	};
	const onReset = useCallback(() => {
		onFinish({ requestType: activeType, pgn: 1 });
	}, [activeType]);
	// options
	const requestType = [
		{
			label: t("search.send"),
			value: "send",
		},
		{
			label: t("search.get"),
			value: "get",
		},
	];
	// options
	const tabItems = {
		send: <InternationalSearch />,
		get: <InternationalGetSearch />,
	};
	const optionList = {
		send: <RequeuedSend {...{ list, pgn, onChangeList: undefined, loading }} />,
		get: <RequeuedGet {...{ list, pgn, onChangeList: undefined, loading }} />,
	};
	// init
	useEffect(() => {
		onFinish({ requestType: "send" });
	}, []);
	// return
	return (
		<>
			<section
				className={`responsive-layout sticky mx-auto p-8 rounded-3xl shadow-2xl border`}
				style={{ background: token?.colorBgBase }}
			>
				<SearchContextApi loading={loading} onFinish={onFinish} onReset={onReset}>
					<RadioGroup
						plainOptions={requestType}
						name="requestType"
						initialValue={activeType}
						required={true}
						onChange={onChangeType}
					/>
					{tabItems[activeType]}
				</SearchContextApi>
			</section>
			<SupportSection background={token?.colorBgBase} />
			{optionList[activeType]}
		</>
	);
};

export default SearchRequest;
