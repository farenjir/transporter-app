import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";

import { uIdMaker } from "utils/globals";

const defaultOptions = {
	onChange: () => {},
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
	size: "default", //  "small",middle,"default"
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

const Tables = ({ dataSource = [], columns = [], onChange = () => {}, ...props }) => {
	const options = Object.assign({}, defaultOptions, props);
	// add search on column
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const searchInput = useRef(null);
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText("");
	};
	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: "block",
					}}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						size="small"
						style={{
							width: 120,
						}}
					>
						جستجو
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{
							width: 90,
						}}
					>
						بازنشانی
					</Button>
					{/* <Button
						type="link"
						size="small"
						onClick={() => {
							confirm({
								closeDropdown: false,
							});
							setSearchText(selectedKeys[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button> */}
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						انصراف
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? "#1677ff" : undefined,
				}}
			/>
		),
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
	});
	// initColumns
	const initColumns = columns.map(({ searchable, dataIndex, ...item }) => {
		const search = searchable ? { ...getColumnSearchProps(dataIndex) } : {};
		return {
			dataIndex,
			...item,
			...search,
		};
	});
	// return
	return (
		<Table
			{...{ dataSource, columns: initColumns, ...options }}
			onChange={onChange}
			rowKey={(record) => record?.row || uIdMaker(10)}
		/>
	);
};

export default Tables;
