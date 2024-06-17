import { useTranslation } from "react-i18next";

import { dateToLocale } from "utils/globals";

import { Icons, Tables } from "components";

const HistoryTable = ({
	queries: { pgs = 5, pgn = 1 },
	onChangeQueries,
	content,
	totalElements,
	loading,
	handleModals,
	totalPages,
	activeType,
}) => {
	// hooks
	const { t } = useTranslation();
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
			render: (_, record) => (
				<div className="flex justify-center align-middle items-center">
					<Icons
						type="InfoCircleOutlined"
						classes="text-blue-500"
						title="اطلاعات"
						onClick={() => handleModals("info", record)}
					/>
					<Icons
						type="EditOutlined"
						classes="text-orange-500 mx-4 md:mx-6"
						title="ویرایش"
						onClick={() => handleModals("edit", record)}
					/>
					<Icons
						type="DeleteOutlined"
						classes="text-red-500"
						title="حذف"
						onClick={() => handleModals("delete", record)}
					/>
				</div>
			),
		},
	];
	return (
		<>
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
		</>
	);
};
export default HistoryTable;
