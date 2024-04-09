import "dayjs/locale/fa";
import locale from "antd/locale/fa_IR";
import dayjs from "dayjs";

import { DatePicker, Form } from "antd";
import { useTranslation } from "react-i18next";

import { dateToPersian } from "@/utils/globalHandlers";
import { Icons } from "@/components";

const Calendars = ({
	name = "datePicker",
	label = "",
	extraClasses = "",
	placement = "bottomLeft",
	initialValue = null, // "2015/02/08"
	required = false,
	disabled = false,
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
			label={
				<>
					<span>{label}</span>
					<Icons title={t("messages.typeDate")} classes="mx-2 icon-info" type="ExclamationCircleOutlined"/>
				</>
			}
			name={name}
			initialValue={dayjs(initDate, "YYYY-MM-DD").locale("fa")}
			rules={rules}
		>
			<DatePicker
				disabled={disabled}
				locale={locale}
				bordered={true}
				placement={placement}
				format={"YYYY-MM-DD"}
				allowClear={false}
			/>
		</Form.Item>
	);
};

export default Calendars;
