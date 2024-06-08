import { useTranslation } from "react-i18next";

import { DatePicker, Form } from "antd";
import "./style.css";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/fa";

import { defaultValues, langConfigs } from "./utils";
import { getFromStorage } from "utils/storage";
import { LOCALE } from "utils/constance";

const lang = getFromStorage(LOCALE);

dayjs.locale(lang);
dayjs.extend(updateLocale);
dayjs.updateLocale(lang, langConfigs[lang] || {});

const { RangePicker } = DatePicker;

const defaultValue = dayjs(defaultValues[lang] || new Date(), "YYYY-MM-DD");

const CalenderDateRange = ({
	extraClasses = "",
	label = "",
	placement = "",
	name = "dateRange",
	size = "large",
	initialValue = defaultValue,
	required = false,
	allowClear = false,
	format = "YYYY/MM/DD",
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
			className={`${extraClasses}`}
			label={label}
			name={name}
			rules={rules}
			initialValue={initialValue}
		>
			<RangePicker
				className="w-full "
				maxTagCount="responsive"
				defaultValue={initialValue}
				{...{ placement, size, allowClear, format }}
			/>
		</Form.Item>
	);
};

export default CalenderDateRange;
