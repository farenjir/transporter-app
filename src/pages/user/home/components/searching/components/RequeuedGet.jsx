import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { baseSelector } from "store/base";
import { authSelector } from "store/auth";

import { useAppContext } from "hooks";

import { Drawers, ListModule } from "components";
import { AppCardGet, RequestDetails } from "components/App";

const { Title } = Typography;

export default function RequeuedGet({ list = [], pgn, totalElements, onChangePage, loading }) {
	const [selectRequest, setSelectRequest] = useState({});
	const [open, setOpen] = useState(false);
	const [drawerMode, setDrawerMode] = useState("details");
	// hooks
	let navigate = useNavigate();
	const { t } = useTranslation();
	const { dePlacement } = useAppContext();
	const { enums } = useSelector(baseSelector);
	const { user } = useSelector(authSelector);
	// modal handles
	const onClose = () => {
		setOpen(false);
	};
	const onOpen = () => {
		setOpen(true);
	};
	const onSelectRecord = useCallback(
		(selectedId, mode, yourselfOrder) => {
			if (yourselfOrder) {
				return navigate("/user/history/send");
			}
			const record = list.find(({ id }) => id === selectedId) || {};
			setDrawerMode(mode);
			setSelectRequest(record);
			onOpen();
		},
		[list],
	);
	// handles
	const getPriceType = (priceCurrencyTypeId) => {
		return enums?.["105"]?.find(({ id }) => id === priceCurrencyTypeId)?.label ?? "";
	};
	return (
		<section className="producer-sections mx-auto p-5 mt-8 md:mx-5">
			<div className="producer-title md:text-center mb-5">
				<Title level={2}>{t("home.sendAll")}</Title>
				<p className="my-1 text-slate-400 text-xs md:text-base">{t("search.topTitle")}</p>
			</div>
			<Drawers
				title={t("home.send")}
				open={open}
				onClose={onClose}
				placement={dePlacement}
				size="large"
				content={
					<RequestDetails
						selectRequest={selectRequest}
						mode={"get"}
						drawerMode={drawerMode}
						yourselfOrder={user?.id === Number(selectRequest?.carrierUserId)}
					/>
				}
			/>
			<ListModule
				key="get-req"
				loading={loading}
				column={1}
				pagination={{
					showSizeChanger: false,
					pageSize: 9,
					current: pgn,
					onChange: onChangePage,
					total: totalElements,
				}}
				gutter={[16, 16]}
				dataSource={list.map(
					({
						id,
						priceIsNegotiable,
						proposedPrice,
						priceCurrencyTypeId,
						fromCountryName,
						toCountryName,
						toLocationName,
						fromLocationName,
						cargoWeightUnitIssueTitle,
						dateOfDeliver,
						requestLangaheTypeID,
						carrierUserId,
						requestType,
						registerDate,
						carrierDesc,
						cargoMaxSizeCapacity,
						cargoMaxWeightCapacity,
						cargoWeightUnitIssueId,
						fromCountryId,
						toCountryId,
						fromLocationId,
						toLocationId,
						fromLocationDesc,
						toLocationDesc,
						timeZoneId,
						matchStatusId,
						chats,
						isArchived,
						fromFullGeoLocationTitle,
						toFullGeoLocationTitle,
						fromLocationTypeId,
						toLocationTypeId,
						fromCityName,
						toCityNam,
					}) => ({
						key: id.toString(),
						content: (
							<AppCardGet
								key={id.toString()}
								id={id.toString()}
								mode={"get"}
								onClickBtn={(mode, yourselfOrder) => onSelectRecord(id, mode, yourselfOrder)}
								imgUrl={"/assets/images/international-banner.webp"}
								yourselfOrder={user?.id === Number(carrierUserId)}
								{...{
									dateOfDeliver,
									priceIsNegotiable,
									proposedPrice,
									priceLabel: getPriceType(priceCurrencyTypeId),
									cargoWeight: cargoMaxWeightCapacity,
									cargoSize: cargoWeightUnitIssueId,
									cargoWeightUnitIssueTitle,
									cargoItemNo: cargoMaxWeightCapacity,
									cargoDesc: carrierDesc,
									fromCountryName,
									toCountryName,
									fromLocationName,
									toLocationName,
									carrierUserId,
								}}
							/>
						),
					}),
				)}
			/>
		</section>
	);
}
