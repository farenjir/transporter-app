import { useTranslation } from "react-i18next";
import { Form, Select } from "antd";

const defaultFilterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const Selects = ({
	label,
	name,
	required,
	mode = "",
	onChange = () => {},
	onClick = () => {},
	disabled = false,
	classes = "",
	initialValue = undefined,
	reference,
	value = undefined,
	formItemClassName,
	showSearch = false,
	optionFilterProp,
	filterOption = defaultFilterOption,
	onSelect,
	onSearch,
	options,
	size = "large",
	placeholder = "",
}) => {
	const { t } = useTranslation();

	return (
		<Form.Item
			labelCol={{ xs: 24 }}
			wrapperCol={{ xs: 24 }}
			name={name}
			label={label}
			rules={[
				{
					required: required,
					message: t("schemas.required"),
				},
			]}
			className={formItemClassName}
			initialValue={initialValue}
		>
			<Select
				size={size}
				getPopupContainer={(trigger) => trigger.parentNode}
				onChange={onChange}
				mode={mode}
				defaultValue={initialValue}
				className={`${classes} w-100`}
				disabled={disabled}
				onClick={onClick}
				ref={reference}
				value={value}
				onSelect={onSelect}
				placeholder={placeholder}
				showSearch={showSearch}
				optionFilterProp={optionFilterProp}
				filterOption={filterOption}
				onSearch={onSearch}
				autoComplete="dontshow"
				options={options}
			/>
		</Form.Item>
	);
};

export default Selects;
