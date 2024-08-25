import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

let connection = null;

export function createConnection() {
	if (connection === null) {
		connection = new HubConnectionBuilder()
			// eslint-disable-next-line no-undef
			.withUrl(process.env.VITE_SIGNALR_HUB)
			.configureLogging(LogLevel.Information)
			.build();

		connection
			.start()
			.then(() => console.log("SignalR Connected"))
			.catch((err) => console.error("SignalR Connection Error:", err));
	}

	return connection;
}

export function getConnection() {
	return connection;
}
