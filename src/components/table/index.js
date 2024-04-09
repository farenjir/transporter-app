import { Table } from "antd";
import { uIdMaker } from "@/utils/jsHandlers";
import useSearch from "@/hooks/useSearch";

const defaultOptions = {
	onChange: () => { },
	loading: false,
	// options
	scroll: undefined, // {x: 0, y: 0}
	expandable: false,
	hasData: true,
	showHeader: true,
	footer: false,
	rowSelection: false,
	hideSelectAll: false,
	title: undefined,
	tableLayout: undefined,
	bordered: true,
	showSorterTooltip: false,
	size: "small", //  "small",middle,"default"
	top: "none",
	bottom: "bottomLeft",
	className: "",
	pagination: { showSizeChanger: false },
	// pagination={{
	//   onChange: (nextPage) => onPageChange(nextPage),
	//   total: props.totalItems,
	//   current: props.pageNo,
	//   pageSize: 10,
	//   showSizeChanger: false,
	// }},
	// onRow:{(record, rowIndex) => {
	//     return {
	//       onClick: (event) => {}, // click row
	//       onDoubleClick: (event) => {}, // double click row
	//       onContextMenu: (event) => {}, // right button click row
	//       onMouseEnter: (event) => {}, // mouse enter row
	//       onMouseLeave: (event) => {}, // mouse leave row
	//     };
	// }}
};

const Tables = ({ dataSource = [], columns = [], ...props }) => {
	const options = Object.assign({}, defaultOptions, props);
	// add search on column
	const { getColumnSearchProps } = useSearch();
	const initColumns = columns.map(({ searchable, dataIndex, ...item }) => {
		const search = searchable ? { ...getColumnSearchProps(dataIndex) } : {};
		return {
			dataIndex,
			...item,
			...search,
		};
	});
	// return
	return <Table {...{ dataSource, columns: initColumns, ...options }} rowKey={(record) => record?.row || uIdMaker(10)} />;
};

export default Tables;
