import * as transformer from "./transformer";

export const getAllCountry = (callApi, lngTypeId = 10) => {
	return callApi({ url: "Country/GetAllCountry", params: { lngTypeId } })
		.then((response) => transformer.countriesTransformData(response))
		.catch((_e) => []);
};
export const getAllLocationByCountry = (callApi, lngTypeId = 10, countryId = 1) => {
	return callApi({ url: "GeoLocation/GetAllLocationByCountry", params: { lngTypeId, countryId } })
		.then((response) => transformer.locationsTransformData(response, countryId))
		.catch((_e) => []);
};
export const getLocationWithText = (
	callApi,
	{ lngTypeId = 10, locationTitle, pgn, pgs, countryId, cityId, stateId },
) => {
	return callApi({
		url: "GeoLocation/GetPagedResultByText",
		params: { lngTypeId, locationTitle, pgn, pgs, countryId, cityId, stateId },
	})
		.then((response) => transformer.locationsTextTransformData(response?.content))
		.catch((_e) => []);
};

export const getBasicEnums = (callApi, TypeId = 0, lngTypeId = 10) => {
	return callApi({ url: "BasicEnums/GetBaseEnumsByType", params: { lngTypeId, TypeId } })
		.then((response) => transformer.enumsTransformData(response))
		.catch((_e) => []);
};

export const userAuthentication = (callApi, cpid, pNumber) => {
	return callApi({ url: "UserProflie/login", method: "POST", params: { cpid, pNumber } })
		.then((response = {}) => response)
		.catch((_e) => {});
};

export const userRegister = (callApi, userData = {}) => {
	const data = transformer.userDataTransformData(userData);
	return callApi({ url: "UserProflie/Register", method: "POST", data })
		.then((response = {}) => response)
		.catch((_e) => {});
};
export const userUpdate = (callApi, userData = {}) => {
	const data = transformer.userDataTransformData(userData);
	return callApi({ url: "UserProflie/UpdatePrifless", method: "PUT", data })
		.then((response = {}) => response)
		.catch((_e) => {});
};

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
	return callApi({ url: "RequestForCarrier/EditRequest", method: "PUT", data })
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
export const putRequestForAnnonce = (callApi, updateData) => {
	const data = transformer.requestAnnonceTransformData(updateData);
	return callApi({ url: "CarrierAnnonce/EditCarrierAnnonce", method: "PUT", data })
		.then((response) => response)
		.catch((_e) => []);
};
