import { Button, Form } from "antd";

const Buttons = ({
	loading = false,
	disabled = false,
	content,
	type = "primary",
	htmlType = "button",
	classes = "",
	formClasses = "",
	block,
	size = "large",
	onClick = () => {},
}) => {
	// return
	return (
		<Form.Item className={formClasses}>
			<Button
				size={size}
				block={block}
				loading={loading}
				type={type}
				htmlType={htmlType}
				onClick={onClick}
				disabled={disabled || loading}
				className={classes}
			>
				{content}
			</Button>
		</Form.Item>
	);
};

export default Buttons;
