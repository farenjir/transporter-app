import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { theme } from "antd";
import { notificationMaker } from "utils/notification";
import { useAppContext } from "hooks";

import { getMyAnnonceRequest, getMyCarrierRequest } from "service/user";
import { deleteMyAnnonceRequest, deleteMyCarrierRequest } from "service/user";
import { Modals, confirmModal } from "components";
import { CommentForm } from "components/App";

import RequestContextApi from "./components/forms/context";
import HistoryList from "./components/HistoryList";
import InternationalRequest from "./components/forms/International";
import InternationalGetRequest from "./components/forms/InternationalGet";
import HistoryListGet from "./components/HistoryListGet";

const HistoryPage = () => {
	const { type = "send" } = history?.state?.usr || {};
	// state
	const [{ content }, setDataSource] = useState({ content: [] });
	const [loading, setLoading] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState({});
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	const { callApi, direction } = useAppContext();
	const modalInfo = useRef();
	const modalEdit = useRef();
	const modalComment = useRef();
	// data actions
	const getDataSource = useCallback(async () => {
		setLoading(true);
		let data = {};
		if (type === "get") {
			data = await getMyAnnonceRequest(callApi);
		} else {
			data = await getMyCarrierRequest(callApi);
		}
		if (data?.content) {
			setDataSource(data);
		}
		setLoading(false);
	}, [type, callApi]);
	// submit actions
	const handleDelete = useCallback(
		async ({ id }) => {
			setLoading(true);
			let data = {};
			if (type === "get") {
				data = await deleteMyAnnonceRequest(callApi, id);
			} else {
				data = await deleteMyCarrierRequest(callApi, id);
			}
			if (data?.result || data?.succeded) {
				notificationMaker(t("commons.success"), "success", t("messages.requestSuccess"));
				getDataSource();
			} else {
				notificationMaker(t("commons.error"), "error", t("messages.requestFailed"));
			}
			setLoading(false);
		},
		[type],
	);
	const handleModals = (mode, record) => {
		setSelectedRecord(record);
		switch (mode) {
			case "info":
				modalInfo.current.open();
				break;
			case "edit":
				modalEdit.current.open();
				break;
			case "comment":
				modalComment.current.open();
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
		modalComment.current.close();
	};
	const contextProvider = {
		record: selectedRecord,
		handleModals,
		handleCloseModals,
		getDataSource,
	};
	const lists = {
		send: (
			<HistoryList
				{...{
					content,
					activeType: type,
					loading,
					handleModals,
				}}
			/>
		),
		get: (
			<HistoryListGet
				{...{
					content,
					activeType: type,
					loading,
					handleModals,
				}}
			/>
		),
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
			{lists[type]}
			<Modals reference={type === "send" ? modalInfo : null} title={t("user.infoRequest")}>
				<RequestContextApi {...contextProvider}>
					<InternationalRequest info />
				</RequestContextApi>
			</Modals>
			<Modals reference={type === "send" ? modalEdit : null} title={t("user.editRequest")}>
				<RequestContextApi {...contextProvider}>
					<InternationalRequest edit />
				</RequestContextApi>
			</Modals>
			<Modals reference={type === "get" ? modalInfo : null} title={t("user.infoRequest")}>
				<RequestContextApi {...contextProvider}>
					<InternationalGetRequest info />
				</RequestContextApi>
			</Modals>
			<Modals reference={type === "get" ? modalEdit : null} title={t("user.editRequest")}>
				<RequestContextApi {...contextProvider}>
					<InternationalGetRequest edit />
				</RequestContextApi>
			</Modals>
			<Modals reference={modalComment} title={t("commons.comment")}>
				<CommentForm requestType={type} record={selectedRecord} />
			</Modals>
		</section>
	);
};

export default HistoryPage;
