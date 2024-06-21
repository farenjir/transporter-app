import { createContext, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "antd";

import { useSelector } from "react-redux";
import { baseSelector } from "store/selector";

import { notificationMaker } from "utils/notification";
import { dateToApi } from "utils/globals";

import { useAppContext } from "hooks";
import { postCarrierAnnonce, postRequestForCarrier, getLocationWithText } from "service/main";

export const RequestContext = createContext({});

function RequestContextApi({ children }) {
	const [autoData, setAutoData] = useState([]);
	const [backUpLocations, setBackUpLocations] = useState([]);
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
			const { countryId, locationTypeId } =
				backUpLocations.find(({ fullGeoLocationTitle }) =>
					locationText.includes(fullGeoLocationTitle),
				) || {};
			return { [`${type}CountryId`]: countryId, [`${type}LocationId`]: locationTypeId };
		},
		[backUpLocations],
	);
	// onSubmit
	const onChange = async (locationTitle = "", _selected) => {
		if (locationTitle?.length <= 2) return;
		const locations = await getLocationWithText(callApi, { locationTitle, pgn: 1, pgs: 10 });
		setAutoData(locations);
		setBackUpLocations((perArray) => perArray.concat(locations));
	};
	const onSubmit = async (formValues) => {
		setLoading(false);
		const { datePicker, fromLocationId, toLocationId, ...value } = formValues;
		let response = {};
		switch (Array.isArray(datePicker)) {
			case true:
				response = await postRequestForCarrier(callApi, {
					langType: 10,
					requesterUserId: 0,
					id: 0,
					timeZoneId: 0,
					imageId: 0,
					from: dateToApi(datePicker[0]),
					to: dateToApi(datePicker[1]),
					...locationIdDetector(fromLocationId, "from"),
					...locationIdDetector(toLocationId, "to"),
					...value,
				});
				break;
			case false:
				response = await postCarrierAnnonce(callApi, {
					langType: 10,
					carrierUserId: 0,
					id: 0,
					timeZoneId: 0,
					matchStatusId: 0,
					dateOfDeliver: dateToApi(datePicker),
					...locationIdDetector(fromLocationId, "from"),
					...locationIdDetector(toLocationId, "to"),
					...value,
				});
				break;
			default:
				break;
		}
		if (response?.result) {
			form.resetFields();
			notificationMaker(t("commons.success"), "success", t("messages.requestSuccess"));
		} else {
			notificationMaker(t("commons.error"), "error", t("messages.requestFailed"));
		}
		setLoading(false);
	};
	return (
		<RequestContext.Provider value={{ onChange, autoData, enums, priceTypes, loading, jalali }}>
			<Form
				form={form}
				name="request-form"
				className="request-form"
				layout="vertical"
				onFinish={onSubmit}
			>
				{children}
			</Form>
		</RequestContext.Provider>
	);
}

export default RequestContextApi;
