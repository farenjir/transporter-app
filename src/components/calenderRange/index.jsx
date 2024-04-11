import "dayjs/locale/fa";
import locale from "antd/locale/fa_IR";

import { DatePicker, Form } from "antd";
import { useTranslation } from "react-i18next";

const CalenderDateRange = ({
	required = false,
	initialValue = null,
	extraClasses = "",
	label = "",
	name = "dateRange",
	placement = "bottomLeft",
	size = "large",
}) => {
	const { t } = useTranslation();
	const rules = [
		{
			required: required,
			message: t("schemas.required"),
		},
	];
	return (
		<Form.Item
			labelCol={{ xs: 24 }}
			wrapperCol={{ xs: 24 }}
			className={extraClasses}
			label={label}
			name={name}
			initialValue={initialValue}
			rules={rules}
		>
			<DatePicker.RangePicker
				className="w-full"
				placement={placement}
				locale={locale}
				size={size}
			/>
		</Form.Item>
	);
};

export default CalenderDateRange;
