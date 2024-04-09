import { List } from "antd";

const ListModule = ({
	dataSource = [],
	itemLayout = "vertical",
	size = "default",
	pageSize = 9,
	onChange = () => {},
	classes = "",
	gutter = [16, 8],
	column = 3,
	position = "bottom",
	align = "center",
}) => (
	<List
		itemLayout={itemLayout}
		size={size}
		dataSource={dataSource}
		className={classes}
		// footer
		// header
		grid={{
			gutter,
			column,
			xs: 1,
		}}
		pagination={{
			onChange,
			pageSize,
			position,
			align,
		}}
		rowKey={({ key }, idx) => `list-item${key || idx}`}
		renderItem={({ content, key }, idx) => <List.Item key={`list-item${key || idx}`}>{content}</List.Item>}
	/>
);
export default ListModule;
