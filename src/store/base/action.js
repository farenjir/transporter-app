import { createAsyncThunk } from "@reduxjs/toolkit";

import { enumTypes } from "utils/constance";
import { getBasicEnums } from "service/main";

import * as transformer from "service/main/transformer";

export const getCountries = createAsyncThunk(
	"app/countries",
	async ({ callApi, lngTypeId = 10 }, { getState }) => {
		const {
			bases: { countries },
		} = getState();
		if (countries?.length) return countries;
		return await callApi({ url: "Country/GetAllCountry", params: { lngTypeId } })
			.then((data) => transformer.countriesTransformData(data))
			.catch(() => []);
	},
);

export const getCountryLocations = createAsyncThunk(
	"app/locations",
	async ({ callApi, lngTypeId = 10, countryId = 1 }) => {
		return await callApi({ url: "GeoLocation/GetAllLocationByCountry", params: { lngTypeId, countryId } })
			.then((data) => transformer.locationsTransformData(data))
			.catch((_e) => []);
	},
);

export const getEnums = createAsyncThunk("app/enums", async ({ callApi, lngTypeId = 10 }, { getState }) => {
	const {
		bases: { enums },
	} = getState();
	if (Object.keys(enums)?.length === enumTypes?.length) return enums;
	const enumsArray = await Promise.all(enumTypes.map(async (type) => await getBasicEnums(callApi, type, lngTypeId)));
	const enumsWithType = {}
	enumTypes.forEach((typeId, idx) => {
		enumsWithType[typeId] = enumsArray[idx]
	})
	return enumsWithType;
});
