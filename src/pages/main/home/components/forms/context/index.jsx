import { createContext, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "antd";

import { useSelector } from "react-redux";
import { baseSelector } from "store/selector";

import { notificationMaker } from "utils/notification";
import { useAppContext } from "hooks";
import { getAllLocationByCountry } from "service/main";
import { postCarrierAnnonce, postRequestForCarrier } from "service/user";
import { dateToApi } from "utils/globals";

export const RequestContext = createContext({});

function RequestContextApi({ children }) {
	const [treeData, setTreeData] = useState([]);
	const [loading, setLoading] = useState(false);
	// hooks
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const { callApi, jalali } = useAppContext();
	const { countries, enums } = useSelector(baseSelector);
	// options
	const priceTypes = [
		{ label: "توافقی", value: true },
		{ label: "مقطوع", value: false },
	];
	// handles
	const locationIdDetector = useCallback(
		(locationId) => {
			const { countryId } = treeData.find(({ id }) => id === locationId) || {};
			return countryId ?? locationId;
		},
		[treeData],
	);
	// onSubmit
	const onLoadData = async ({ id }) => {
		const locations = await getAllLocationByCountry(callApi, 10, id);
		const updatedState = treeData.concat(locations);
		setTreeData(updatedState);
	};
	const onSubmit = useCallback(async (formValues) => {
		setLoading(false);
		const { requestType, dateRange, ...value } = formValues;
		let response = {};
		switch (requestType) {
			case "send":
				response = await postRequestForCarrier(callApi, {
					langType: 10,
					requesterUserId: 0,
					id: 0,
					timeZoneId: 0,
					imageId: 0,
					fromCountryId: locationIdDetector(value.fromLocationId),
					toCountryId: locationIdDetector(value.toLocationId),
					from: dateToApi(dateRange[0]),
					to: dateToApi(dateRange[1]),
					...value,
				});
				break;
			case "get":
				response = await postCarrierAnnonce(callApi, {
					langType: 10,
					requesterUserId: 0,
					id: 0,
					timeZoneId: 0,
					imageId: 0,
					fromCountryId: locationIdDetector(value.fromLocationId),
					toCountryId: locationIdDetector(value.toLocationId),
					from: dateToApi(dateRange[0]),
					to: dateToApi(dateRange[1]),
					...value,
				});
				break;
			default:
				break;
		}
		if (response?.result) {
			form.resetFields()
			notificationMaker(t("commons.success"), "success", t("messages.requestSuccess"));
		} else {
			notificationMaker(t("commons.error"), "error", t("messages.requestFailed"));
		}
		setLoading(false);
	}, []);
	// init
	useEffect(() => {
		setTreeData(countries);
	}, [countries]);
	return (
		<RequestContext.Provider value={{ onLoadData, treeData, enums, priceTypes, loading, jalali }}>
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
