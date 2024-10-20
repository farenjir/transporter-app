import { useContext, useEffect, useState } from "react";
import AppContext from "../context";

import { getCountUnReadMessageCount, postMessageAsRead } from "service/user";
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

export const useNewMessageCount = (callApi, { recordId, requestType, onlyUseHandle }) => {
	const [count, setCount] = useState(0);

	const handleMessageRead = () => {
		postMessageAsRead(callApi, {
			recordId,
			requestType: requestCommentType[requestType],
		});
		setCount(0);
	};

	useEffect(() => {
		const getCountUnReadMessage = async () => {
			const response = await getCountUnReadMessageCount(callApi, {
				recordId,
				requestType: requestCommentType[requestType],
			});
			response && Number.isInteger(response) && setCount(response);
		};
		!onlyUseHandle && getCountUnReadMessage();
	}, [recordId, onlyUseHandle]);

	return { count, handleMessageRead };
};
