import { AutoComplete, Form } from "antd";
import { useTranslation } from "react-i18next";

const AutocompletePublic = ({
	options = [],
	label = "",
	name = "",
	placeholder = "",
	classes = "",
	extraClasses = "",
	value = undefined,
	initialValue = undefined,
	required = false,
	pattern = "",
	patternMessage = "",
	size = "large",
	onSelect = () => {},
	onChange = () => {},
	onSearch = () => {},
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
			<AutoComplete
				size={size}
				value={value}
				options={options}
				className={classes}
				placeholder={placeholder}
				onSelect={onSelect}
				onSearch={onSearch}
				onChange={onChange}
			/>
		</Form.Item>
	);
};
export default AutocompletePublic;
