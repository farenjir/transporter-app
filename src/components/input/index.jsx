import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

const Inputs = ({
	type,
	label = "",
	name = "",
	classes = "",
	extraClasses = "",
	onChange = () => {},
	value,
	required,
	pattern,
	patternMessage,
	initialValue,
	placeholder,
	disabled,
	min,
	max,
	maxLength,
	minLength,
	prefix,
	size = "large",
	addonBefore,
	addonAfter,
	autoComplete,
}) => {
	const { t } = useTranslation();
	const rules = [
		{
			required: required,
			message: t("schemas.required"),
		},
		{
			pattern,
			message: patternMessage,
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
			<Input
				name={name}
				type={type}
				placeholder={placeholder}
				className={classes}
				onChange={onChange}
				value={value}
				defaultValue={initialValue}
				disabled={disabled}
				prefix={prefix}
				addonBefore={addonBefore}
				addonAfter={addonAfter}
				autoComplete={autoComplete}
				size={size}
				min={min}
				max={max}
				maxLength={maxLength}
				minLength={minLength}
			/>
		</Form.Item>
	);
};

export default Inputs;
