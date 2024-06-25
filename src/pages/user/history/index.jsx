import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { theme } from "antd";
import { notificationMaker } from "utils/notification";
import { useAppContext } from "hooks";

import { getMyAnnonceRequest, getMyCarrierRequest } from "service/user";
import { deleteMyAnnonceRequest, deleteMyCarrierRequest } from "service/user";
import { Modals, RadioGroup, confirmModal } from "components";

import RequestContextApi from "./components/forms/context";
import HistoryList from "./components/HistoryList";
import InternationalRequest from "./components/forms/International";
import InternationalGetRequest from "./components/forms/InternationalGet";
import CommentForm from "./components/comments";

const requestCommentType = {
	send: 1,
	get: 2,
};
const HistoryPage = () => {
	const { type = "send" } = history?.state?.usr || {};
	// state
	const [activeType, setActiveType] = useState(type);
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
		if (activeType === "get") {
			data = await getMyAnnonceRequest(callApi);
		} else {
			data = await getMyCarrierRequest(callApi);
		}
		if (data?.content) {
			setDataSource(data);
		}
		setLoading(false);
	}, [activeType, callApi]);
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
			if (data?.result || data?.succeded) {
				notificationMaker(t("commons.success"), "success", t("messages.requestSuccess"));
				getDataSource();
			} else {
				notificationMaker(t("commons.error"), "error", t("messages.requestFailed"));
			}
			setLoading(false);
		},
		[activeType],
	);
	// handles
	const onChangeType = (type) => {
		setSelectedRecord({});
		setActiveType(type);
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
		getDataSource,
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
					content,
					activeType,
					loading,
					handleModals,
				}}
			/>
			<Modals reference={activeType === "send" ? modalInfo : null} title={t("user.infoRequest")}>
				<RequestContextApi {...contextProvider}>
					<InternationalRequest info />
				</RequestContextApi>
			</Modals>
			<Modals reference={activeType === "send" ? modalEdit : null} title={t("user.editRequest")}>
				<RequestContextApi {...contextProvider}>
					<InternationalRequest edit />
				</RequestContextApi>
			</Modals>
			<Modals reference={activeType === "get" ? modalInfo : null} title={t("user.infoRequest")}>
				<RequestContextApi {...contextProvider}>
					<InternationalGetRequest info />
				</RequestContextApi>
			</Modals>
			<Modals reference={activeType === "get" ? modalEdit : null} title={t("user.editRequest")}>
				<RequestContextApi {...contextProvider}>
					<InternationalGetRequest edit />
				</RequestContextApi>
			</Modals>
			<Modals reference={modalComment} title={t("commons.comment")}>
				<CommentForm requestType={requestCommentType[activeType]} record={selectedRecord} />
			</Modals>
		</section>
	);
};

export default HistoryPage;
