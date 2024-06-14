import * as transformer from "./transformer";

export const getRequestForCarrier = (callApi, queries) => {
	return callApi({ url: "RequestForCarrier/GetPagedResult", params: queries })
		.then((response) => response)
		.catch((_e) => []);
};
export const postRequestForCarrier = (callApi, requestData) => {
	const data = transformer.requestCarrierTransformData(requestData);
	return callApi({ url: "RequestForCarrier/AddRequest", method: "POST", data })
		.then((response) => response)
		.catch((_e) => []);
};
export const putRequestForCarrier = (callApi, updateData) => {
	const data = transformer.requestCarrierTransformData(updateData);
	return callApi({ url: "RequestForCarrier//EditRequest", method: "PUT", data })
		.then((response) => response)
		.catch((_e) => []);
};

export const getCarrierAnnonce = (callApi, queries) => {
	return callApi({ url: "CarrierAnnonce/GetPagedResult", params: queries })
		.then((response) => response)
		.catch((_e) => []);
};
export const postCarrierAnnonce = (callApi, requestData) => {
	const data = transformer.requestAnnonceTransformData(requestData);
	return callApi({ url: "CarrierAnnonce/AddCarrierAnnonce", method: "POST", data })
		.then((response) => response)
		.catch((_e) => ({ content: [] }));
};
