import { transformerAppData } from "utils/globals";

export const countriesTransformData = (arrayData) => {
	const data = [];
	Array.isArray(arrayData) &&
		arrayData.forEach((item) => data.push(transformerAppData(item, ["id", "countryBaseName"], { pId: 0, isLeaf: false })));
	return data;
};

export const locationsTransformData = (arrayData, pId) => {
	const data = [];
	Array.isArray(arrayData) &&
		arrayData.forEach((item) => data.push(transformerAppData(item, ["id", "geoLocationTitle"], { pId, isLeaf: true })));
	return data;
};
