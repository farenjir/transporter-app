import { Form, Radio } from "antd";
import { useTranslation } from "react-i18next";

const { Group } = Radio;

const RadioGroup = ({
	plainOptions = [], // label,value
	onChange = () => {},
	initialValue,
	classes = "",
	extraClasses = "",
	label = "",
	name = "",
	required = false,
	outForm = false,
	size = "middle",
	buttonStyle = "solid", // outline
	optionType = "default", // button
}) => {
	const { t } = useTranslation();
	// handles
	const handleOnChange = (e) => {
		onChange(e.target.value);
	};
	// options
	const rules = [
		{
			required: required,
			message: t("schemas.required"),
		},
	];
	// component
	const InnerJSX = () => (
		<Group
			size={size}
			name={name}
			optionType={optionType}
			onChange={handleOnChange}
			options={plainOptions}
			className={extraClasses}
			buttonStyle={buttonStyle}
			defaultValue={initialValue}
		/>
	);
	// return
	return (
		<>
			{outForm ? (
				<InnerJSX />
			) : (
				<Form.Item
					labelCol={{ xs: 24 }}
					wrapperCol={{ xs: 24 }}
					className={classes}
					label={label}
					name={name}
					initialValue={initialValue}
					rules={rules}
				>
					<InnerJSX />
				</Form.Item>
			)}
		</>
	);
};

export default RadioGroup;
