import { List } from "antd";

const ListModule = ({
	dataSource = [],
	itemLayout = "vertical",
	size = "default",
	classes = "",
	gutter = [16, 8],
	column = 3,
	pagination = {},
	loading
}) => {
	const paginationOptions = Object.assign(
		{},
		{
			onChange: () => {},
			pageSize: 4,
			position: "bottom",
			align: "center",
			current: 1,
		},
		pagination,
	);
	return (
		<List
			itemLayout={itemLayout}
			size={size}
			dataSource={dataSource}
			className={classes}
			loading={loading}
			grid={{
				gutter,
				column,
				xs: 1,
			}}
			// footer
			// header
			pagination={paginationOptions}
			rowKey={({ key }, idx) => `list-item${key || idx}`}
			renderItem={({ content, key }, idx) => (
				<List.Item key={`list-item${key || idx}`}>{content}</List.Item>
			)}
		/>
	);
};
export default ListModule;
