import i18next from "i18next";
import { useTranslation } from "react-i18next";

import "./style.css";
import { Calendars } from "components";

const CalenderDateRange = ({
	extraClasses = "",
	initialValue,
	placement = "",
	size = "large",
	format = "YYYY/MM/DD - hh:mm",
	required = false,
	disabled = false,
	showHour = true,
	showMinute = true,
	showTime = true,
	showNow = false,
	allowClear = false,
	locale = i18next.language,
	jalali,
}) => {
	const { t } = useTranslation();
	const commons = {
		extraClasses,
		initialValue,
		placement,
		size,
		format,
		required,
		disabled,
		showHour,
		showMinute,
		showTime,
		showNow,
		allowClear,
		locale,
		jalali,
	};
	return (
		<div className="flex gap-1">
			<Calendars label={t("commons.from")} name="from" {...commons} />
			<Calendars label={t("commons.to")} name="to" {...commons} />
		</div>
	);
};

export default CalenderDateRange;
