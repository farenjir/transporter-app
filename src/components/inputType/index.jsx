import { Form, Input, InputNumber } from "antd";
import { useTranslation } from "react-i18next";

const InputType = ({
	type = "number",
	label = "",
	name = "",
	classes = "",
	extraClasses = "",
	onChange = () => {},
	required,
	initialValue = undefined,
	placeholder = "",
	disabled,
	visibilityToggle,
	formatter,
	size,
	min,
	max,
	style = {},
	autoSize = false,
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
			{type === "number" ? (
				<InputNumber
					disabled={disabled}
					onChange={onChange}
					className={`${classes} w-96`}
					formatter={formatter}
					size={`${size || `large`}`}
					min={min}
					max={max}
					style={style}
					autoComplete="off"
					defaultValue={initialValue}
				/>
			) : type === "password" ? (
				<Input.Password
					type={"password"}
					placeholder={placeholder}
					className={classes}
					autoComplete="off"
					disabled={disabled}
					visibilityToggle={visibilityToggle}
					// iconRender={(visible) =>
					//   visible ? (
					//     <FontAwesomeIcon icon={iconTransformer("eye")} />
					//   ) : (
					//     <FontAwesomeIcon icon={iconTransformer("eye-slash")} />
					//   )
					// }
				/>
			) : type === "textarea" ? (
				<Input.TextArea
					className={classes}
					autoComplete="off"
					placeholder={placeholder}
					disabled={disabled}
					autoSize={autoSize}
				/>
			) : null}
		</Form.Item>
	);
};

export default InputType;
