import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import { useSelector } from "react-redux";
import { baseSelector } from "store/base";
import { authSelector } from "store/auth";

import { useAppContext } from "hooks";
import { dateToLocale } from "utils/globals";

import { Drawers, ListModule } from "components";
import { AppCard, RequestDetails } from "components/App";

const { Title } = Typography;

export default function RequeuedSend({ list = [], pgn = 1, totalElements, onChangePage = () => {}, loading = false }) {
	const [selectRequest, setSelectRequest] = useState({});
	const [open, setOpen] = useState(false);
	const [drawerMode, setDrawerMode] = useState("details");
	// hooks
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
				title={t("home.send")}
				open={open}
				onClose={onClose}
				placement={dePlacement}
				size="large"
				content={
					<RequestDetails
						selectRequest={selectRequest}
						mode={"send"}
						drawerMode={drawerMode}
						yourselfOrder={user?.id === Number(selectRequest?.requesterUserId)}
					/>
				}
			/>
			{/* SearchItems */}
			<ListModule
				key="send-req"
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
						fromCountryName,
						toCountryName,
						toLocationName,
						fromLocationName,
						priceCurrencyTypeId,
						priceIsNegotiable,
						proposedPrice,
						cargoWeightUnitIssueTitle,
						cargoSize,
						cargoWeight,
						cargoItemNo,
						cargoDesc,
						fromDateValidOfDeliver,
						toDateValidOfDeliver,
						requestLangaheTypeID,
						requesterUserId,
						requestType,
						registerDate,
						cargoWeightUnitIssueId,
						fromCountryId,
						toCountryId,
						fromLocationId,
						toLocationId,
						fromLocationDesc,
						toLocationDesc,
						imageId,
						timeZoneId,
						matchStatusId,
						chats,
					}) => ({
						key: id.toString(),
						content: (
							<AppCard
								key={id.toString()}
								id={id.toString()}
								onClickBtn={(mode) => onSelectRecord(id, mode)}
								yourselfOrder={user?.id === Number(requesterUserId)}
								imgUrl={"/assets/images/international-banner.webp"}
								title={
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
											{t("home.cards.dateFrom", {
												from: dateToLocale(fromDateValidOfDeliver),
											})}
										</span>
										<span className="text-sm">
											{t("home.cards.dateTo", {
												to: dateToLocale(toDateValidOfDeliver),
											})}
										</span>
										<span className="text-base">{t("home.cards.weight")}</span>
										<span className="text-sm">
											{t("home.cards.weightDes", {
												cargoWeight,
												cargoSize,
												cargoWeightUnitIssueTitle,
												cargoItemNo,
												cargoDesc,
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
								}
							/>
						),
					}),
				)}
			/>
		</section>
	);
}
