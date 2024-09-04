import { useCallback, useEffect, useState } from "react";

import { createConnection, getConnection } from "service/signalRService";

export const useWebSocket = ({ receiveType, sendType, connectionType }) => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		let connection;
		const startConnection = async () => {
			connection = await createConnection(connectionType);
			// ReceiveMessage
			connection.on(receiveType, (user, message) => {
				setMessages((prevMessages) => [...prevMessages, { user, message }]);
			});
		};
		startConnection();
		// cleanUp
		return () => {
			connection?.stop?.();
		};
	}, [connectionType, receiveType]);

	const sendMessage = useCallback(
		async (recordId, userId, message) => {
			const connection = await getConnection();
			try {
				// SendMessage
				await connection.invoke(sendType, recordId, userId, 0, message);
			} catch (err) {
				console.error("Error sending message:", err);
			}
		},
		[sendType],
	);

	return { messages, sendMessage };
	// return (
	// 	<div>
	// 		<h1>SignalR Messages</h1>
	// 		<button onClick={sendMessage}>Send Message</button>
	// 		<ul>
	// 			{messages.map((msg, index) => (
	// 				<li key={index}>
	// 					{msg.user}: {msg.message}
	// 				</li>
	// 			))}
	// 		</ul>
	// 	</div>
	// );
};
