import { createContext, useCallback, useState } from "react";
import { Form } from "antd";

import { useSelector } from "react-redux";
import { useAppContext } from "hooks";
import { baseSelector } from "store/base";

import { getLocationWithText } from "service/main";
import { dateToApi } from "utils/globals";

export const SearchContext = createContext({});

function SearchContextApi({ children, loading, onFinish = () => {}, onReset = () => {} }) {
	const [backUpLocations, setBackUpLocations] = useState([]);
	const [autoData, setAutoData] = useState([]);
	const [autocompleteLoading, setAutocompleteLoading] = useState(false);
	// hooks
	const [form] = Form.useForm();
	const { jalali, callApi } = useAppContext();
	const { countries } = useSelector(baseSelector);
	// handles
	const onChangeAutocomplete = async (locationTitle = "", _selected) => {
		if (locationTitle?.length <= 1) return;
		setAutocompleteLoading(true);
		const locations = await getLocationWithText(callApi, { locationTitle, pgn: 1, pgs: 10 });
		setAutoData(locations);
		setBackUpLocations((perArray) => perArray.concat(locations));
		setAutocompleteLoading(false);
	};
	const locationIdDetector = useCallback(
		(locationText = "", _type) => {
			const { id } = backUpLocations.find(({ fullGeoLocationTitle }) => locationText?.includes?.(fullGeoLocationTitle)) || {};
			return id;
		},
		[backUpLocations],
	);
	const handleOnFinishForm = (formValues) => {
		const { requestType, from, to, fromCountry, toCountry } = formValues;
		const queries = {
			fromDate: dateToApi(from, jalali),
			toDate: dateToApi(to, jalali),
			fromCountry: locationIdDetector(fromCountry, "from"),
			toCountry: locationIdDetector(toCountry, "to"),
			requestType,
		};
		onFinish(queries);
	};
	// return
	return (
		<SearchContext.Provider value={{ loading, countries, jalali, autoData, autocompleteLoading, onChangeAutocomplete }}>
			<Form
				form={form}
				name="request-form-send"
				className="request-form"
				layout="vertical"
				onFinish={handleOnFinishForm}
				onReset={onReset}
			>
				{children}
			</Form>
		</SearchContext.Provider>
	);
}

export default SearchContextApi;
