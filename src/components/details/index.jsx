import { Descriptions } from "antd";
// items [] of { key, label, children, span }
const Details = ({
	title = "",
	classes = "",
	column = 3,
	bordered = true,
	items = [],
	layout,
	size = "default",
	contentStyle,
	labelStyle,
}) => {
	return (
		<>
			<Descriptions
				title={title}
				items={items}
				layout={layout}
				size={size}
				column={column}
				className={classes}
				{...{ bordered, contentStyle, labelStyle }}
			/>
		</>
	);
};
export default Details;
