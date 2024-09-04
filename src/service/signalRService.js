import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import { TOKEN_NAME } from "utils/constance";
import { getFromCookie } from "utils/storage";

const hubURL = import.meta.env.VITE_SIGNALR_HUB;

let connection = null;

export async function createConnection(type) {
	if (connection === null) {
		connection = new HubConnectionBuilder()
			.withUrl(`${hubURL}${type}`, {
				skipNegotiation: false,
				accessTokenFactory: () => getFromCookie(TOKEN_NAME),
				withCredentials: true,
			})
			.withAutomaticReconnect()
			.configureLogging(LogLevel.Information)
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
