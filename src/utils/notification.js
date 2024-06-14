import { notification } from "antd";
import i18next from "i18next";

export const notificationMaker = (message, type = "error", description, duration = 4, closeIcon = true) => {
	notification.config({
		placement: "top",
		duration,
		rtl: i18next.language === "fa",
		closeIcon,
	});
	return notification[type]({
		message,
		description,
	});
};
