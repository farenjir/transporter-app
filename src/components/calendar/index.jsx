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
	format = "YYYY/MM/DD",
	required = false,
	disabled = false,
	showHour = false,
	showMinute = false,
	showTime = false,
	showNow = true,
	allowClear = false,
	locale = i18next.language,
	minDate = dayjs().locale(locale),
}) => {
	const { t } = useTranslation();
	const rules = [
		{
			required: required,
			message: t("schemas.required"),
		},
	];
	// return
	return (
		<Form.Item
			labelCol={{ xs: 24 }}
			wrapperCol={{ xs: 24 }}
			className={`${extraClasses} w-full`}
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
				{...{ allowClear, showNow, showTime, showHour, showMinute, minDate }}
			/>
		</Form.Item>
	);
};

export default Calendars;
