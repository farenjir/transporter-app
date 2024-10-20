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
			title: t("tables.source"),
			dataIndex: "fromLocationName",
			key: "fromLocationName",
			render: (_, { fromLocationName, fromCountryName }) => `${fromCountryName} ( ${fromLocationName} )`,
		},
		{
			title: t("tables.destination"),
			dataIndex: "toLocationName",
			key: "toLocationName",
			render: (_, { toLocationName, toCountryName }) => `${toCountryName} ( ${toLocationName} )`,
		},
		{
			title: t("tables.createDate"),
			dataIndex: "registerDate",
			key: "registerDate",
			render: (registerDate) => <>{dateToLocale(registerDate)}</>,
		},
		// {
		// 	title: t("tables.weight"),
		// 	dataIndex: "weight",
		// 	key: "weight",
		// 	render: (_, { cargoWeightUnitIssueTitle, cargoWeight }) => `${cargoWeight} ( ${cargoWeightUnitIssueTitle} )`,
		// },
		// {
		// 	title: t("tables.items"),
		// 	dataIndex: "cargoItemNo",
		// 	key: "cargoItemNo",
		// 	width: 60,
		// },
		// {
		// 	title: t("tables.description"),
		// 	dataIndex: "cargoDesc",
		// 	key: "cargoDesc",
		// 	width: 200,
		// 	render: (_, record) => <span className="text-sm"> {t("home.cards.weightDes", record)}</span>,
		// },
		{
			title: t("tables.actions"),
			dataIndex: "actions",
			key: "actions",
			width: 150,
			render: (_, record) => (
				<div className="flex justify-center align-middle items-center">
					<Icons
						type="InfoCircleOutlined"
						classes="text-blue-500"
						title={t("commons.info")}
						onClick={() => handleModals("info", record)}
					/>
					<Icons
						type="EditOutlined"
						classes="text-orange-500 mx-4 md:mx-6"
						title={t("commons.edit")}
						onClick={() => handleModals("edit", record)}
					/>
					<Icons
						type="DeleteOutlined"
						classes="text-red-500"
						title={t("commons.delete")}
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
				size="small"
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
