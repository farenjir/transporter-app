import { notification } from "antd";
import { getFromStorage } from "./storage";

const isPersian = getFromStorage("language") !== "en";

export const notificationMaker = (message, type = "error", description, duration = 4, closeIcon = true) => {
	notification.config({
		placement: "bottomLeft",
		duration,
		rtl: isPersian,
		closeIcon,
	});
	return notification[type]({
		message,
		description,
	});
};
