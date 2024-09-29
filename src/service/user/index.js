export const getMyCarrierRequest = (callApi, queries = { pgs: 1000, pgn: 1 }) => {
	return callApi({ url: "RequestForCarrier/GetMyRequest", params: queries })
		.then((response) => response)
		.catch(() => []);
};
export const deleteMyCarrierRequest = (callApi, requestid) => {
	return callApi({ url: "RequestForCarrier/DeleteRequest", params: { requestid }, method: "DELETE" })
		.then((response) => response)
		.catch(() => []);
};

export const getMyAnnonceRequest = (callApi, queries = { pgs: 1000, pgn: 1 }) => {
	return callApi({ url: "CarrierAnnonce/GetMyCarrrierAnnonce", params: queries })
		.then((response) => response)
		.catch(() => []);
};
export const deleteMyAnnonceRequest = (callApi, carrierAnnonceId) => {
	return callApi({
		url: "CarrierAnnonce/DeleteCarrierAnnonce",
		params: { carrierAnnonceId },
		method: "DELETE",
	})
		.then((response) => response)
		.catch(() => []);
};

export const getChatRequest = (callApi, { RecordId, requestType, pgs, pgn }) => {
	return callApi({ url: "RequestChat/GetPagedResultChat", params: { RecordId, requestType, pgs, pgn } })
		.then((response = {}) => response)
		.catch(() => {});
};
export const chatRequest = (callApi, bodyData) => {
	return callApi({ url: "RequestChat/SendMessage", method: "POST", data: bodyData })
		.then((response = {}) => response)
		.catch(() => {});
};

export const getMyChatAnnonceRequest = (callApi, queries = { pgs: 1000, pgn: 1 }) => {
	return callApi({ url: "UserBusuinesIntraction/MyBizDialogue2", params: queries })
		.then((response) => response)
		.catch(() => []);
};
export const getMyChatCarrierRequest = (callApi, queries = { pgs: 1000, pgn: 1 }) => {
	return callApi({ url: "UserBusuinesIntraction/MyBizDialogue1", params: queries })
		.then((response) => response)
		.catch(() => []);
};

export const getMyUnReadMessage = (callApi) => {
	return callApi({ url: "RequestChat/GetMyUnReadMessage" })
		.then((response = {}) => response)
		.catch(() => {});
};
export const getMyUnReadMessageCount = (callApi, { recordId, requestType }) => {
	return callApi({ url: "RequestChat/GetMyUnReadMessage2", params: { recordId, requestType } })
		.then((response = {}) => response)
		.catch(() => {});
};

export const getCountUnReadMessage = (callApi) => {
	return callApi({ url: "RequestChat/GetCountUnReadMessage" })
		.then((response = {}) => response)
		.catch(() => {});
};
export const getCountUnReadMessageCount = (callApi, { recordId, requestType }) => {
	return callApi({ url: "RequestChat/GetCountUnReadMessage2", params: { recordId, requestType } })
		.then((response = {}) => response)
		.catch(() => {});
};

export const postMessageAsRead = (callApi, { recordId, requestType }) => {
	return callApi({ url: "RequestChat/SetAsReadMessage", method: "POST", data: { recordId, requestType } })
		.then((response = {}) => response)
		.catch(() => {});
};
