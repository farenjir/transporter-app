import { createAsyncThunk } from "@reduxjs/toolkit";

import { countriesTransformData, locationsTransformData } from "service/user/transformer";

export const getCountries = createAsyncThunk("app/countries", async ({ callApi, lngTypeId = 10 }, { getState }) => {
	const { bases: { countries } } = getState()
	if (countries?.length) return countries
	return await callApi({ url: "Country/GetAllCountry", params: { lngTypeId } })
		.then((data) => countriesTransformData(data))
		.catch(() => []);
});

export const getCountryLocations = createAsyncThunk("app/locations", async ({ callApi, lngTypeId = 10, countryId = 1 }) => {
	return await callApi({ url: "GeoLocation/GetAllLocationByCountry", params: { lngTypeId, countryId } })
		.then((data) => locationsTransformData(data))
		.catch((_e) => []);
});