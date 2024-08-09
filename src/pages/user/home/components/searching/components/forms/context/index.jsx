import { createContext, useCallback, useState } from "react";
import { Form } from "antd";

import { useSelector } from "react-redux";
import { useAppContext } from "hooks";
import { baseSelector } from "store/selector";

import { getLocationWithText } from "service/main";

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
		(locationText, type) => {
			const { locationTypeId } = backUpLocations.find(({ fullGeoLocationTitle }) => locationText.includes(fullGeoLocationTitle)) || {};
			// return { [`${type}CountryId`]: countryId, [`${type}LocationId`]: locationTypeId };
			return locationTypeId;
		},
		[backUpLocations],
	);
	const handleOnFinishForm = (formValues) => {
		const { requestType, datePicker, fromCountry, toCountry } = formValues;
		const queries = {
			fromDate: datePicker?.[0]?.toISOString() || datePicker?.toISOString?.(),
			toDate: datePicker?.[1]?.toISOString(),
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
				name="request-form"
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
