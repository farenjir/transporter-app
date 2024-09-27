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
	const [comments, setComments] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [initializeHistory, setInitializeHistory] = useState(false);
	// user
	const [businessInfraction, setBusinessInfraction] = useState({});
	const [activeChatBI, setActiveChatBI] = useState("0");
	// hooks
	const { token } = theme.useToken();
	const { t } = useTranslation();
	const { callApi, direction, deDirection, dePlacement } = useAppContext();
	const { user } = useSelector(authSelector);
	const [form] = Form.useForm();
	// socket type
	const { type: connectionType, source: sendType, target: receiveType } = chatType[requestType] || {};
	const { loading, messages, sendMessage } = useWebSocket({ receiveType, sendType, connectionType, recordId: record.id });
	// handles
	const updateMessageOnSocket = useCallback(
		(messages) => {
			const transformComments = messages.map(({ recordId, fromUserName, parentId, message }) => {
				const { toName, toId, iId, iName } = businessInfraction[activeChatBI] || {};
				const isMyMessage = iName === fromUserName;
				return {
					isMyMessage,
					toName,
					toId,
					iName,
					iId,
					author: <span className="uppercase">{fromUserName}</span>,
					avatar: <UserOutlined className="border rounded-full shadow-lg p-2" />,
					content: <p>{message}</p>,
					className: `px-[2%] ${isMyMessage ? direction : deDirection}`,
				};
			});
			if (transformComments?.length) {
				const updateMessages = transformComments.concat(comments[activeChatBI]);
				setComments((perComments) => ({ ...perComments, [activeChatBI]: updateMessages }));
			}
		},
		[comments, businessInfraction, activeChatBI, direction, deDirection],
	);
	// handleSubmit
	const handleSubmit = useCallback(
		async ({ message }, { toName, iName, iId, toId }) => {
			if (!message) return;
			setSubmitting(true);
			await sendMessage(record.id, toId, 0, message);
			form.setFieldValue("message", "");
			setSubmitting(false);
		},
		[form, record.id, sendMessage],
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
					if (!businesIntractionId) return null;
					const recordRoundId = `${businesIntractionId}`;

					const isMyMessage = user?.id === fromUserId;

					if (!transformComments[recordRoundId]) {
						transformComments[recordRoundId] = [];
						toName = `${fromFirstName} ${fromLastName}`;
						iName = `${toFirstName} ${toLastName}`;
						toId = fromUserId;
						iId = toUserId;
						setBusinessInfraction((perObject) => ({ ...perObject, [recordRoundId]: { toName, iName, toId, iId } }));
						setActiveChatBI(recordRoundId);
					} else {
						const {
							toName: perToName,
							iName: perIName,
							toId: perToId,
							iId: perIId,
						} = transformComments[recordRoundId][0];
						toName = perToName;
						iName = perIName;
						toId = perToId;
						iId = perIId;
					}

					transformComments[recordRoundId].push({
						isMyMessage,
						toName,
						iName,
						toId,
						iId,
						author: <span className="uppercase">{isMyMessage ? iName : toName}</span>,
						avatar: <UserOutlined className="border rounded-full shadow-lg p-2" />,
						content: <p>{userComment}</p>,
						className: `px-[2%] ${isMyMessage ? direction : deDirection}`,
					});
				},
			);
			const comments = {};
			Object.entries(transformComments).forEach(([key, arrayValue]) => (comments[key] = arrayValue.reverse()));
			setComments(comments);
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
	useEffect(() => {
		initializeHistory && updateMessageOnSocket(messages);
	}, [messages, initializeHistory]);
	// returnJSX
	const Comments = ({ comments, submitting, loading, toName, iName, iId, toId }) => (
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
			</div>
			<Comment
				avatar={<Avatar src={user.avatarUrl || ""} icon={<UserOutlined />} alt={iName} />}
				content={
					<Form form={form} onFinish={(values) => handleSubmit(values, { toName, iName, iId, toId })}>
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
	const appTabOptions = Object.entries(comments).map(([key, arrayValue]) => {
		const { toName, iName, iId, toId } = arrayValue?.[0] || {};
		return {
			key: key.toString(),
			label: <span className="uppercase">{toName}</span>,
			children: <Comments {...{ comments: arrayValue, toName, iName, iId, toId, submitting, loading }} />,
		};
	});
	return (
		<>
			{appTabOptions?.length ? (
				<AppTabs
					items={appTabOptions}
					type="card"
					tabPosition={dePlacement}
					onChange={setActiveChatBI}
					defaultActiveKey={activeChatBI}
				/>
			) : (
				<div className="min-h-[500px] grid place-content-center">
					<Spin size="large"></Spin>
				</div>
			)}
		</>
	);
};

export default OwnerCommentForm;
