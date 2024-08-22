import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import { useSelector } from "react-redux";
import { baseSelector } from "store/base";
import { useAppContext } from "hooks";
import { dateToLocale } from "utils/globals";

import { CarouselModule, Drawers } from "components";
import { AppCardGet, RequestDetails } from "components/App";

const { Title } = Typography;

export default function RequeuedGet({ list = [] }) {
	const [requestGroups, setRequestGroups] = useState([]);
	const [selectRequest, setSelectRequest] = useState({});
	const [loading, setLoading] = useState(true);
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
	// init
	useEffect(() => {
		const getAllProducers = () => {
			setLoading(true);
			const cardGroups = [list.slice(0, 3), list.slice(3, 6), list.slice(6, 9)].filter((item) => item?.length);
			setRequestGroups(cardGroups);
			setLoading(false);
		};
		getAllProducers();
	}, [list]);
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
			<CarouselModule
				name="get-request"
				className="pb-10 pt-5 min-h-[350px]"
				loading={loading}
				swiperSliders={requestGroups.map((cardGroups = [], idx) => (
					<div key={`cardGroups-${idx}`}>
						<section className="send-sections flex flex-col md:flex-row justify-around gap-4 lg:gap:8">
							{cardGroups.map(
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
								}) => (
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
							)}
						</section>
					</div>
				))}
			/>
		</section>
	);
}
