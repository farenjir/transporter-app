import { createContext, useCallback, useEffect, useState } from "react";
import { Form } from "antd";

import { useSelector } from "react-redux";
import { baseCountriesSelector } from "store/selector";

import { useAppContext } from "hooks";
import { getAllLocationByCountry, postRequestForCarrier } from "service/user";

export const RequestContext = createContext({});

function RequestContextApi({ children }) {
	const [treeData, setTreeData] = useState([]);
	// hooks
	const [form] = Form.useForm();
	const { callApi } = useAppContext();
	const countries = useSelector(baseCountriesSelector);
	// handles
	const locationIdDetector = useCallback(
		(locationId) => {
			const { countryId } = treeData.find(({ id }) => id === locationId);
			return countryId;
		},
		[treeData],
	);
	// onSubmit
	const onLoadData = async ({ id }) => {
		const locations = await getAllLocationByCountry(callApi, 10, id);
		const updatedState = treeData.concat(locations);
		setTreeData(updatedState);
	};
	const onSubmit = async (formValues) => {
		const { requestType, dateRange, ...value } = formValues;
		const dataModel = {
			langType: 10,
			requesterUserId: 0,
			id: 0,
			timeZoneId: "",
			fromCountryId: locationIdDetector(value.fromLocationId),
			toCountryId: locationIdDetector(value.toLocationId),
			from: dateRange[0],
			to: dateRange[1],
			...value,
		};
		const response = await postRequestForCarrier(callApi, dataModel);
		console.log({ dataModel, response });
	};
	// init
	useEffect(() => {
		setTreeData(countries);
	}, [countries]);
	return (
		<RequestContext.Provider value={{ onLoadData, treeData }}>
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
