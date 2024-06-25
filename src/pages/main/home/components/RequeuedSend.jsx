import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { baseSelector } from "store/selector";
import { useAppContext } from "hooks";
import { dateToLocale } from "utils/globals";

import { getRequestForCarrier } from "service/main";

import { Buttons, CarouselModule, Drawers } from "components";
import { AppCard, RequestDetails } from "components/App";

const { Title } = Typography;

export default function RequeuedSend() {
	const [requests, setRequests] = useState([]);
	const [requestGroups, setRequestGroups] = useState([]);
	const [selectRequest, setSelectRequest] = useState({});
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	// hooks
	const { t } = useTranslation();
	const { callApi, dePlacement } = useAppContext();
	const { enums } = useSelector(baseSelector);
	// modal handles
	const onClose = () => {
		setOpen(false);
	};
	const onOpen = () => {
		setOpen(true);
	};
	const onSelectRecord = useCallback(
		(selectedId) => {
			const record = requests.find(({ id }) => id === selectedId) || {};
			setSelectRequest(record);
			onOpen();
		},
		[requests],
	);
	// handles
	const getPriceType = (priceCurrencyTypeId) => {
		return enums?.["105"]?.find(({ id }) => id === priceCurrencyTypeId)?.label ?? "";
	};
	// init
	useEffect(() => {
		const getAllProducers = async () => {
			setLoading(true);
			const { content } = await getRequestForCarrier(callApi, { pgs: 9, pgn: 1 });
			const cardGroups = [content.slice(0, 3), content.slice(3, 6), content.slice(6, 9)].filter(
				(item) => item?.length,
			);
			setRequests(content);
			setRequestGroups(cardGroups);
			setLoading(false);
		};
		getAllProducers();
	}, [callApi]);
	return (
		<section className="producer-sections mx-auto p-5 mt-8 md:mx-12">
			<div className="producer-title md:text-center">
				<Title level={2}>{t("home.sendAll")}</Title>
				<p className="my-1 text-slate-400 text-xs md:text-base">{t("search.topTitle")}</p>
			</div>
			<Buttons
				content={
					<Link to={"/request"} state={"send"} className="text-white">
						<div className="flex gap-2 align-middle items-center">
							<span className="p-1"> {t("commons.viewAll")}</span>
							<DoubleLeftOutlined />
						</div>
					</Link>
				}
				type="dashed"
				htmlType="button"
				size="default"
				classes="text-sm float-left mt-3"
			/>
			<Drawers
				title={t("home.send")}
				open={open}
				onClose={onClose}
				placement={dePlacement}
				content={<RequestDetails selectRequest={selectRequest} mode={"send"} />}
				size="large"
			/>
			<CarouselModule
				name="send-request"
				loading={loading}
				className="pb-10 pt-5 px-0 min-h-[350px]"
				swiperSliders={requestGroups.map((cardGroups = [], idx) => (
					<div key={`cardGroups-${idx}`}>
						<section className="send-sections flex flex-col md:flex-row justify-around gap-4 lg:gap:8">
							{cardGroups.map(
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
								}) => (
									<AppCard
										key={`${id}`}
										onClickBtn={() => onSelectRecord(id)}
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
													<span className="text-base">
														{t("home.cards.price", {
															price: priceIsNegotiable
																? t("home.cards.priceIsNegotiable")
																: proposedPrice.toLocaleString(),
															label: getPriceType(priceCurrencyTypeId),
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
													<span className="text-base">
														{t("home.cards.weight")}
													</span>
													<span className="text-sm">
														{t("home.cards.weightDes", {
															cargoWeight,
															cargoSize,
															cargoWeightUnitIssueTitle,
															cargoItemNo,
															cargoDesc,
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
