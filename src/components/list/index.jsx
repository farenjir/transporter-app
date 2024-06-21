import { List } from "antd";

const ListModule = ({
	dataSource = [],
	itemLayout = "vertical",
	size = "default",
	classes = "",
	gutter = [16, 8],
	column = 3,
	pagination = false,
	loading,
}) => {
	const paginationOptions = Object.assign(
		{},
		{
			onChange: () => {},
			pageSize: 4,
			position: "bottom",
			align: "center",
			current: 1,
			hideOnSinglePage: true,
		},
		pagination || {},
	);
	return (
		<List
			itemLayout={itemLayout}
			size={size}
			dataSource={dataSource}
			className={classes}
			loading={{ spinning: loading, size: "large" }}
			grid={{
				gutter,
				column,
				xs: 1,
			}}
			// footer
			// header
			pagination={pagination && paginationOptions}
			rowKey={({ key }, idx) => `list-item${key || idx}`}
			renderItem={({ content, key }, idx) => (
				<List.Item key={`list-item${key || idx}`}>{content}</List.Item>
			)}
		/>
	);
};
export default ListModule;
