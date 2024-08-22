import { List } from "antd";

const ListModule = ({
	dataSource = [],
	itemLayout = "vertical",
	size = "default",
	classes = "",
	gutter = [16, 8],
	column = 3,
	pagination = false,
	loading = false,
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
			rowKey={(_, idx) => `list-${idx}`}
			renderItem={({ content }, idx) => <List.Item key={`list-item-${idx}`}>{content}</List.Item>}
		/>
	);
};
export default ListModule;
