import "dayjs/locale/fa";
import locale from "antd/locale/fa_IR";
import dayjs from "dayjs";

import { DatePicker, Form } from "antd";
import { useTranslation } from "react-i18next";

import { dateToPersian } from "utils/globals";
import { Icons } from "components";

const Calendars = ({
	name = "datePicker",
	label = "",
	extraClasses = "",
	placement = "bottomLeft",
	initialValue = null, // "2015/02/08"
	required = false,
	disabled = false,
	size = "large",
}) => {
	const { t } = useTranslation();
	let initDate = dateToPersian(initialValue || new Date());
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
			// initialValue={dayjs(initDate, "YYYY-MM-DD").locale("fa")}
			rules={rules}
		>
			<DatePicker
				className="w-full"
				placement={placement}
				locale={locale}
				size={size}
				// disabled={disabled}
				// locale={locale}
				// placement={placement}
				// format={"YYYY-MM-DD"}
				// allowClear={false}
			/>
		</Form.Item>
	);
};

export default Calendars;
