import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import { useSelector } from "react-redux";
import { baseSelector } from "store/base";
import { useAppContext } from "hooks";
import { dateToLocale } from "utils/globals";

import { Drawers, ListModule } from "components";
import { AppCardGet, RequestDetails } from "components/App";

const { Title } = Typography;

export default function RequeuedGet({ list = [], pgn, totalElements, onChangePage, loading }) {
	const [selectRequest, setSelectRequest] = useState({});
	const [open, setOpen] = useState(false);
	const [drawerMode, setDrawerMode] = useState("details");
	// hooks
	const { t } = useTranslation();
	const { dePlacement } = useAppContext();
	const { enums } = useSelector(baseSelector);
	// modal handles
	const onClose = () => {
		setOpen(false);
	};
	const onOpen = () => {
		setOpen(true);
	};
	const onSelectRecord = useCallback(
		(selectedId, mode) => {
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
		<section className="producer-sections mx-auto p-5 mt-8 md:mx-12">
			<div className="producer-title md:text-center mb-5">
				<Title level={2}>{t("home.getAll")}</Title>
				<p className="my-1 text-slate-400 text-xs md:text-base">{t("search.topTitle")}</p>
			</div>
			<Drawers
				title={t("home.get")}
				open={open}
				onClose={onClose}
				placement={dePlacement}
				size="large"
				content={<RequestDetails selectRequest={selectRequest} mode={"get"} drawerMode={drawerMode} />}
			/>
			<ListModule
				key="get-req"
				loading={loading}
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
								onClickBtn={(mode) => onSelectRecord(id, mode)}
								imgUrl={"/assets/images/international-banner.webp"}
								{...{
									title: (
										<div className="flex flex-col gap-2">
											<span className="text-xl">
												{t("home.cards.sendTo", {
													fromCountryName,
													toCountryName,
													fromLocationName,
													toLocationName,
												})}
											</span>
											<span className="text-sm">
												{t("home.cards.dateTo", {
													to: dateToLocale(dateOfDeliver),
												})}
											</span>
											<span className="text-base">{t("home.cards.weight")}</span>
											<span className="text-sm">
												{t("home.cards.weightDes", {
													cargoWeight: cargoMaxWeightCapacity,
													cargoSize: cargoWeightUnitIssueId,
													cargoWeightUnitIssueTitle,
													cargoItemNo: cargoMaxWeightCapacity,
													cargoDesc: carrierDesc,
												})}
											</span>
											<span className="text-base">
												{t("home.cards.price", {
													price: priceIsNegotiable
														? t("home.cards.priceIsNegotiable")
														: proposedPrice.toLocaleString(),
													label: getPriceType(priceCurrencyTypeId),
												})}
											</span>
										</div>
									),
								}}
							/>
						),
					}),
				)}
			/>
		</section>
	);
}
