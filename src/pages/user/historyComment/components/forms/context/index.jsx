import { createContext, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Form } from "antd";

import { useSelector } from "react-redux";
import { baseSelector } from "store/base";

import { useAppContext } from "hooks";
import { notificationMaker } from "utils/notification";
import { dateToApi } from "utils/globals";
import { getLocationWithText, putRequestForAnnonce, putRequestForCarrier } from "service/main";

export const RequestContext = createContext({});

function RequestContextApi({ children, record, handleCloseModals, getDataSource }) {
	const [backUpLocations, setBackUpLocations] = useState([]);
	const [autoData, setAutoData] = useState([]);
	const [autocompleteLoading, setAutocompleteLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	// hooks
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const { callApi, jalali } = useAppContext();
	const { enums } = useSelector(baseSelector);
	// options
	const priceTypes = [
		{ label: t("commonPages.priceNegotiable"), value: true },
		{ label: t("commonPages.priceNotNegotiable"), value: false },
	];
	// handles
	const locationIdDetector = useCallback(
		(locationText, type) => {
			const { countryId, id } =
				backUpLocations.find(({ fullGeoLocationTitle }) => locationText.includes(fullGeoLocationTitle)) || {};
			return {
				[`${type}CountryId`]: countryId || record[`${type}CountryId`],
				[`${type}LocationId`]: id || record[`${type}LocationId`],
			};
		},
		[backUpLocations, record],
	);
	const onChangeAutocomplete = async (locationTitle = "", _selected) => {
		if (locationTitle?.length <= 1) return;
		setAutocompleteLoading(true);
		const locations = await getLocationWithText(callApi, { locationTitle, pgn: 1, pgs: 10 });
		setAutoData(locations);
		setBackUpLocations((perArray) => perArray.concat(locations));
		setAutocompleteLoading(false);
	};
	// onSubmit
	const onSubmit = useCallback(
		async (formValues) => {
			setLoading(false);
			const { datePicker, from, to, fromLocationId, toLocationId, ...value } = formValues;
			let response = {};
			switch (!!(from && to)) {
				case true:
					response = await putRequestForCarrier(callApi, {
						langType: 10,
						requesterUserId: 0,
						timeZoneId: 0,
						imageId: 0,
						id: record.id,
						...locationIdDetector(fromLocationId, "from"),
						...locationIdDetector(toLocationId, "to"),
						from: dateToApi(from, jalali),
						to: dateToApi(to, jalali),
						...value,
					});
					break;
				case false:
					response = await putRequestForAnnonce(callApi, {
						langType: 10,
						carrierUserId: 0,
						timeZoneId: 0,
						matchStatusId: 0,
						id: record.id,
						...locationIdDetector(fromLocationId, "from"),
						...locationIdDetector(toLocationId, "to"),
						dateOfDeliver: dateToApi(datePicker, jalali),
						...value,
					});
					break;
				default:
					break;
			}
			if (response?.result) {
				handleCloseModals();
				getDataSource();
				notificationMaker(t("commons.success"), "success", t("messages.requestSuccess"));
			} else {
				notificationMaker(t("commons.error"), "error", t("messages.requestFailed"));
			}
			setLoading(false);
		},
		[record.id],
	);
	useEffect(() => {
		const {
			dateOfDeliver,
			fromDateValidOfDeliver,
			toDateValidOfDeliver,
			toCountryName,
			toCityName,
			fromCountryName,
			fromCityName,
			...other
		} = record;
		// init date
		const datePicker = dateOfDeliver ? dayjs(dateOfDeliver) : [dayjs(fromDateValidOfDeliver), dayjs(toDateValidOfDeliver)];
		// setFieldsValue
		form.setFieldsValue({
			datePicker,
			...other,
			fromLocationId: `${fromCountryName} ( ${fromCityName} )`,
			toLocationId: `${toCountryName} ( ${toCityName} )`,
		});
	}, [form, record]);
	return (
		<RequestContext.Provider
			value={{
				onChangeAutocomplete,
				enums,
				priceTypes,
				loading,
				jalali,
				record,
				autoData,
				autocompleteLoading,
			}}
		>
			<Form form={form} name="request-form" className="request-form" layout="vertical" onFinish={onSubmit}>
				{children}
			</Form>
		</RequestContext.Provider>
	);
}

export default RequestContextApi;
