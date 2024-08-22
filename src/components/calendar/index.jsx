import dayjs from "dayjs";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import { DatePicker, Form } from "antd";

const Calendars = ({
	name = "datePicker",
	label = "",
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
	minDate = dayjs().locale(locale),
}) => {
	const { t } = useTranslation();
	const rules = [
		{
			required: required,
			message: t("schemas.required"),
		},
	];
	const today = dayjs().locale(locale).format();
	const defaultValue = dayjs(today, { jalali });
	// return
	return (
		<Form.Item
			labelCol={{ xs: 24 }}
			wrapperCol={{ xs: 24 }}
			className={`${extraClasses}`}
			label={label}
			name={name}
			initialValue={initialValue || defaultValue}
			rules={rules}
		>
			<DatePicker
				className="w-full"
				maxTagCount="responsive"
				defaultValue={initialValue || defaultValue}
				{...{ format, disabled, size, placement }}
				{...{ allowClear, showNow, showTime, showHour, showMinute, minDate }}
			/>
		</Form.Item>
	);
};

export default Calendars;
