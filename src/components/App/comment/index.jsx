import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { List, Skeleton, theme } from "antd";
import { Avatar, Button, Form, Input } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { Comment } from "@ant-design/compatible";

import { useSelector } from "react-redux";
import { authSelector } from "store/auth";

import { useAppContext } from "hooks";
import { chatType } from "utils/constance";
import { useWebSocket } from "hooks/useWebSocket";
import { getChatRequest } from "service/user";

const { TextArea } = Input;

const CommentForm = ({ requestType, record }) => {
	const [comments, setComments] = useState([]);
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
			.map(({ user, message }) => ({
				author: <span className="uppercase">{`${"userID"} : ${user}`}</span>,
				avatar: <UserOutlined className="border rounded-full shadow-lg p-2" />,
				content: <p>{message}</p>,
				className: `px-[5%] ${user === user ? deDirection : direction}`,
			}))
			.reverse();
		setComments((perMessage) => [...transformComments, ...perMessage]);
	}, [deDirection, direction, messages]);

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
				pgs: 1000,
				pgn: 1,
				RecordId: record.id,
				requestType: requestType === "send" ? 1 : 2,
			});
			const transformComments = content
				.map(({ fromFirstName, fromLastName, fromUserId, userComment, userId, avatarUrl }) => ({
					author: <span className="uppercase">{`${fromFirstName} ${fromLastName}`}</span>,
					avatar: avatarUrl || <UserOutlined className="border rounded-full shadow-lg p-2" />,
					content: <p>{userComment}</p>,
					className: `px-[5%] ${fromUserId === userId ? deDirection : direction}`,
				}))
				.reverse();
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
	}, [callApi, deDirection, direction, record.id, requestType]);
	// render
	useEffect(() => {
		initializeHistory && updateMessageOnSocket();
	}, [updateMessageOnSocket, initializeHistory]);
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
};

export default CommentForm;
