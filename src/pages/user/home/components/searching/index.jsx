import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { RadioGroup } from "components";

import { useAppContext } from "hooks";
import { getCarrierAnnonce, getRequestForCarrier } from "service/main";

import SearchContextApi from "./components/forms/context";
import InternationalSearch from "./components/forms/InternationalSearch";
import InternationalGetSearch from "./components/forms/InternationalGetSearch";

const SearchRequest = ({ onChangeActiveType, setArrayList, loading, setLoading, pgn }) => {
	const [activeType, setActiveType] = useState("send");
	// hooks
	const { t } = useTranslation();
	const { callApi } = useAppContext();
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
					setArrayList(carrierList || []);
					break;
				}
				case "get": {
					let { content: annonceList } = await getCarrierAnnonce(callApi, queries);
					setArrayList(annonceList || []);
					break;
				}
				default:
					setArrayList([]);
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
	// init
	useEffect(() => {
		onFinish({ requestType: "send" });
	}, []);
	// return
	return (
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
	);
};

export default SearchRequest;
