import { Icons, Tables } from "components";
import { dateToLocale } from "utils/globals";

// const dataIndexes = ["source", "destination", "date", "weight", "count", "description", "actions"];

const AppTable = ({
	queries: { pgs = 5, pgn = 1 },
	onChangeQueries,
	content,
	totalElements,
	totalPages,
	activeType,
	loading,
}) => {
	// handles
	const onChangeTable = ({ current, pageSize }) => {
		onChangeQueries({ pgn: current, pgs: pageSize });
	};
	// columns
	const columns = [
		{
			title: "مبدا",
			dataIndex: "fromLocationName",
			key: "fromLocationName",
			render: (_, { fromLocationName, fromCountryName }) =>
				`${fromCountryName} ( ${fromLocationName} )`,
		},
		{
			title: "مقصد",
			dataIndex: "toLocationName",
			key: "toLocationName",
			render: (_, { toLocationName, toCountryName }) => `${toCountryName} ( ${toLocationName} )`,
		},
		{
			title: "تاریخ ایجاد",
			dataIndex: "registerDate",
			key: "registerDate",
			width: 180,
			render: (registerDate) => <>{dateToLocale(registerDate)}</>,
		},
		{
			title: "وزن بار",
			dataIndex: "weight",
			key: "weight",
			width: 120,
			render: (_, { cargoWeightUnitIssueTitle, cargoWeight }) =>
				`${cargoWeight} ( ${cargoWeightUnitIssueTitle} )`,
		},
		{
			title: "تعداد",
			dataIndex: "cargoItemNo",
			key: "cargoItemNo",
			width: 60,
		},
		{
			title: "توضیحات",
			dataIndex: "cargoDesc",
			key: "cargoDesc",
			width: 200,
			render: (cargoDesc) => (
				<p className="truncate" style={{ width: 180 }}>
					{cargoDesc}
				</p>
			),
		},
		{
			title: "عملیات",
			dataIndex: "actions",
			key: "actions",
			width: 150,
			render: () => (
				<div className="flex justify-center align-middle items-center">
					<Icons
						type="InfoCircleOutlined"
						classes="text-blue-500"
						title="اطلاعات"
						onClick={() => {}}
					/>
					<Icons
						type="EditOutlined"
						classes="text-orange-500 mx-4 md:mx-6"
						title="ویرایش"
						onClick={() => {}}
					/>
					<Icons type="DeleteOutlined" classes="text-red-500" title="حذف" onClick={() => {}} />
				</div>
			),
		},
	];
	return (
		<Tables
			scroll={{ x: "100%" }}
			columns={columns}
			dataSource={content}
			bordered
			onChange={onChangeTable}
			loading={loading}
			pagination={{
				showSizeChanger: false,
				total: totalElements,
				pageSize: pgs,
				current: pgn,
			}}
		/>
	);
};
export default AppTable;
