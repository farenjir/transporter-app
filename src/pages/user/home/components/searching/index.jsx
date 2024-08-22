import { useCallback, useEffect, useState } from "react";

import { theme } from "antd";

import { useAppContext } from "hooks";
import { getCarrierAnnonce, getRequestForCarrier } from "service/main";

import RequeuedSend from "./components/RequeuedSend";
import RequeuedGet from "./components/RequeuedGet";

import SearchContextApi from "./components/forms/context";
import InternationalSearch from "./components/forms/InternationalSearch";
import InternationalGetSearch from "./components/forms/InternationalGetSearch";

const SearchRequest = ({ appMode }) => {
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pgn, setPgn] = useState(1);
	// hooks
	const { callApi } = useAppContext();
	const { token } = theme.useToken();
	// onFinish
	const onFinish = useCallback(
		async (paramsTransform = {}) => {
			setLoading(true);
			const { requestType, ...values } = paramsTransform;
			const queriesParams = {
				pgn: pgn,
				pgs: 9,
				...values,
			};
			switch (requestType) {
				case "send": {
					let { content: carrierList } = await getRequestForCarrier(callApi, queriesParams);
					setList(carrierList || []);
					break;
				}
				case "get": {
					let { content: annonceList } = await getCarrierAnnonce(callApi, queriesParams);
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
	const onReset = useCallback(() => {
		onFinish({ requestType: appMode, pgn: 1 });
	}, [appMode]);
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
		onFinish({ requestType: appMode });
	}, [appMode]);
	// return
	return (
		<>
			<section
				className={`responsive-layout sticky mx-auto p-8 rounded-3xl shadow-2xl border`}
				style={{ background: token?.colorBgBase }}
			>
				<SearchContextApi loading={loading} onFinish={onFinish} onReset={onReset}>
					{tabItems[appMode]}
				</SearchContextApi>
			</section>
			{/* <SupportSection background={token?.colorBgBase} /> */}
			{optionList[appMode]}
		</>
	);
};

export default SearchRequest;
