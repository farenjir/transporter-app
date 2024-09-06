import { HubConnectionBuilder } from "@microsoft/signalr";
import { HttpTransportType, LogLevel } from "@microsoft/signalr";

import { TOKEN_NAME } from "utils/constance";
import { getFromCookie } from "utils/storage";

const developmentMode = import.meta.env.NODE_ENV === "development";

const hubURL = import.meta.env.VITE_SIGNALR_HUB;

let connection = null;

export async function createConnection(type) {
	const token = getFromCookie(TOKEN_NAME);
	connection = new HubConnectionBuilder()
		.withUrl(`${hubURL}${type}`, {
			transport: HttpTransportType.WebSockets, // signalR.HttpTransportType.LongPolling ,
			skipNegotiation: false,
			withCredentials: true,
			accessTokenFactory: () => token,
		})
		.withAutomaticReconnect()
		.configureLogging(developmentMode ? LogLevel.Error : LogLevel.Information)
		.build();

	await connection.start();

	return connection;
}

export async function getConnection() {
	return await connection;
}
