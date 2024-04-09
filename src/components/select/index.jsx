import { useTranslation } from "react-i18next";
import { Form, Select } from "antd";

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
	filterOption,
	optionClassName,
	onSelect,
	onSearch,
	nameKey,
	options,
	size = "large",
	placeholder = "",
}) => {
	const { t } = useTranslation();
	return (
		<>
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
					showSearch={showSearch}
					optionFilterProp={optionFilterProp}
					filterOption={filterOption}
					onSelect={onSelect}
					autoComplete="dontshow"
					onSearch={onSearch}
					placeholder={placeholder}
				>
					{options &&
						options.map((item) => {
							return (
								<Select.Option value={item.id} key={item.id} className={optionClassName}>
									{nameKey ? item[nameKey] : item.name}
								</Select.Option>
							);
						})}
				</Select>
			</Form.Item>
		</>
	);
};

export default Selects;
