export const APP_VERSION = "0.16.1";
export const INIT_APP = "appInitialize";
export const TOKEN_NAME = "access_token";

export const LANG_NAME = "language";
export const DEFAULT_LANG = "fa";

export const enumTypes = [
	101, // Gender
	104, // WeightUnitIssue
	105, // CurrencyType
	107, // CargoSize
];

export const requestCommentType = {
	send: 1,
	get: 2,
};

export const chatType = {
	send: {
		type: "SendingPackHub",
		source: "SendMessageP",
		target: "ReceiveMessageP",
	},
	get: {
		type: "ShareTripHub",
		source: "SendMessageT",
		target: "ReceiveMessageT",
	},
};
