import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const hubURL = import.meta.env.VITE_SIGNALR_HUB;

let connection = null;

export function createConnection() {
	if (connection === null) {
		connection = new HubConnectionBuilder().withUrl(hubURL).configureLogging(LogLevel.Information).build();

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
