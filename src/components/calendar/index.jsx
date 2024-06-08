import dayjs from "dayjs";

import { DatePicker, Form } from "antd";
import { useTranslation } from "react-i18next";

import { getFromStorage } from "utils/storage";
import { LOCALE } from "utils/constance";

import { defaultValues } from "./calenderRange/utils";

const lang = getFromStorage(LOCALE);

const defaultValue = dayjs(defaultValues[lang] || new Date(), "YYYY-MM-DD");

const Calendars = ({
	name = "datePicker",
	label = "",
	extraClasses = "",
	initialValue = defaultValue,
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
}) => {
	const { t } = useTranslation();
	const rules = [
		{
			type: "object",
			required: required,
			message: t("schemas.required"),
		},
	];
	// return
	return (
		<Form.Item
			labelCol={{ xs: 24 }}
			wrapperCol={{ xs: 24 }}
			className={`${extraClasses}`}
			label={label}
			name={name}
			initialValue={initialValue}
			rules={rules}
		>
			<DatePicker
				className="w-full"
				maxTagCount="responsive"
				defaultValue={initialValue}
				{...{ format, disabled, size, placement }}
				{...{ allowClear, showNow, showTime, showHour, showMinute }}
			/>
		</Form.Item>
	);
};

export default Calendars;
