import { countriesTransformData, locationsTransformData } from "./transformer";

export const getAllCountry = (callApi, lngTypeId = 10) => {
	return callApi({ url: "Country/GetAllCountry", params: { lngTypeId } })
		.then((data) => countriesTransformData(data))
		.catch((_e) => []);
};

export const getAllLocationByCountry = (callApi, lngTypeId = 10, countryId = 1) => {
	return callApi({ url: "GeoLocation/GetAllLocationByCountry", params: { lngTypeId, countryId } })
		.then((data) => locationsTransformData(data,countryId))
		.catch((_e) => []);
};
