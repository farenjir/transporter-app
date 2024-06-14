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
