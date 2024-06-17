import { transformerAppData } from "utils/globals";

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

export const enumsTransformData = (arrayData) => {
	const data = [];
	Array.isArray(arrayData) &&
		arrayData.forEach((item) =>
			data.push(transformerAppData(item, ["id", "valueInLanguage"], { typeName: item.title })),
		);
	return data;
};

export const userDataTransformData = (userData = {}) => {
	return {
		id: userData?.id || 0,
		isVerified: true,
		registerDate: null,
		roleTypeId: 0,
		firstName: userData.firstName,
		lastName: userData.lastName,
		uPassword: userData.uPassword,
		email: userData.email,
		phoneNumber: userData.phoneNumber,
		originCountryId: userData.originCountryId,
		genderTypeId: userData.genderTypeId,
		phoneCoutryPrefixId: userData.phoneCoutryPrefixId ?? 98,
	};
};

export const requestCarrierTransformData = (formValues = {}) => {
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
		fromDateValidOfDeliver: formValues.from,
		toDateValidOfDeliver: formValues.to,
		timeZoneId: formValues.timeZoneId,
		priceIsNegotiable: formValues.priceIsNegotiable,
		proposedPrice: formValues.proposedPrice,
		priceCurrencyTypeId: formValues.priceCurrencyTypeId,
		imageId: formValues.imageId,
	};
};

export const requestAnnonceTransformData = (formValues = {}) => {
	return {
		id: formValues.id,
		requestLangaheTypeID: formValues.langType,
		cargoWeightUnitIssueId: formValues.cargoWeightUnitIssueId,
		fromCountryId: formValues.fromCountryId,
		toCountryId: formValues.toCountryId,
		fromLocationId: formValues.fromLocationId,
		toLocationId: formValues.toLocationId,
		fromLocationDesc: formValues.fromLocationDesc,
		toLocationDesc: formValues.toLocationDesc,
		timeZoneId: formValues.timeZoneId,
		priceIsNegotiable: formValues.priceIsNegotiable,
		proposedPrice: formValues.proposedPrice,
		priceCurrencyTypeId: formValues.priceCurrencyTypeId,
		carrierUserId: formValues.carrierUserId,
		carrierDesc: formValues.carrierDesc,
		cargoMaxSizeCapacity: formValues.cargoMaxSizeCapacity,
		cargoMaxWeightCapacity: formValues.cargoMaxWeightCapacity,
		dateOfDeliver: formValues.dateOfDeliver,
		matchStatusId: formValues.matchStatusId,
	};
};
