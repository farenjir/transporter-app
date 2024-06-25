import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { List, Skeleton } from "antd";
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
	const { t } = useTranslation();
	const { callApi, jalali } = useAppContext();
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
			return notificationMaker(t("commons.error"), "error", t("notification.error"));
		}
		setValue("");
		const perComments = comments.map(({ date, ...other }) => ({
			...other,
			date,
			datetime: dayjs(date, { jalali }).fromNow(),
		}));
		setComments([
			...perComments,
			{
				author: <span className="uppercase">{user.fullName}</span>,
				avatar: user.avatarUrl || <UserOutlined className=" border rounded-full shadow-lg" />,
				content: <p>{value}</p>,
				datetime: dayjs().fromNow(),
				date: dayjs().format(),
			},
		]);
		setSubmitting(false);
	}, [callApi, record.id, requestType, comments, value, user.fullName, user.avatarUrl, t, jalali]);
	// init
	useEffect(() => {
		const getComments = async () => {
			setLoading(true);
			const { content = [] } = await getChatRequest(callApi, {
				pgs: 100,
				pgn: 1,
				RecordId: record.id,
				requestType,
			});
			const transformComments = content.map(
				({ firstName, lastName, registerDate, userComment, userId, avatarUrl }) => ({
					author: <span className="uppercase">{`${firstName} ${lastName}`}</span>,
					avatar: avatarUrl || <UserOutlined className=" border rounded-full shadow-lg p-2" />,
					content: <p>{userComment}</p>,
					datetime: dayjs(registerDate).fromNow(),
					date: registerDate,
					userId,
				}),
			);
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
			{loading ? (
				<Skeleton active avatar paragraph={{ rows: 5 }} className="px-[5%]" />
			) : (
				<List
					className="px-[5%]"
					dataSource={comments}
					itemLayout="horizontal"
					renderItem={(props) => <Comment {...props} />}
				/>
			)}
			<CommentSection {...{ handleSubmit, user, submitting, handleChange, value }} />
		</>
	);
};

export default CommentForm;
