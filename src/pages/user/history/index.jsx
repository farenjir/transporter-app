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

import RequestContextApi from "./components/forms/context";
import HistoryList from "./components/HistoryList";
import InternationalRequest from "./components/forms/International";
import InternationalGetRequest from "./components/forms/InternationalGet";
import { notificationMaker } from "utils/notification";

const defaultQueries = { pgs: 5, pgn: 1 };
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
	const [queries, setQueries] = useState(defaultQueries);
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
				notificationMaker(t("commons.success", "success", t("messages.requestSuccess")));
				getDataSource();
			} else {
				notificationMaker(t("commons.error", "error", t("messages.requestFailed")));
			}
			setLoading(false);
		},
		[activeType],
	);
	// handles
	const onChangeType = (type) => {
		setQueries(defaultQueries);
		setSelectedRecord({});
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
	const handleCloseModals = () => {
		setSelectedRecord({});
		modalInfo.current.close();
		modalEdit.current.close();
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
	const contextProvider = {
		record: selectedRecord,
		handleModals,
		handleCloseModals,
	};
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
			<Modals
				reference={activeType === "send" ? modalInfo : null}
				title={t("user.infoRequest")}
				width="70%"
			>
				<RequestContextApi {...contextProvider}>
					<InternationalRequest info />
				</RequestContextApi>
			</Modals>
			<Modals
				reference={activeType === "send" ? modalEdit : null}
				title={t("user.editRequest")}
				width="70%"
			>
				<RequestContextApi {...contextProvider}>
					<InternationalRequest edit />
				</RequestContextApi>
			</Modals>
			<Modals
				reference={activeType === "get" ? modalInfo : null}
				title={t("user.infoRequest")}
				width="70%"
			>
				<RequestContextApi {...contextProvider}>
					<InternationalGetRequest info />
				</RequestContextApi>
			</Modals>
			<Modals
				reference={activeType === "get" ? modalEdit : null}
				title={t("user.editRequest")}
				width="70%"
			>
				<RequestContextApi {...contextProvider}>
					<InternationalGetRequest edit />
				</RequestContextApi>
			</Modals>
		</section>
	);
};

export default SearchPage;
