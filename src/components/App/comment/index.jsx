import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { List, Skeleton, Spin, theme } from "antd";
import { Avatar, Button, Form, Input } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { Comment } from "@ant-design/compatible";

import { useSelector } from "react-redux";
import { authSelector } from "store/auth";

import { chatType, requestCommentType } from "utils/constance";
import { useAppContext, useNewMessageCount } from "hooks";
import { useWebSocket } from "hooks/useWebSocket";
import { getChatRequest } from "service/user";
import useScrollToBottom from "hooks/scrollToButtom";

const { TextArea } = Input;

const OwnerCommentForm = ({ requestType, record }) => {
	const [defaultComments, setDefaultComments] = useState([]);
	const [comments, setComments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [initializeHistory, setInitializeHistory] = useState(false);
	// user
	const [businessInfraction, setBusinessInfraction] = useState({});
	// hooks
	const { token } = theme.useToken();
	const { t } = useTranslation();
	const { callApi, direction, deDirection } = useAppContext();
	const { user } = useSelector(authSelector);
	const [form] = Form.useForm();
	const { handleMessageRead } = useNewMessageCount(callApi, {
		recordId: record?.id,
		requestType: requestType,
		onlyUseHandle: true,
	});
	// socket type
	const { type: connectionType, source: sendType, target: receiveType } = chatType[requestType] || {};
	const { loading, messages, sendMessage } = useWebSocket({ receiveType, sendType, connectionType, recordId: record.id });
	const { listRef } = useScrollToBottom({ chats: comments });
	// handles
	const updateMessageOnSocket = useCallback(
		(messages) => {
			const transformComments = messages.map(({ recordId, fromUserName, parentId, message }) => {
				const { toName, toId, iId, iName } = businessInfraction;
				const isMyMessage = iName === fromUserName;
				return {
					isMyMessage,
					toName,
					toId,
					iName,
					iId,
					author: <span className="uppercase">{fromUserName}</span>,
					avatar: <UserOutlined className="border rounded-full shadow-lg p-2" />,
					content: <p className={`inline-block ${direction}`}>{message}</p>,
					className: `px-[2%] ${isMyMessage ? direction : deDirection}`,
				};
			});
			if (transformComments?.length) {
				const updateMessages = defaultComments.concat(transformComments);
				setComments(updateMessages);
			}
		},
		[defaultComments, businessInfraction, direction, deDirection],
	);
	// handleSubmit
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
			const myChatBI = content.find(
				(item) => item?.toUserId === user?.id || item?.fromUserId === user?.id,
			)?.businesIntractionId;

			const transformComments = [];
			let toName = "";
			let iName = "";
			let iId = "";
			let toId = "";

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
					if (businesIntractionId !== myChatBI) return null;

					const isMyMessage = user?.id === fromUserId;

					if (!transformComments?.length) {
						iName = `${fromFirstName} ${fromLastName}`;
						toName = `${toFirstName} ${toLastName}`;
						iId = fromUserId;
						toId = toUserId;
						setBusinessInfraction({ toName, iName, toId, iId });
					} else {
						const { toName: perToName, iName: perIName, toId: perToId, iId: perIId } = transformComments[0];
						toName = perToName;
						iName = perIName;
						toId = perToId;
						iId = perIId;
					}

					transformComments.push({
						isMyMessage,
						toName,
						iName,
						toId,
						iId,
						author: <span className="uppercase">{isMyMessage ? iName : toName}</span>,
						avatar: <UserOutlined className="border rounded-full shadow-lg p-2" />,
						content: <p className={`inline-block ${direction}`}>{userComment}</p>,
						className: `px-[2%] ${isMyMessage ? direction : deDirection}`,
					});
				},
			);
			setComments(transformComments);
			setDefaultComments(transformComments);
			setInitializeHistory(true);
		};
		if (record.id) {
			getComments();
		}
		return () => {
			setComments([]);
			setDefaultComments([]);
			setInitializeHistory(false);
			handleMessageRead();
		};
	}, [callApi, deDirection, direction, record.id, requestType, user?.id]);
	// render
	useEffect(() => {
		initializeHistory && updateMessageOnSocket(messages);
	}, [messages, initializeHistory]);
	// returnJSX
	return (
		<>
			{initializeHistory ? (
				<>
					<div className="h-[300px] overflow-y-scroll border-r-2 rounded-3xl shadow-md">
						{loading ? (
							<Skeleton active avatar paragraph={{ rows: 8 }} className="px-[2%]" />
						) : (
							<List
								dataSource={comments}
								itemLayout="horizontal"
								renderItem={(props) => <Comment {...props} style={{ background: token?.colorPrimaryLighter }} />}
							/>
						)}
						<div ref={listRef}></div>
					</div>
					<Comment
						avatar={<Avatar src={user.avatarUrl || ""} icon={<UserOutlined />} alt={businessInfraction?.iName} />}
						content={
							<Form form={form} onFinish={(values) => handleSubmit(values)}>
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
			) : (
				<div className="min-h-[500px] grid place-content-center">
					<Spin size="large"></Spin>
				</div>
			)}
		</>
	);
};

export default OwnerCommentForm;
