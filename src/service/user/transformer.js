import { dateToGregorian, transformerAppData } from "utils/globals";

export const countriesTransformData = (arrayData) => {
	const data = [];
	Array.isArray(arrayData) &&
		arrayData.forEach((item) =>
			data.push(transformerAppData(item, ["id", "countryBaseName"], { pId: 0, isLeaf: false })),
		);
	return data;
};

export const locationsTransformData = (arrayData, pId) => {
	const data = [];
	Array.isArray(arrayData) &&
		arrayData.forEach((item) =>
			data.push(transformerAppData(item, ["id", "geoLocationTitle"], { pId, isLeaf: true })),
		);
	return data;
};

export const requestCarrierTransformData = (formValues) => {
	return {
		id: formValues.id,
		requesterUserId: formValues.userId,
		requestLangaheTypeID: formValues.langType,
		cargoDesc: formValues.cargoDesc,
		cargoSize: formValues.cargoSize,
		cargoWeight: formValues.cargoWeight,
		cargoItemNo: formValues.cargoItemNo,
		cargoWeightUnitIssueId: formValues.cargoWeightUnitIssueId,
		fromCountryId: formValues.fromCountryId,
		toCountryId: formValues.toCountryId,
		fromLocationId: formValues.fromLocationId,
		toLocationId: formValues.toLocationId,
		fromLocationDesc: formValues.fromLocationDesc,
		toLocationDesc: formValues.toLocationDesc,
		fromDateValidOfDeliver: formValues.from.format("YYYY-MM-DDThh:mm:ssZ"),
		toDateValidOfDeliver: formValues.to.format("YYYY-MM-DDThh:mm:ssZ"),
		timeZoneId: formValues.timeZoneId,
		priceIsNegotiable: formValues.priceIsNegotiable,
		proposedPrice: formValues.proposedPrice,
		priceCurrencyTypeId: formValues.priceCurrencyTypeId,
		imageId: "",
	};
};
