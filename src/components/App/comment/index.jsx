import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { List, Skeleton, theme } from "antd";
import { Comment } from "@ant-design/compatible";
import { UserOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { authSelector } from "store/selector";

import { notificationMaker } from "utils/notification";
import { useAppContext } from "hooks";

import { chatRequest, getChatRequest } from "service/user";
import CommentSection from "./CommentSection";

const CommentForm = ({ requestType, record }) => {
	const [comments, setComments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("");
	// hooks
	const { token } = theme.useToken();
	const { t } = useTranslation();
	const { callApi } = useAppContext();
	const { user } = useSelector(authSelector);
	// handles
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	const handleSubmit = useCallback(async () => {
		if (!value) return;
		setSubmitting(true);
		const commentResult = await chatRequest(callApi, {
			recordId: record.id,
			requestType: requestType,
			userComment: value,
			parentChatId: 0,
		});
		if (!commentResult.result) {
			setSubmitting(false);
			return notificationMaker(t("commons.error"), "error", t("notification.error"));
		}
		setValue("");
		const perComments = comments.map(({ date, ...other }) => ({
			...other,
			date,
			datetime: dayjs(date).fromNow(),
		}));
		setComments([
			{
				author: <span className="uppercase">{user.fullName}</span>,
				avatar: user.avatarUrl || <UserOutlined className="border rounded-full shadow-lg p-2" />,
				content: <p>{value}</p>,
				datetime: dayjs().fromNow(),
				date: dayjs().format(),
			},
			...perComments,
		]);
		setSubmitting(false);
	}, [callApi, record.id, requestType, comments, value, user.fullName, user.avatarUrl, t]);
	// init
	useEffect(() => {
		const getComments = async () => {
			setLoading(true);
			const { content = [] } = await getChatRequest(callApi, {
				pgs: 1000,
				pgn: 1,
				RecordId: record.id,
				requestType,
			});
			const transformComments = content
				.map(({ firstName, lastName, registerDate, userComment, userId, avatarUrl, requestOwnerUserId }) => ({
					author: <span className="uppercase">{`${firstName} ${lastName}`}</span>,
					avatar: avatarUrl || <UserOutlined className="border rounded-full shadow-lg p-2" />,
					content: <p>{userComment}</p>,
					datetime: dayjs(registerDate).fromNow(),
					date: registerDate,
					userId,
					className: `px-[5%] ${requestOwnerUserId === userId ? "rtl" : "ltr"}`,
				}))
				.reverse();
			setComments(transformComments);
			setLoading(false);
		};
		if (record.id) {
			getComments();
		}
		return () => {
			setComments([]);
		};
	}, [callApi, record, requestType]);
	// returnJSX
	return (
		<>
			<div className="h-[300px] overflow-y-scroll border-r-2 rounded-3xl shadow-md">
				{loading ? (
					<Skeleton active avatar paragraph={{ rows: 8 }} className="px-[5%]" />
				) : (
					<List
						dataSource={comments}
						itemLayout="horizontal"
						renderItem={(props) => <Comment {...props} style={{ background: token?.colorPrimaryLighter }} />}
					/>
				)}
			</div>
			<CommentSection {...{ handleSubmit, user, submitting, handleChange, value }} />
		</>
	);
};

export default CommentForm;
