import { useEffect, useState } from "react";

import { createConnection, getConnection } from "service/signalRService";

function WebSocket() {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const connection = createConnection();

		connection.on("ReceiveMessage", (user, message) => {
			setMessages((prevMessages) => [...prevMessages, { user, message }]);
		});

		return () => {
			connection.stop();
		};
	}, []);

	const sendMessage = async () => {
		const connection = getConnection();
		try {
			await connection.invoke("SendMessage", "User", "Hello World");
		} catch (err) {
			console.error("Error sending message:", err);
		}
	};

	return (
		<div>
			<h1>SignalR Messages</h1>
			<button onClick={sendMessage}>Send Message</button>
			<ul>
				{messages.map((msg, index) => (
					<li key={index}>
						{msg.user}: {msg.message}
					</li>
				))}
			</ul>
		</div>
	);
}

export default WebSocket;
