import { useCallback, useEffect, useState } from "react";

import { createConnection, getConnection } from "service/signalRService";

export const useWebSocket = ({ receiveType, sendType, connectionType, recordId }) => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		let connection;
		const startConnection = async () => {
			connection = await createConnection(connectionType);
			connection.on(receiveType, (user, message) => {
				setMessages((prevMessages) => [...prevMessages, { user, message }]);
			});
		};
		startConnection();
		// cleanUp
		return () => {
			connection?.stop?.();
		};
	}, [connectionType, receiveType, recordId]);

	const sendMessage = useCallback(
		async (recordId, userId, message) => {
			const connection = await getConnection();
			try {
				await connection.invoke(sendType, `${userId}`, message);
			} catch (err) {
				console.error("Error sending message:", err);
			}
		},
		[sendType],
	);

	return { messages, sendMessage };
};
