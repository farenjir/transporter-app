import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { List, Skeleton, Spin, theme } from "antd";
import { Avatar, Button, Form, Input } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { Comment } from "@ant-design/compatible";

import { useSelector } from "react-redux";
import { authSelector } from "store/auth";

import { chatType, requestCommentType } from "utils/constance";
import { useAppContext } from "hooks";
import { useWebSocket } from "hooks/useWebSocket";
import { getChatRequest } from "service/user";

import { AppTabs } from "components";

const { TextArea } = Input;

const OwnerCommentForm = ({ requestType, record }) => {
	const [businesIntractionId, setBusinesIntractionId] = useState("businesIntractionId-0");
	const [comments, setComments] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [initializeHistory, setInitializeHistory] = useState(false);
	// hooks
	const { token } = theme.useToken();
	const { t } = useTranslation();
	const { callApi, direction, deDirection } = useAppContext();
	const { user } = useSelector(authSelector);
	const [form] = Form.useForm();
	// socket type
	const { type: connectionType, source: sendType, target: receiveType } = chatType[requestType] || {};
	const { loading, messages, sendMessage } = useWebSocket({ receiveType, sendType, connectionType, recordId: record.id });
	// handles
	const updateMessageOnSocket = useCallback(async () => {
		const transformComments = messages
			.map(({ recordId, fromUserName, parentId, message }) => ({
				author: <span className="uppercase">{fromUserName}</span>,
				avatar: <UserOutlined className="border rounded-full shadow-lg p-2" />,
				content: <p>{message}</p>,
				className: `px-[5%] ${direction}`,
			}))
			.reverse();
		setComments((perMessage) => [...transformComments, ...perMessage]);
	}, [direction, messages]);

	const handleSubmit = useCallback(
		async ({ message }) => {
			if (!message) return;
			setSubmitting(true);
			await sendMessage(record.id, record.carrierUserId || record.requesterUserId, 0, message);
			form.setFieldValue("message", "");
			setSubmitting(false);
		},
		[form, record.carrierUserId, record.id, record.requesterUserId, sendMessage],
	);
	// init
	useEffect(() => {
		const getComments = async () => {
			setInitializeHistory(false);
			const { content = [] } = await getChatRequest(callApi, {
				pgs: 999999999,
				pgn: 1,
				RecordId: record.id,
				requestType: requestCommentType[requestType],
			});
			const transformComments = {};

			content.forEach(
				({
					businesIntractionId,
					fromFirstName,
					fromLastName,
					fromUserId,
					id,
					parentChatId,
					recordId,
					registerDate,
					tableId,
					toFirstName,
					toLastName,
					toUserId,
					userComment,
				}) => {
					const recordRoundId = `businesIntractionId-${businesIntractionId}`;
					const isMyMessage = user?.id === fromUserId;
					if (!transformComments[recordRoundId]) {
						transformComments[recordRoundId] = [];
					}
					transformComments[recordRoundId].push({
						author: (
							<span className="uppercase">{`${!isMyMessage ? fromFirstName : toFirstName} ${!isMyMessage ? fromLastName : toLastName}`}</span>
						),
						avatar: <UserOutlined className="border rounded-full shadow-lg p-2" />,
						content: <p>{userComment}</p>,
						className: `px-[5%] ${isMyMessage ? direction : deDirection}`,
					});
				},
			);

			setComments(transformComments);
			setInitializeHistory(true);
		};
		if (record.id) {
			getComments();
		}
		return () => {
			setComments([]);
			setInitializeHistory(false);
		};
	}, [callApi, deDirection, direction, record.id, requestType, user?.id]);
	// render
	// useEffect(() => {
	// 	initializeHistory && updateMessageOnSocket();
	// }, [updateMessageOnSocket, initializeHistory]);
	// returnJSX

	const Comments = ({ comments, user, submitting, loading }) => (
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
			<Comment
				avatar={<Avatar src={user.avatarUrl || ""} icon={<UserOutlined />} alt={user.fullName} />}
				content={
					<Form form={form} onFinish={handleSubmit}>
						<Form.Item name="message">
							<TextArea rows={4} />
						</Form.Item>
						<Form.Item>
							<Button htmlType="submit" loading={submitting} type="primary" disabled={loading}>
								{t("commons.send")}
							</Button>
						</Form.Item>
					</Form>
				}
			/>
		</>
	);

	// tabs
	const appTabOptions = Object.entries(comments).map(([key, arrayValue]) => ({
		key: key.toString(),
		label: <span>{key.toString()}</span>,
		children: <Comments {...{ comments: arrayValue, user, submitting, loading }} />,
	}));

	console.log({ appTabOptions, comments });
	return (
		<>
			{appTabOptions?.length ? (
				<AppTabs items={appTabOptions} type="card" onChange={setBusinesIntractionId} />
			) : (
				<div className="min-h-[500px] grid place-content-center">
					<Spin size="large"></Spin>
				</div>
			)}
		</>
	);
};

export default OwnerCommentForm;
