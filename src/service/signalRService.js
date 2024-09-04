import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const hubURL = import.meta.env.VITE_SIGNALR_HUB;

let connection = null;

export async function createConnection(type) {
	if (connection === null) {
		connection = new HubConnectionBuilder()
			.withUrl(hubURL + type)
			// .configureLogging(LogLevel.Information)
			.build();

		await connection
			.start()
			.then(() => console.log("SignalR Connected"))
			.catch((err) => console.error("SignalR Connection Error:", err));
	}

	return connection;
}

export async function getConnection() {
	return await connection;
}
