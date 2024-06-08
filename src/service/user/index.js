import * as  transformer from "./transformer";

export const postRequestForCarrier = (callApi, requestData) => {
	const data = transformer.requestCarrierTransformData(requestData)
	return callApi({ url: "RequestForCarrier/AddRequest", method: "POST", data })
		.then((response) => response)
		.catch((_e) => []);
};

export const postCarrierAnnonce = (callApi, requestData) => {
	const data = transformer.requestCarrierTransformData(requestData)
	return callApi({ url: "CarrierAnnonce/AddCarrierAnnonce", method: "POST", data })
		.then((response) => response)
		.catch((_e) => []);
};
