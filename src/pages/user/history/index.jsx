import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { theme } from "antd";
import { useAppContext } from "hooks";
import {
	deleteMyAnnonceRequest,
	deleteMyCarrierRequest,
	getMyAnnonceRequest,
	getMyCarrierRequest,
} from "service/user";

import { Modals, RadioGroup, confirmModal } from "components";

import RequestContextApi from "./components/context";
import HistoryList from "./components/HistoryList";
import RequestInfo from "./components/RequestInfo";

const SearchPage = () => {
	const { type = "send" } = history?.state?.usr || {};
	// state
	const [activeType, setActiveType] = useState(type);
	const [{ content, totalElements, totalPages }, setDataSource] = useState({
		content: [],
		totalElements: 0,
		totalPages: 0,
	});
	const [loading, setLoading] = useState(false);
	const [queries, setQueries] = useState({ pgs: 5, pgn: 1 });
	const [selectedRecord, setSelectedRecord] = useState({});
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	const { callApi, direction } = useAppContext();
	const modalInfo = useRef();
	const modalEdit = useRef();
	// data actions
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
	// submit actions
	const handleDelete = useCallback(
		async ({ id }) => {
			setLoading(true);
			let data = {};
			if (activeType === "get") {
				data = await deleteMyAnnonceRequest(callApi, id);
			} else {
				data = await deleteMyCarrierRequest(callApi, id);
			}
			if (data?.succeeded) {
				// add notificaton
				getDataSource();
			}
			setLoading(false);
		},
		[activeType],
	);
	// handles
	const onChangeType = (type) => {
		setActiveType(type);
	};
	const onChangeQueries = (queries = {}) => {
		setQueries(queries);
	};
	const handleModals = (mode, record) => {
		setSelectedRecord(record);
		switch (mode) {
			case "info":
				modalInfo.current.open();
				break;
			case "edit":
				modalEdit.current.open();
				break;
			case "delete":
				confirmModal({
					customOptions: {
						okType: "danger",
						direction,
						content: t("messages.sure"),
						title: t("user.deleteRequest"),
					},
					onCancel: () => {},
					onOk: () => handleDelete(record),
				});
				break;
			default:
				break;
		}
	};
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
			<RequestContextApi record={selectedRecord}>
				<RadioGroup
					disabled={loading}
					plainOptions={requestType}
					name="requestType"
					initialValue={activeType}
					required={true}
					onChange={onChangeType}
				/>
				<HistoryList
					{...{
						onChangeQueries,
						content,
						totalElements,
						totalPages,
						activeType,
						loading,
						handleModals,
						queries,
					}}
				/>
				<Modals reference={modalInfo} title={t("user.infoRequest")} width="80%">
					<RequestInfo info />
				</Modals>
				<Modals reference={modalEdit} title={t("user.editRequest")} width="80%">
					<RequestInfo edit />
				</Modals>
			</RequestContextApi>
		</section>
	);
};

export default SearchPage;
