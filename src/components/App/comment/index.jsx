import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { List, Skeleton, theme } from "antd";
import { Comment } from "@ant-design/compatible";
import { UserOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { authSelector } from "store/auth";

import { notificationMaker } from "utils/notification";
import { useAppContext } from "hooks";

import { chatRequest, getChatRequest } from "service/user";
import CommentSection from "./CommentSection";
import { useWebSocket } from "hooks/useWebSocket";
import { chatType } from "utils/constance";

const CommentForm = ({ requestType, record }) => {
	const [comments, setComments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("");
	// hooks
	const { token } = theme.useToken();
	const { t } = useTranslation();
	const { callApi, direction, deDirection } = useAppContext();
	const { user } = useSelector(authSelector);
	// socket type
	const { type: connectionType, source: sendType, target: receiveType } = chatType[requestType];
	const { messages, sendMessage } = useWebSocket({ receiveType, sendType, connectionType });
	// handles
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	const handleSubmit = useCallback(async () => {
		if (!value) return;
		setSubmitting(true);
		const commentResult = await sendMessage(record.id, value);
		// if (!commentResult.result) {
		// 	setSubmitting(false);
		// 	return notificationMaker(t("commons.error"), "error", t("notification.error"));
		// }
		console.log({ commentResult });
		setValue("");
		// const perComments = comments.map(({ date, ...other }) => ({
		// 	...other,
		// 	date,
		// 	datetime: dayjs(date).fromNow(),
		// }));
		// setComments([
		// 	{
		// 		author: <span className="uppercase">{user.fullName}</span>,
		// 		avatar: user.avatarUrl || <UserOutlined className="border rounded-full shadow-lg p-2" />,
		// 		content: <p>{value}</p>,
		// 		datetime: dayjs().fromNow(),
		// 		date: dayjs().format(),
		// 		className: `px-[5%] ${direction}`,
		// 	},
		// 	...perComments,
		// ]);
		setSubmitting(false);
	}, [value, callApi, record.id, requestType, comments, user.fullName, user.avatarUrl, direction, t]);
	// init
	useEffect(() => {
		const getComments = async () => {
			setLoading(true);
			// const { content = [] } = await getChatRequest(callApi, {
			// 	pgs: 1000,
			// 	pgn: 1,
			// 	RecordId: record.id,
			// 	requestType,
			// });
			console.log({ messages });
			const transformComments = messages
				.map(({ fromFirstName, fromLastName, fromUserId, registerDate, userComment, userId, avatarUrl }) => ({
					author: <span className="uppercase">{`${fromFirstName} ${fromLastName}`}</span>,
					avatar: avatarUrl || <UserOutlined className="border rounded-full shadow-lg p-2" />,
					content: <p>{userComment}</p>,
					datetime: dayjs(registerDate).fromNow(),
					date: registerDate,
					userId,
					className: `px-[5%] ${fromUserId === userId ? deDirection : direction}`,
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
	}, [messages, deDirection, direction, record, requestType]);
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
