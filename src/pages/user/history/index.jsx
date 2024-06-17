import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { theme } from "antd";
import { useAppContext } from "hooks";
import { getMyAnnonceRequest, getMyCarrierRequest } from "service/user";

import { RadioGroup } from "components";
import HistoryList from "./components/HistoryList";

const SearchPage = () => {
	const { type = "send" } = history?.state?.usr || {};
	// state
	const [activeType, setActiveType] = useState(type);
	const [loading, setLoading] = useState(false);
	const [queries, setQueries] = useState({ pgs: 5, pgn: 1 });
	const [{ content, totalElements, totalPages }, setDataSource] = useState({
		content: [],
		totalElements: 0,
		totalPages: 0,
	});
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	const { callApi } = useAppContext();
	// handles
	const onChangeType = (type) => {
		setActiveType(type);
	};
	const onChangeQueries = (queries = {}) => {
		setQueries(queries);
	};
	const getDataSource = useCallback(async () => {
		setLoading(true);
		let data = {};
		if (activeType === "get") {
			data = await getMyAnnonceRequest(callApi, queries);
		} else {
			data = await getMyCarrierRequest(callApi, queries);
		}
		if (data?.content) {
			setDataSource(data);
		}
		setLoading(false);
	}, [activeType, callApi, queries]);
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
	// init
	useEffect(() => {
		getDataSource();
	}, [getDataSource]);
	// return
	return (
		<section
			className={`responsive-layout sticky mx-auto p-8 rounded-3xl shadow-2xl border`}
			style={{ background: token?.colorBgBase }}
		>
			<RadioGroup
				disabled={loading}
				plainOptions={requestType}
				name="requestType"
				initialValue={activeType}
				required={true}
				onChange={onChangeType}
			/>
			<HistoryList
				{...{ content, totalElements, totalPages, activeType, onChangeQueries, queries, loading }}
			/>
		</section>
	);
};

export default SearchPage;
