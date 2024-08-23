import React from "react";
import { Button, DatePicker, Flex, Slider, Form, Typography } from "antd";
import dayjs from "dayjs";

import i18next from "i18next";
import { useTranslation } from "react-i18next";

const MyDatePanel = (props) => {
	const { value, onSelect, onHover } = props;
	// Value
	const startDate = React.useMemo(() => dayjs(), []);
	const [innerValue, setInnerValue] = React.useState(value || startDate);
	React.useEffect(() => {
		if (value) {
			setInnerValue(value);
		}
	}, [value]);

	// Range
	const dateCount = React.useMemo(() => {
		const endDate = startDate.add(1, "year").add(-1, "day");
		return endDate.diff(startDate, "day");
	}, [startDate]);

	const sliderValue = Math.min(Math.max(0, innerValue.diff(startDate, "day")), dateCount);
	// Render
	return (
		<Flex
			vertical
			gap="small"
			style={{
				padding: 16,
			}}
		>
			<Typography.Title
				level={4}
				style={{
					margin: 0,
				}}
				title="no, it's not"
			>
				{startDate.add(sliderValue || 0, "day").format("YYYY/MM/DD")}
			</Typography.Title>
			<Slider
				min={0}
				max={dateCount}
				value={sliderValue}
				onChange={(nextValue) => {
					const nextDate = startDate.add(nextValue, "day");
					setInnerValue(nextDate);
					onHover?.(nextDate);
				}}
				tooltip={{
					formatter: (nextValue) => startDate.add(nextValue || 0, "day").format("YYYY/MM/DD"),
				}}
			/>
			<Button
				type="primary"
				onClick={() => {
					onSelect(innerValue);
				}}
			>{`Select Date`}</Button>
			<Button
				type="primary"
				onClick={() => {
					// onSelect(innerValue);
				}}
			>{`Change Calender Mode`}</Button>
		</Flex>
	);
};

const CalenderProgress = ({
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
	minDate = dayjs().locale(locale),
	onChange = (date, dateString) => {},
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
				onChange={onChange}
				components={{
					date: MyDatePanel,
				}}
			/>
		</Form.Item>
	);
};

export default CalenderProgress;
