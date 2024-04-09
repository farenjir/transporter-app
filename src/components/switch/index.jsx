import { Form, Switch } from "antd";
import { useTranslation } from "react-i18next";

const Switches = ({
	label = "",
	name = "",
	className = "",
	checkedChildren = "",
	unCheckedChildren = "",
	defaultChecked = false,
	disabled = false,
	onChange = () => {},
	...props
}) => {
	// hooks
	const { t } = useTranslation();
	// constants
	const rules = [
		{
			required: true,
			message: t("schemas.required"),
		},
	];
	// return
	return (
		<Form.Item
			labelCol={{ xs: 24 }}
			wrapperCol={{ xs: 24 }}
			name={name}
			label={label}
			valuePropName="checked"
			initialValue={defaultChecked}
			rules={rules}
		>
			<Switch
				{...{ checkedChildren, unCheckedChildren, defaultChecked, disabled, onChange, className }}
				{...props}
			/>
		</Form.Item>
	);
};

export default Switches;
