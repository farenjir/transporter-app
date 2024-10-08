import { useCallback, useEffect, useState } from "react";

import { createConnection, getConnection } from "service/signalRService";

export const useWebSocket = ({ receiveType, sendType, connectionType, recordId }) => {
	const [loading, setLoading] = useState(true);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		let connection;
		const startConnection = async () => {
			setLoading(true);
			connection = await createConnection(connectionType);
			connection.on(receiveType, (recordId, fromUserName, parentId, message) => {
				setMessages((prevMessages) => [...prevMessages, { recordId, fromUserName, parentId, message }]);
			});
			setLoading(false);
		};
		startConnection();
		// cleanUp
		return () => {
			connection?.stop?.();
			connection = null;
			setMessages([]);
		};
	}, [connectionType, receiveType, recordId]);

	const sendMessage = useCallback(
		async (recordId, toUserId, relationId, message) => {
			const connection = await getConnection();
			try {
				await connection.invoke(sendType, recordId, toUserId, relationId, message);
			} catch (err) {
				console.error("Error sending message:", err);
			}
		},
		[sendType],
	);

	return { messages, loading, sendMessage };
};
