import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { theme } from "antd";
import { notificationMaker } from "utils/notification";
import { requestCommentType } from "utils/constance";
import { useAppContext } from "hooks";

import { getMyAnnonceRequest, getMyCarrierRequest } from "service/user";
import { deleteMyAnnonceRequest, deleteMyCarrierRequest } from "service/user";
import { Modals, confirmModal } from "components";

import HistoryList from "./components/HistoryList";
import CommentForm from "./components/comments";

const HistoryComment = () => {
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
	// handles
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
			<HistoryList
				{...{
					content,
					activeType: type,
					loading,
					handleModals,
				}}
			/>
			<Modals reference={modalComment} title={t("commons.comment")}>
				<CommentForm requestType={requestCommentType[type]} record={selectedRecord} />
			</Modals>
		</section>
	);
};

export default HistoryComment;
