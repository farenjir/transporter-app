import dayjs from "dayjs";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import { DatePicker, Form } from "antd";
import "./style.css";

const { RangePicker } = DatePicker;

const CalenderDateRange = ({
	extraClasses = "",
	label = "",
	placement = "",
	name = "datePicker",
	size = "large",
	initialValue,
	required = false,
	allowClear = false,
	format = "YYYY/MM/DD",
	locale = i18next.language,
	jalali,
}) => {
	const { t } = useTranslation();
	const rules = [
		{
			required: required,
			message: t("schemas.required"),
		},
	];
	const defaultValue = dayjs(dayjs().locale(locale).format(), { jalali });
	return (
		<Form.Item
			labelCol={{ xs: 24 }}
			wrapperCol={{ xs: 24 }}
			className={`${extraClasses}`}
			label={label}
			name={name}
			rules={rules}
			initialValue={initialValue ?? defaultValue}
		>
			<RangePicker
				className="w-full"
				maxTagCount="responsive"
				defaultValue={initialValue ?? defaultValue}
				{...{ placement, size, allowClear, format }}
			/>
		</Form.Item>
	);
};

export default CalenderDateRange;
