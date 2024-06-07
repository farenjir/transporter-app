import * as  transformer from "./transformer";

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

export const postRequestForCarrier = (callApi, requestData) => {
	const data = transformer.requestCarrierTransformData(requestData)
	return callApi({ url: "RequestForCarrier/AddRequest", method: "POST", data })
		.then((response) => response)
		.catch((_e) => []);
};
