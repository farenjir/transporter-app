import { createContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { baseCountriesSelector } from "store/selector";

import { useAppContext } from "hooks";
import { getAllLocationByCountry } from "service/user";

export const RequestContext = createContext({});

function RequestContextApi({ children }) {
	const [treeData, setTreeData] = useState([]);
	// hooks
	const { callApi } = useAppContext();
	const countries = useSelector(baseCountriesSelector);
	// handles
	const onLoadData = async ({ id }) => {
		const locations = await getAllLocationByCountry(callApi, 10, id);
		const updatedState = treeData.concat(locations);
		setTreeData(updatedState);
	};
	// init
	useEffect(() => {
		setTreeData(countries);
	}, [countries]);
	return <RequestContext.Provider value={{ onLoadData, treeData }}>{children}</RequestContext.Provider>;
}

export default RequestContextApi;
