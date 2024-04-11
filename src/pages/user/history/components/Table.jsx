import { useRef, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";

import { Icons } from "components";

const dataIndexes = ["source", "destination", "date", "weight", "count", "description", "actions"];
const data = Array(92)
	.fill(null)
	.map((_, idx) => {
		const record = { key: idx.toString() };
		dataIndexes.forEach((dataIndex) => (record[dataIndex] = dataIndex));
		return record;
	});
const AppTable = () => {
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
					// placeholder={`جست و جو`}
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
						جست و جو
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

	const columns = [
		{
			title: "مبدا",
			dataIndex: "source",
			key: "source",
			...getColumnSearchProps("source"),
		},
		{
			title: "مقصد",
			dataIndex: "destination",
			key: "destination",
			...getColumnSearchProps("destination"),
		},
		{
			title: "تاریخ",
			dataIndex: "date",
			key: "date",
			...getColumnSearchProps("date"),
		},
		{
			title: "وزن بار",
			dataIndex: "weight",
			key: "weight",
			...getColumnSearchProps("weight"),
		},
		{
			title: "تعداد",
			dataIndex: "count",
			key: "count",
			...getColumnSearchProps("count"),
		},
		{
			title: "توضیحات",
			dataIndex: "description",
			key: "description",
			...getColumnSearchProps("description"),
		},
		{
			title: "عملیات",
			dataIndex: "actions",
			key: "actions",
			render: () => (
				<div className="flex justify-around align-middle items-center">
					<Icons type="InfoCircleOutlined" classes="text-blue-500" title="اطلاعات" onClick={() => {}} />
					<Icons type="EditOutlined" classes="text-orange-500" title="ویرایش" onClick={() => {}} />
					<Icons type="DeleteOutlined" classes="text-red-500" title="حذف" onClick={() => {}} />
				</div>
			),
		},
	];
	return (
		<Table
			scroll={{ x: "100%" }}
			columns={columns}
			dataSource={data}
			bordered
			pagination={{
				showSizeChanger: false,
				pageSize: 5,
			}}
		/>
	);
};
export default AppTable;
