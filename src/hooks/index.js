import { useContext, useEffect, useState } from "react";
import AppContext from "../context";

import { getCountUnReadMessageCount } from "service/user";
import { requestCommentType } from "utils/constance";

export const useAppContext = () => useContext(AppContext);

export const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return { width, height };
};

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
	useEffect(() => {
		const handleResize = () => setWindowDimensions(getWindowDimensions());
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return windowDimensions;
};

export const useNewMessageCount = (callApi, { recordId, requestType }) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const getCountUnReadMessage = async () => {
			const response = await getCountUnReadMessageCount(callApi, {
				recordId,
				requestType: requestCommentType[requestType],
			});
			response && Number.isInteger(response) && setCount(response);
		};
		getCountUnReadMessage();
	}, [recordId]);

	return { count };
};
