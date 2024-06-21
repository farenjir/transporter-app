export const getMyCarrierRequest = (callApi, queries = { pgs: 1000, pgn: 1 }) => {
	return callApi({ url: "RequestForCarrier/GetMyRequest", params: queries })
		.then((response) => response)
		.catch((_e) => []);
};
export const deleteMyCarrierRequest = (callApi, requestid) => {
	return callApi({ url: "RequestForCarrier/DeleteRequest", params: { requestid }, method: "DELETE" })
		.then((response) => response)
		.catch((_e) => []);
};

export const getMyAnnonceRequest = (callApi, queries = { pgs: 1000, pgn: 1 }) => {
	return callApi({ url: "CarrierAnnonce/GetMyCarrrierAnnonce", params: queries })
		.then((response) => response)
		.catch((_e) => []);
};
export const deleteMyAnnonceRequest = (callApi, carrierAnnonceId) => {
	return callApi({ url: "CarrierAnnonce/DeleteCarrierAnnonce", params: { carrierAnnonceId }, method: "DELETE" })
		.then((response) => response)
		.catch((_e) => []);
};