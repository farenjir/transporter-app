import { useCallback, useEffect, useState } from "react";

import { theme } from "antd";

import { useAppContext } from "hooks";
import { getCarrierAnnonce, getRequestForCarrier } from "service/main";

import RequeuedSend from "./components/RequeuedSend";
import RequeuedGet from "./components/RequeuedGet";

import SearchContextApi from "./components/forms/context";
import InternationalSearch from "./components/forms/InternationalSearch";
import InternationalGetSearch from "./components/forms/InternationalGetSearch";

const SearchRequest = ({ appMode, componentRef }) => {
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pgn, setPgn] = useState(1);
	const [totalElements, setTotalElements] = useState(0);
	// hooks
	const { callApi } = useAppContext();
	const { token } = theme.useToken();
	// onFinish
	const onFinish = useCallback(
		async (paramsTransform = {}) => {
			setLoading(true);
			const queriesParams = {
				pgn: pgn,
				pgs: 9,
				...paramsTransform,
			};
			switch (appMode) {
				case "get": {
					let { content: carrierList, totalElements } = await getRequestForCarrier(callApi, queriesParams);
					setList(carrierList || []);
					setTotalElements(totalElements);
					break;
				}
				case "send": {
					let { content: annonceList, totalElements } = await getCarrierAnnonce(callApi, queriesParams);
					setList(annonceList || []);
					setTotalElements(totalElements);
					break;
				}
				default:
					setList([]);
					setList(0);
					break;
			}
			setLoading(false);
		},
		[callApi, pgn, appMode],
	);
	const onReset = () => {
		onFinish({ pgn: 1 });
	};
	const onChangePage = (nextPage) => {
		setPgn(nextPage);
	};
	// options
	const tabItems = {
		send: <InternationalSearch />,
		get: <InternationalGetSearch />,
	};
	const optionList = {
		send: <RequeuedGet {...{ list, pgn, totalElements, onChangePage, loading }} />,
		get: <RequeuedSend {...{ list, pgn, totalElements, onChangePage, loading }} />,
	};
	// init
	useEffect(() => {
		onFinish();
	}, [onFinish]);
	// return
	return (
		<>
			<section
				className={`responsive-layout sticky mx-auto p-8 rounded-3xl shadow-2xl border`}
				style={{ background: token?.colorBgBase }}
				ref={componentRef}
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
