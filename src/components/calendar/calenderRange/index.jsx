import { useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import "./style.css";

import Calendars from "../index";
import CalenderProgress from "../calenderProgress";

const CalenderDateRange = ({
	extraClasses = "",
	initialValue,
	placement = "",
	size = "large",
	format = "YYYY/MM/DD",
	required = false,
	disabled = false,
	showHour = false,
	showMinute = false,
	showTime = false,
	showNow = true,
	allowClear = false,
	locale = i18next.language,
}) => {
	const [calenderMode, setCalenderMode] = useState("progress"); //  standard
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
	};
	return (
		<div className="flex flex-col md:flex-row gap-1">
			{calenderMode === "progress" ? (
				<>
					<CalenderProgress label={t("commons.from")} name="from" {...commons} />
					<CalenderProgress label={t("commons.to")} name="to" {...commons} />
				</>
			) : (
				<>
					<Calendars label={t("commons.from")} name="from" {...commons} />
					<Calendars label={t("commons.to")} name="to" {...commons} />
				</>
			)}
		</div>
	);
};

export default CalenderDateRange;
